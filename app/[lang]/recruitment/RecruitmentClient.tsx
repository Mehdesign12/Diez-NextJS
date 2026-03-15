'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLang } from '@/app/context/LangContext';
import { uploadCV, saveApplication } from '@/lib/supabase';

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface FormData {
  first_name: string;
  last_name: string;
  cv_url: string;
  motivation: string;
  email: string;
  phone: string;
}

const TOTAL_STEPS = 4;

/* ─────────────────────────────────────────────────────────────
   BARRE DE PROGRESSION
───────────────────────────────────────────────────────────── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step - 1) / (total - 1)) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-[#FF4D29] tracking-widest uppercase">
          {step} / {total}
        </span>
        <span className="text-xs text-gray-400">{pct}%</span>
      </div>
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FF4D29] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL
───────────────────────────────────────────────────────────── */
export default function RecruitmentClient() {
  const { t, lang } = useLang();
  const params = useParams();
  const currentLang = (params?.lang as string) || lang || 'fr';

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(8);
  const [cvFileName, setCvFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    first_name: '',
    last_name: '',
    cv_url: '',
    motivation: '',
    email: '',
    phone: '',
  });

  /* ── Navigation ── */
  const goTo = useCallback((next: number, dir: 'next' | 'prev') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 220);
  }, [animating]);

  const handleNext = () => {
    if (!canProceed()) return;
    if (step < TOTAL_STEPS) goTo(step + 1, 'next');
  };
  const handlePrev = () => {
    if (step > 1) goTo(step - 1, 'prev');
  };

  /* ── Validation ── */
  const canProceed = () => {
    if (step === 1) return form.first_name.trim().length >= 2 && form.last_name.trim().length >= 2;
    if (step === 2) return form.cv_url !== '';
    if (step === 3) return form.motivation.trim().length >= 10;
    if (step === 4) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return true;
  };

  /* ── Upload CV ── */
  const handleFileSelect = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError(currentLang === 'fr' ? 'Seuls les fichiers PDF sont acceptés.' : 'Only PDF files are accepted.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError(currentLang === 'fr' ? 'Le fichier ne doit pas dépasser 5 Mo.' : 'File must not exceed 5 MB.');
      return;
    }
    setError('');
    setUploading(true);
    const url = await uploadCV(file);
    setUploading(false);
    if (!url) {
      setError(currentLang === 'fr' ? 'Erreur lors du téléversement. Réessayez.' : 'Upload failed. Please try again.');
      return;
    }
    setCvFileName(file.name);
    setForm({ ...form, cv_url: url });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  /* ── Envoi ── */
  const handleSubmit = async () => {
    if (!canProceed() || sending) return;
    setSending(true);
    setError('');
    const { error: err } = await saveApplication({ ...form, lang: currentLang });
    setSending(false);
    if (err) {
      setError(currentLang === 'fr' ? 'Une erreur est survenue. Réessayez.' : 'Something went wrong. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  /* ── Slide animation classes ── */
  const slideClass = animating
    ? direction === 'next'
      ? 'opacity-0 translate-x-6'
      : 'opacity-0 -translate-x-6'
    : 'opacity-100 translate-x-0';

  /* ═══════════════════════════════════════════
     CONFETTIS + COMPTE À REBOURS
  ═══════════════════════════════════════════ */
  useEffect(() => {
    if (!submitted) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`/${currentLang}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const canvas = canvasRef.current;
    if (!canvas) return () => clearInterval(timer);
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => clearInterval(timer);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      color: string;
      size: number;
      rotation: number;
      rotSpeed: number;
      shape: 'rect' | 'circle';
      opacity: number;
    };

    const COLORS = ['#FF4D29','#FF7A5C','#FFB347','#FFF3E0','#ffffff','#FF6B35','#FFD700'];
    const particles: Particle[] = [];

    for (let i = 0; i < 160; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = 4 + Math.random() * 12;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
        opacity: 1,
      });
    }

    let rafId: number;
    let startTime: number | null = null;
    const DURATION = 3500;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.opacity = Math.max(0, 1 - elapsed / DURATION);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed < DURATION) {
        rafId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(rafId);
    };
  }, [submitted, currentLang, router]);

  /* ═══════════════════════════════════════════
     ÉCRAN SUCCÈS
  ═══════════════════════════════════════════ */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center px-4 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-50"
        />
        <div className="text-center max-w-md mx-auto relative z-10">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#FF4D29]/10 flex items-center justify-center animate-bounce-slow">
            <div className="w-16 h-16 rounded-full bg-[#FF4D29] flex items-center justify-center shadow-xl shadow-[#FF4D29]/30">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0F0F0F] mb-3">
            {t('recruit-success-title')}
          </h2>
          <p className="text-gray-500 mb-3 leading-relaxed">
            {t('recruit-success-sub')}
          </p>
          <p className="text-sm text-gray-400 mb-8">
            {currentLang === 'fr'
              ? `Redirection automatique dans ${countdown}s…`
              : `Redirecting in ${countdown}s…`}
          </p>
          <Link
            href={`/${currentLang}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D29] text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-[#FF4D29]/25 hover:-translate-y-0.5"
          >
            <i className="fas fa-home text-sm"></i>
            {t('recruit-success-btn')}
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     PAGE PRINCIPALE
  ═══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      {/* ── Navbar mobile uniquement ── */}
      <nav className="lg:hidden fixed w-full z-50 top-6 px-4">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full px-6 h-16 flex items-center justify-between">
          <Link href={`/${currentLang}`} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img src="/images/logo_clean.png" alt="Diez Agency" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#FF4D29] transition-colors">
              Diez Agency
            </span>
          </Link>
          <Link
            href={`/${currentLang}`}
            className="text-sm font-medium text-gray-400 hover:text-[#FF4D29] transition-colors flex items-center gap-1.5"
          >
            <i className="fas fa-times text-xs"></i>
            {currentLang === 'fr' ? 'Fermer' : 'Close'}
          </Link>
        </div>
      </nav>

      {/* ── Bouton Fermer desktop — bas gauche ── */}
      <Link
        href={`/${currentLang}`}
        className="hidden lg:flex fixed bottom-8 left-8 z-50 items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-full px-5 py-3 text-sm font-medium text-gray-500 hover:text-[#FF4D29] hover:border-[#FF4D29]/30 transition-all duration-200 group"
      >
        <i className="fas fa-arrow-left text-xs group-hover:-translate-x-0.5 transition-transform duration-200"></i>
        {currentLang === 'fr' ? 'Retour au site' : 'Back to site'}
      </Link>

      {/* ── Layout deux colonnes ── */}
      <div className="min-h-screen flex flex-col lg:flex-row">

        {/* ── Colonne gauche — branding ── */}
        <div className="hidden lg:flex lg:w-2/5 bg-[#0F0F0F] flex-col justify-center p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF4D29]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FF4D29]/8 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full overflow-hidden mb-10">
              <img src="/images/logo_clean.png" alt="Diez Agency" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              {t('recruit-page-title')}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {t('recruit-page-subtitle')}
            </p>

            <div className="space-y-4">
              {[
                { icon: 'fa-users', text: currentLang === 'fr' ? 'Équipe passionnée & bienveillante' : 'Passionate & supportive team' },
                { icon: 'fa-rocket', text: currentLang === 'fr' ? 'Projets variés & stimulants' : 'Diverse & exciting projects' },
                { icon: 'fa-shield-alt', text: currentLang === 'fr' ? 'Données confidentielles' : 'Confidential data' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF4D29]/15 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${icon} text-[#FF4D29] text-xs`}></i>
                  </div>
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Colonne droite — formulaire ── */}
        <div className="flex-1 flex items-center justify-center px-4 py-28 lg:py-0 lg:px-16">
          <div className="w-full max-w-lg">

            {/* Barre de progression */}
            <div className="mb-10">
              <ProgressBar step={step} total={TOTAL_STEPS} />
            </div>

            {/* Carte étape — avec transition */}
            <div
              className={`transition-all duration-200 ease-out ${slideClass}`}
              style={{ willChange: 'transform, opacity' }}
            >

              {/* ── Étape 1 : Prénom + Nom ── */}
              {step === 1 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('recruit-step')} 1
                  </p>
                  <h2 className="text-2xl font-extrabold text-[#0F0F0F] mb-2">
                    {t('recruit-s1-title')}
                  </h2>
                  <p className="text-gray-400 mb-8">{t('recruit-s1-subtitle')}</p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      autoFocus
                      aria-label={t('recruit-s1-firstname-ph')}
                      value={form.first_name}
                      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder={t('recruit-s1-firstname-ph')}
                      className="w-full px-5 py-4 text-lg bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200"
                    />
                    <input
                      type="text"
                      aria-label={t('recruit-s1-lastname-ph')}
                      value={form.last_name}
                      onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder={t('recruit-s1-lastname-ph')}
                      className="w-full px-5 py-4 text-lg bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200"
                    />
                  </div>
                </div>
              )}

              {/* ── Étape 2 : CV Upload ── */}
              {step === 2 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('recruit-step')} 2
                  </p>
                  <h2 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {t('recruit-s2-title')}
                  </h2>
                  <p className="text-gray-400 mb-6">{t('recruit-s2-subtitle')}</p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={onFileInput}
                    className="hidden"
                  />

                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
                      dragOver
                        ? 'border-[#FF4D29] bg-[#FF4D29]/5'
                        : form.cv_url
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-[#FF4D29]/40 hover:bg-[#FFF8F3]/60'
                    }`}
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <i className="fas fa-spinner animate-spin text-[#FF4D29] text-2xl"></i>
                        <p className="text-sm text-gray-500 font-medium">{t('recruit-s2-uploading')}</p>
                      </div>
                    ) : form.cv_url ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                          <i className="fas fa-file-pdf text-green-600 text-2xl"></i>
                        </div>
                        <p className="text-sm font-bold text-[#0F0F0F]">{cvFileName}</p>
                        <p className="text-xs text-gray-400">
                          {currentLang === 'fr' ? 'Cliquez pour remplacer' : 'Click to replace'}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center">
                          <i className="fas fa-cloud-upload-alt text-gray-400 text-2xl"></i>
                        </div>
                        <p className="text-sm font-medium text-gray-500">{t('recruit-s2-drop')}</p>
                        <p className="text-xs text-gray-300">{t('recruit-s2-drop-hint')}</p>
                      </div>
                    )}
                  </div>

                  {error && step === 2 && (
                    <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm">
                      <i className="fas fa-exclamation-circle"></i>
                      {error}
                    </div>
                  )}
                </div>
              )}

              {/* ── Étape 3 : Motivation ── */}
              {step === 3 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('recruit-step')} 3
                  </p>
                  <h2 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {t('recruit-s3-title')}
                  </h2>
                  <p className="text-gray-400 mb-6">{t('recruit-s3-subtitle')}</p>
                  <textarea
                    autoFocus
                    rows={5}
                    aria-label={t('recruit-s3-title')}
                    value={form.motivation}
                    onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                    placeholder={t('recruit-s3-placeholder')}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200 resize-none leading-relaxed"
                  />
                  <p className="text-xs text-gray-300 mt-2 text-right">
                    {form.motivation.length} / 1000
                  </p>
                </div>
              )}

              {/* ── Étape 4 : Email + Téléphone ── */}
              {step === 4 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('recruit-step')} 4
                  </p>
                  <h2 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {t('recruit-s4-title')}
                  </h2>
                  <p className="text-gray-400 mb-8">{t('recruit-s4-subtitle')}</p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="recruit-email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {t('recruit-s4-email')}
                      </label>
                      <input
                        id="recruit-email"
                        type="email"
                        autoFocus
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={t('recruit-s4-email-ph')}
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="recruit-phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {t('recruit-s4-phone')}
                      </label>
                      <input
                        id="recruit-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={t('recruit-s4-phone-ph')}
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200"
                      />
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <i className="fas fa-lock text-gray-300 text-xs mt-0.5 flex-shrink-0"></i>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {t('recruit-s4-privacy')}
                      </p>
                    </div>
                  </div>
                  {error && (
                    <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm">
                      <i className="fas fa-exclamation-circle"></i>
                      {error}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* ── Boutons navigation ── */}
            <div className={`flex items-center gap-3 mt-10 transition-all duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>

              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200 text-gray-500 font-semibold rounded-full hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 text-sm"
                >
                  <i className="fas fa-arrow-left text-xs"></i>
                  {t('recruit-prev')}
                </button>
              )}

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-full transition-all duration-200 text-sm group ${
                    canProceed()
                      ? 'bg-[#FF4D29] text-white hover:bg-orange-600 shadow-lg shadow-[#FF4D29]/25 hover:shadow-[#FF4D29]/40 hover:-translate-y-0.5'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {t('recruit-next')}
                  <i className={`fas fa-arrow-right text-xs transition-transform duration-200 ${canProceed() ? 'group-hover:translate-x-1' : ''}`}></i>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || sending}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-full transition-all duration-200 text-sm ${
                    canProceed() && !sending
                      ? 'bg-[#FF4D29] text-white hover:bg-orange-600 shadow-lg shadow-[#FF4D29]/25 hover:-translate-y-0.5'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {sending ? (
                    <><i className="fas fa-spinner animate-spin text-xs"></i> {t('recruit-sending')}</>
                  ) : (
                    <><i className="fas fa-paper-plane text-xs"></i> {t('recruit-send')}</>
                  )}
                </button>
              )}
            </div>

            {/* Indicateurs étapes mobiles */}
            <div className="flex justify-center gap-1.5 mt-8">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i + 1 === step
                      ? 'w-6 h-1.5 bg-[#FF4D29]'
                      : i + 1 < step
                      ? 'w-1.5 h-1.5 bg-[#FF4D29]/40'
                      : 'w-1.5 h-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
