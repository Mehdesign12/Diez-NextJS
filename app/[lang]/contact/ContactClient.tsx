'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLang } from '@/app/context/LangContext';
import { saveContact } from '@/lib/supabase';

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface FormData {
  first_name: string;
  need: string;
  description: string;
  budget: string;
  timeline: string;
  email: string;
  phone: string;
}

const TOTAL_STEPS = 6;

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
   CARD OPTION (choix multiple)
───────────────────────────────────────────────────────────── */
function OptionCard({
  label,
  desc,
  selected,
  onClick,
}: {
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 group flex items-start gap-4 cursor-pointer ${
        selected
          ? 'border-[#FF4D29] bg-[#FFF8F3] shadow-md shadow-[#FF4D29]/10'
          : 'border-gray-100 bg-white hover:border-[#FF4D29]/40 hover:bg-[#FFF8F3]/60'
      }`}
    >
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
        selected ? 'border-[#FF4D29] bg-[#FF4D29]' : 'border-gray-300 group-hover:border-[#FF4D29]/60'
      }`}>
        {selected && (
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
            <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        )}
      </div>
      <div>
        <p className={`text-sm font-bold transition-colors duration-200 ${selected ? 'text-[#FF4D29]' : 'text-[#0F0F0F] group-hover:text-[#FF4D29]'}`}>
          {label}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL
───────────────────────────────────────────────────────────── */
export default function ContactClient() {
  const { t, lang } = useLang();
  const params = useParams();
  const currentLang = (params?.lang as string) || lang || 'fr';

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<FormData>({
    first_name: '',
    need: '',
    description: '',
    budget: '',
    timeline: '',
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

  /* ── Validation souple ── */
  const canProceed = () => {
    if (step === 1) return form.first_name.trim().length >= 2;
    if (step === 2) return form.need !== '';
    if (step === 3) return form.description.trim().length >= 10;
    if (step === 4) return form.budget !== '';
    if (step === 5) return form.timeline !== '';
    if (step === 6) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return true;
  };

  /* ── Envoi ── */
  const handleSubmit = async () => {
    if (!canProceed() || sending) return;
    setSending(true);
    setError('');
    const { error: err } = await saveContact({ ...form, lang: currentLang });
    setSending(false);
    if (err) {
      setError(currentLang === 'fr' ? 'Une erreur est survenue. Réessayez.' : 'Something went wrong. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  /* ── Options ── */
  const needOptions = [
    { key: 'contact-s2-opt1', descKey: 'contact-s2-opt1-desc' },
    { key: 'contact-s2-opt2', descKey: 'contact-s2-opt2-desc' },
    { key: 'contact-s2-opt3', descKey: 'contact-s2-opt3-desc' },
    { key: 'contact-s2-opt4', descKey: 'contact-s2-opt4-desc' },
    { key: 'contact-s2-opt5', descKey: 'contact-s2-opt5-desc' },
    { key: 'contact-s2-opt6', descKey: 'contact-s2-opt6-desc' },
  ];
  const budgetOptions = [
    { key: 'contact-s4-opt1', descKey: 'contact-s4-opt1-desc' },
    { key: 'contact-s4-opt2', descKey: 'contact-s4-opt2-desc' },
    { key: 'contact-s4-opt3', descKey: 'contact-s4-opt3-desc' },
    { key: 'contact-s4-opt4', descKey: 'contact-s4-opt4-desc' },
    { key: 'contact-s4-opt5', descKey: 'contact-s4-opt5-desc' },
  ];
  const timelineOptions = [
    'contact-s5-opt1',
    'contact-s5-opt2',
    'contact-s5-opt3',
    'contact-s5-opt4',
  ];

  /* ── Slide animation classes ── */
  const slideClass = animating
    ? direction === 'next'
      ? 'opacity-0 translate-x-6'
      : 'opacity-0 -translate-x-6'
    : 'opacity-100 translate-x-0';

  /* ═══════════════════════════════════════════
     ÉCRAN SUCCÈS
  ═══════════════════════════════════════════ */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Cercle animé */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#FF4D29]/10 flex items-center justify-center animate-bounce-slow">
            <div className="w-16 h-16 rounded-full bg-[#FF4D29] flex items-center justify-center shadow-xl shadow-[#FF4D29]/30">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F0F0F] mb-3">
            {t('contact-success-title')}
          </h1>
          <p className="text-gray-500 mb-10 leading-relaxed">
            {t('contact-success-sub')}
          </p>
          <Link
            href={`/${currentLang}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D29] text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-[#FF4D29]/25 hover:-translate-y-0.5"
          >
            <i className="fas fa-home text-sm"></i>
            {t('contact-success-btn')}
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

      {/* ── Navbar ── */}
      <nav className="fixed w-full z-50 top-6 px-4">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full px-6 h-16 flex items-center justify-between">
          <Link href={`/${currentLang}`} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img src="/images/logo_clean.png" alt="Diez Agency" className="w-full h-full object-cover" />
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

      {/* ── Layout deux colonnes ── */}
      <div className="min-h-screen flex flex-col lg:flex-row">

        {/* ── Colonne gauche — branding ── */}
        <div className="hidden lg:flex lg:w-2/5 bg-[#0F0F0F] flex-col justify-between p-16 relative overflow-hidden">
          {/* Cercles déco */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF4D29]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FF4D29]/8 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 mt-20">
            <div className="w-12 h-12 rounded-full overflow-hidden mb-10">
              <img src="/images/logo_clean.png" alt="Diez Agency" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              {t('contact-page-title')}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t('contact-page-subtitle')}
            </p>
          </div>

          {/* Garanties */}
          <div className="relative z-10 space-y-4">
            {[
              { icon: 'fa-clock', text: currentLang === 'fr' ? 'Réponse sous 24h' : 'Reply within 24h' },
              { icon: 'fa-shield-alt', text: currentLang === 'fr' ? 'Données confidentielles' : 'Confidential data' },
              { icon: 'fa-star', text: currentLang === 'fr' ? 'Audit gratuit offert' : 'Free audit included' },
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

        {/* ── Colonne droite — formulaire ── */}
        <div className="flex-1 flex items-center justify-center px-4 py-32 lg:py-16 lg:px-16">
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

              {/* ── Étape 1 : Prénom ── */}
              {step === 1 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('contact-step')} 1
                  </p>
                  <h1 className="text-2xl font-extrabold text-[#0F0F0F] mb-2">
                    {t('contact-s1-title')}
                  </h1>
                  <p className="text-gray-400 mb-8">{t('contact-s1-subtitle')}</p>
                  <input
                    type="text"
                    autoFocus
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    placeholder={t('contact-s1-placeholder')}
                    className="w-full px-5 py-4 text-lg bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200"
                  />
                </div>
              )}

              {/* ── Étape 2 : Besoin ── */}
              {step === 2 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('contact-step')} 2
                  </p>
                  <h1 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {form.first_name ? `${form.first_name}, ` : ''}{t('contact-s2-title').toLowerCase()}
                  </h1>
                  <p className="text-gray-400 mb-6">{t('contact-s2-subtitle')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {needOptions.map(({ key, descKey }) => (
                      <OptionCard
                        key={key}
                        label={t(key)}
                        desc={t(descKey)}
                        selected={form.need === t(key)}
                        onClick={() => setForm({ ...form, need: t(key) })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Étape 3 : Description ── */}
              {step === 3 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('contact-step')} 3
                  </p>
                  <h1 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {t('contact-s3-title')}
                  </h1>
                  <p className="text-gray-400 mb-6">{t('contact-s3-subtitle')}</p>
                  <textarea
                    autoFocus
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder={t('contact-s3-placeholder')}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200 resize-none leading-relaxed"
                  />
                  <p className="text-xs text-gray-300 mt-2 text-right">
                    {form.description.length} / 500
                  </p>
                </div>
              )}

              {/* ── Étape 4 : Budget ── */}
              {step === 4 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('contact-step')} 4
                  </p>
                  <h1 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {t('contact-s4-title')}
                  </h1>
                  <p className="text-gray-400 mb-6">{t('contact-s4-subtitle')}</p>
                  <div className="space-y-3">
                    {budgetOptions.map(({ key, descKey }) => (
                      <OptionCard
                        key={key}
                        label={t(key)}
                        desc={t(descKey)}
                        selected={form.budget === t(key)}
                        onClick={() => setForm({ ...form, budget: t(key) })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Étape 5 : Délai ── */}
              {step === 5 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('contact-step')} 5
                  </p>
                  <h1 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {t('contact-s5-title')}
                  </h1>
                  <p className="text-gray-400 mb-6">{t('contact-s5-subtitle')}</p>
                  <div className="space-y-3">
                    {timelineOptions.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setForm({ ...form, timeline: t(key) })}
                        className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 text-sm font-semibold ${
                          form.timeline === t(key)
                            ? 'border-[#FF4D29] bg-[#FFF8F3] text-[#FF4D29] shadow-md shadow-[#FF4D29]/10'
                            : 'border-gray-100 bg-white text-[#0F0F0F] hover:border-[#FF4D29]/40 hover:bg-[#FFF8F3]/60'
                        }`}
                      >
                        {t(key)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Étape 6 : Email + Téléphone ── */}
              {step === 6 && (
                <div>
                  <p className="text-xs font-bold text-[#FF4D29] uppercase tracking-widest mb-2">
                    {t('contact-step')} 6
                  </p>
                  <h1 className="text-2xl font-extrabold text-[#0F0F0F] mb-1">
                    {t('contact-s6-title')}
                  </h1>
                  <p className="text-gray-400 mb-8">{t('contact-s6-subtitle')}</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {t('contact-s6-email')}
                      </label>
                      <input
                        type="email"
                        autoFocus
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={t('contact-s6-email-ph')}
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {t('contact-s6-phone')}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={t('contact-s6-phone-ph')}
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-[#0F0F0F] placeholder-gray-300 focus:outline-none focus:border-[#FF4D29] transition-colors duration-200"
                      />
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <i className="fas fa-lock text-gray-300 text-xs mt-0.5 flex-shrink-0"></i>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {t('contact-s6-privacy')}
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

              {/* Précédent */}
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200 text-gray-500 font-semibold rounded-full hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 text-sm"
                >
                  <i className="fas fa-arrow-left text-xs"></i>
                  {t('contact-prev')}
                </button>
              )}

              {/* Suivant ou Envoyer */}
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
                  {t('contact-next')}
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
                    <><i className="fas fa-spinner animate-spin text-xs"></i> {t('contact-sending')}</>
                  ) : (
                    <><i className="fas fa-paper-plane text-xs"></i> {t('contact-send')}</>
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
