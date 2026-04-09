'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, getJobOpportunities, updateJobOpportunityStatus, updateJobOpportunityNotes, getJobPreferences, updateJobPreferences, supabase } from '@/lib/supabase';
import type { JobOpportunity, JobPreferences } from '@/lib/types';

// ── Config statuts ──
const STATUS_CONFIG: Record<JobOpportunity['status'], { label: string; color: string; icon: string }> = {
  new:       { label: 'Nouvelle',   color: 'bg-orange-100 text-[#FF4D29] border-orange-200', icon: 'fa-sparkles' },
  interested:{ label: 'Interesse',  color: 'bg-blue-50 text-blue-600 border-blue-100', icon: 'fa-star' },
  applied:   { label: 'Postule',    color: 'bg-purple-50 text-purple-600 border-purple-100', icon: 'fa-paper-plane' },
  interview: { label: 'Entretien',  color: 'bg-teal-50 text-teal-600 border-teal-100', icon: 'fa-comments' },
  rejected:  { label: 'Rejete',     color: 'bg-red-50 text-red-500 border-red-100', icon: 'fa-times' },
  expired:   { label: 'Expire',     color: 'bg-gray-100 text-gray-400 border-gray-200', icon: 'fa-clock' },
};

const SOURCE_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  remoteok:        { label: 'RemoteOK',         color: 'bg-green-50 text-green-600 border-green-100', icon: 'fa-globe' },
  freelancer:      { label: 'Freelancer',       color: 'bg-blue-50 text-blue-600 border-blue-100', icon: 'fa-laptop-code' },
  weworkremotely:  { label: 'WeWorkRemotely',   color: 'bg-amber-50 text-amber-600 border-amber-100', icon: 'fa-briefcase' },
  himalayas:       { label: 'Himalayas',        color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: 'fa-mountain' },
  arbeitnow:       { label: 'Arbeitnow',        color: 'bg-rose-50 text-rose-600 border-rose-100', icon: 'fa-map-marker-alt' },
  jobicy:          { label: 'Jobicy',           color: 'bg-violet-50 text-violet-600 border-violet-100', icon: 'fa-satellite' },
  upwork:          { label: 'Upwork',           color: 'bg-teal-50 text-teal-600 border-teal-100', icon: 'fa-circle-up' },
  malt:            { label: 'Malt',             color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: 'fa-user-tie' },
  linkedin:        { label: 'LinkedIn',         color: 'bg-sky-50 text-sky-600 border-sky-100', icon: 'fa-building' },
  manual:          { label: 'Manuel',           color: 'bg-gray-50 text-gray-500 border-gray-100', icon: 'fa-pen' },
};

const ALL_STATUSES: JobOpportunity['status'][] = ['new', 'interested', 'applied', 'interview', 'rejected', 'expired'];

// ── Score badge ──
function ScoreBadge({ score }: { score: number }) {
  const color = score >= 70 ? 'bg-green-50 text-green-600 border-green-200'
    : score >= 40 ? 'bg-yellow-50 text-yellow-600 border-yellow-200'
    : 'bg-red-50 text-red-400 border-red-100';
  return (
    <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${color}`}>
      {score}%
    </span>
  );
}

// ── Carte opportunite ──
function OpportunityCard({
  opp,
  onStatusChange,
  onNotesChange,
  onApply,
}: {
  opp: JobOpportunity;
  onStatusChange: (id: number, status: JobOpportunity['status']) => void;
  onNotesChange: (id: number, notes: string) => void;
  onApply: (opp: JobOpportunity, method: 'generate' | 'email' | 'freelancer' | 'clipboard') => void;
}) {
  const [open, setOpen] = useState(false);
  const [noteDraft, setNoteDraft] = useState(opp.notes || '');
  const cfg = STATUS_CONFIG[opp.status];
  const srcCfg = SOURCE_CONFIG[opp.source] || SOURCE_CONFIG.manual;
  const date = new Date(opp.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const budgetText = opp.budget_min || opp.budget_max
    ? `${opp.budget_min ? opp.budget_min.toLocaleString() : '?'} - ${opp.budget_max ? opp.budget_max.toLocaleString() : '?'} ${opp.currency} ${opp.budget_type === 'hourly' ? '/h' : opp.budget_type === 'fixed' ? '(fixe)' : ''}`
    : null;

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
      opp.status === 'new' ? 'border-[#FF4D29]/30 shadow-md shadow-[#FF4D29]/5' : 'border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
        onClick={() => {
          setOpen(v => !v);
          if (opp.status === 'new') onStatusChange(opp.id, 'new'); // keep new but open
        }}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#FF4D29]/10 flex items-center justify-center flex-shrink-0">
            <i className={`fas ${srcCfg.icon} text-[#FF4D29] text-sm`}></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#0F0F0F] text-sm truncate">{opp.title}</span>
              <ScoreBadge score={opp.match_score} />
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${srcCfg.color}`}>
                {srcCfg.label}
              </span>
            </div>
            {budgetText && (
              <p className="text-sm text-gray-500 mt-0.5"><i className="fas fa-coins text-[10px] mr-1"></i>{budgetText}</p>
            )}
            {opp.client_name && (
              <p className="text-xs text-gray-400 mt-0.5 font-medium">Client : {opp.client_name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-400 hidden sm:block">{date}</span>
          <i className={`fas fa-chevron-down text-gray-300 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {/* Details expandables */}
      {open && (
        <div className="px-6 pb-6 border-t border-gray-50 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="space-y-3">
              {budgetText && <Detail icon="fa-coins" label="Budget" value={budgetText} />}
              {opp.duration && <Detail icon="fa-clock" label="Duree" value={opp.duration} />}
              {opp.experience_level && <Detail icon="fa-layer-group" label="Niveau" value={opp.experience_level} />}
            </div>
            <div className="space-y-3">
              {opp.location && <Detail icon="fa-map-marker-alt" label="Localisation" value={opp.location} />}
              {opp.client_name && <Detail icon="fa-user" label="Client" value={opp.client_name} />}
              <Detail icon="fa-calendar" label="Publie le" value={date} />
            </div>
          </div>

          {/* Skills */}
          {opp.skills && opp.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {opp.skills.map(skill => (
                <span key={skill} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-100">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {opp.description && (
            <div className="bg-[#FFF8F3] border border-orange-100 rounded-xl p-4 mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <i className="fas fa-align-left mr-1.5"></i>Description
              </p>
              <p className="text-sm text-[#0F0F0F] leading-relaxed whitespace-pre-wrap">{opp.description.length > 600 ? opp.description.slice(0, 600) + '...' : opp.description}</p>
            </div>
          )}

          {/* Match IA */}
          {opp.match_reason && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                <i className="fas fa-robot mr-1.5"></i>Analyse IA — {opp.match_score}% match
              </p>
              <p className="text-sm text-indigo-800 leading-relaxed">{opp.match_reason}</p>
            </div>
          )}

          {/* Notes */}
          <div className="mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              <i className="fas fa-sticky-note mr-1.5"></i>Notes personnelles
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={noteDraft}
                onChange={e => setNoteDraft(e.target.value)}
                placeholder="Ajouter une note..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40 focus:ring-1 focus:ring-[#FF4D29]/20"
              />
              <button
                onClick={() => onNotesChange(opp.id, noteDraft)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-colors"
              >
                <i className="fas fa-save text-xs"></i>
              </button>
            </div>
          </div>

          {/* Candidature */}
          <div className="mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              <i className="fas fa-paper-plane mr-1.5"></i>Candidature
            </p>
            {opp.cover_letter ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-3">
                <p className="text-sm text-emerald-900 leading-relaxed whitespace-pre-wrap">{opp.cover_letter}</p>
              </div>
            ) : null}
            {opp.applied_at ? (
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                  <i className="fas fa-check mr-1"></i>Postule via {opp.apply_method} le {new Date(opp.applied_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {!opp.cover_letter && (
                <button
                  onClick={() => onApply(opp, 'generate')}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 transition-colors"
                >
                  <i className="fas fa-magic mr-1"></i>Generer lettre IA
                </button>
              )}
              {opp.cover_letter && !opp.applied_at && (
                <>
                  {opp.contact_email && (
                    <button
                      onClick={() => onApply(opp, 'email')}
                      className="px-3 py-1.5 bg-[#FF4D29] hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-colors shadow-sm"
                    >
                      <i className="fas fa-envelope mr-1"></i>Envoyer par email
                    </button>
                  )}
                  {opp.source === 'freelancer' && (
                    <button
                      onClick={() => onApply(opp, 'freelancer')}
                      className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-full transition-colors shadow-sm"
                    >
                      <i className="fas fa-gavel mr-1"></i>Bid Freelancer
                    </button>
                  )}
                  <button
                    onClick={() => onApply(opp, 'clipboard')}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-full border border-gray-200 transition-colors"
                  >
                    <i className="fas fa-copy mr-1"></i>Copier & postuler
                  </button>
                </>
              )}
              {opp.cover_letter && (
                <button
                  onClick={() => onApply(opp, 'generate')}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-semibold rounded-full border border-gray-100 transition-colors"
                >
                  <i className="fas fa-redo mr-1"></i>Regenerer
                </button>
              )}
            </div>
          </div>

          {/* Actions statut */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Statut :</span>
            {ALL_STATUSES.map(s => (
              <button
                key={s}
                onClick={() => onStatusChange(opp.id, s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-150 ${
                  opp.status === s
                    ? STATUS_CONFIG[s].color + ' opacity-100'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-[#FF4D29]/30 hover:text-[#FF4D29]'
                }`}
              >
                {STATUS_CONFIG[s].label}
              </button>
            ))}
            {opp.source_url && (
              <a
                href={opp.source_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { if (opp.status === 'new') onStatusChange(opp.id, 'interested'); }}
                className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-[#FF4D29] text-white text-xs font-bold rounded-full hover:bg-orange-600 transition-all shadow-md shadow-[#FF4D29]/20"
              >
                <i className="fas fa-external-link-alt text-[10px]"></i> Voir l&apos;offre
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <i className={`fas ${icon} text-gray-400 text-[10px]`}></i>
      </div>
      <div>
        <p className="text-xs text-gray-400 font-semibold">{label}</p>
        <p className="text-sm font-semibold text-[#0F0F0F]">{value}</p>
      </div>
    </div>
  );
}

// ── Modal preferences ──
function PreferencesModal({
  preferences,
  onClose,
  onSave,
}: {
  preferences: JobPreferences;
  onClose: () => void;
  onSave: (prefs: JobPreferences) => void;
}) {
  const [form, setForm] = useState({ ...preferences });

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-sm font-extrabold text-[#0F0F0F]">
            <i className="fas fa-sliders-h mr-2 text-[#FF4D29]"></i>Preferences de matching
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
            <i className="fas fa-times text-gray-500 text-xs"></i>
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          {/* Identity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Nom complet</label>
              <input type="text" value={form.full_name || ''} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40" placeholder="Jean Dupont" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
              <input type="email" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40" placeholder="jean@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Telephone</label>
              <input type="text" value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40" placeholder="+33 6 12 34 56 78" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">URL du CV (PDF)</label>
              <input type="url" value={form.cv_url || ''} onChange={e => setForm(f => ({ ...f, cv_url: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40" placeholder="https://..." />
            </div>
          </div>
          {/* Bio */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Profil / Bio</label>
            <textarea
              value={form.bio || ''}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40"
              placeholder="Decrivez votre profil pour un meilleur matching IA..."
            />
          </div>
          {/* Skills */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Competences (separees par des virgules)</label>
            <input
              type="text"
              value={form.skills.join(', ')}
              onChange={e => setForm(f => ({ ...f, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40"
            />
          </div>
          {/* Keywords */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Mots-cles positifs</label>
            <input
              type="text"
              value={form.keywords.join(', ')}
              onChange={e => setForm(f => ({ ...f, keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40"
            />
          </div>
          {/* Exclude Keywords */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Mots-cles a exclure</label>
            <input
              type="text"
              value={form.exclude_keywords.join(', ')}
              onChange={e => setForm(f => ({ ...f, exclude_keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40"
            />
          </div>
          {/* Min budget */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Budget minimum</label>
            <input
              type="number"
              value={form.min_budget || ''}
              onChange={e => setForm(f => ({ ...f, min_budget: e.target.value ? Number(e.target.value) : null }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40"
              placeholder="500"
            />
          </div>
          {/* Freelancer token */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Token Freelancer (optionnel, pour auto-bid)</label>
            <input
              type="password"
              value={form.freelancer_token || ''}
              onChange={e => setForm(f => ({ ...f, freelancer_token: e.target.value || null }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40"
              placeholder="Token OAuth Freelancer.com"
            />
          </div>
        </div>
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-colors">
            Annuler
          </button>
          <button onClick={handleSave} className="px-5 py-2.5 bg-[#FF4D29] hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors shadow-md shadow-[#FF4D29]/20">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE PRINCIPALE
═══════════════════════════════════════════ */
export default function OpportunitiesPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<JobOpportunity[]>([]);
  const [preferences, setPreferences] = useState<JobPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | JobOpportunity['status']>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrefs, setShowPrefs] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    const data = await getJobOpportunities();
    setOpportunities(data);
  }, []);

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (!session) { router.push('/admin'); return; }
      const [opps, prefs] = await Promise.all([getJobOpportunities(), getJobPreferences()]);
      setOpportunities(opps);
      setPreferences(prefs);
      setLoading(false);
    };
    init();
  }, [router]);

  // Auto-polling toutes les 60s
  useEffect(() => {
    const interval = setInterval(loadData, 60_000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleStatusChange = useCallback(async (id: number, status: JobOpportunity['status']) => {
    await updateJobOpportunityStatus(id, status);
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const handleNotesChange = useCallback(async (id: number, notes: string) => {
    await updateJobOpportunityNotes(id, notes);
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, notes } : o));
  }, []);

  const handleFetchJobs = useCallback(async () => {
    setFetching(true);
    setFetchResult(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/fetch-jobs', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session?.access_token || ''}` },
      });
      const data = await res.json();
      if (data.success) {
        const f = data.fetched || {};
        const total = (f.remoteok || 0) + (f.freelancer || 0) + (f.weworkremotely || 0) + (f.himalayas || 0) + (f.arbeitnow || 0) + (f.jobicy || 0);
        const filtered = f.filtered || 0;
        setFetchResult(`${total} offre${total > 1 ? 's' : ''} pertinente${total > 1 ? 's' : ''}${filtered ? ` (${filtered} filtree${filtered > 1 ? 's' : ''})` : ''}`);
        await loadData();
      } else {
        setFetchResult('Erreur lors du fetch');
      }
    } catch {
      setFetchResult('Erreur reseau');
    }
    setFetching(false);
    setTimeout(() => setFetchResult(null), 5000);
  }, [loadData]);

  const handleApply = useCallback(async (opp: JobOpportunity, method: 'generate' | 'email' | 'freelancer' | 'clipboard') => {
    const { data: { session } } = await supabase.auth.getSession();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session?.access_token || ''}` };

    if (method === 'generate') {
      setFetchResult('Generation de la lettre...');
      const res = await fetch('/api/admin/generate-letter', {
        method: 'POST', headers,
        body: JSON.stringify({
          opportunity_id: opp.id,
          title: opp.title,
          description: opp.description,
          client_name: opp.client_name,
          skills: opp.skills,
          source: opp.source,
        }),
      });
      const data = await res.json();
      if (data.cover_letter) {
        setOpportunities(prev => prev.map(o => o.id === opp.id ? { ...o, cover_letter: data.cover_letter } : o));
        setFetchResult('Lettre generee !');
      } else {
        setFetchResult('Erreur generation');
      }
      setTimeout(() => setFetchResult(null), 3000);
    }

    if (method === 'email') {
      if (!opp.contact_email || !opp.cover_letter) return;
      setFetchResult('Envoi du email...');
      const res = await fetch('/api/admin/apply-email', {
        method: 'POST', headers,
        body: JSON.stringify({
          opportunity_id: opp.id,
          to_email: opp.contact_email,
          cover_letter: opp.cover_letter,
          job_title: opp.title,
        }),
      });
      if ((await res.json()).success) {
        setOpportunities(prev => prev.map(o => o.id === opp.id ? { ...o, status: 'applied' as const, applied_at: new Date().toISOString(), apply_method: 'email' as const } : o));
        setFetchResult('Candidature envoyee !');
      } else {
        setFetchResult('Erreur envoi email');
      }
      setTimeout(() => setFetchResult(null), 3000);
    }

    if (method === 'freelancer') {
      if (!opp.cover_letter) return;
      const sourceId = opp.source_id;
      setFetchResult('Envoi du bid Freelancer...');
      const res = await fetch('/api/admin/apply-freelancer', {
        method: 'POST', headers,
        body: JSON.stringify({
          opportunity_id: opp.id,
          project_id: sourceId,
          cover_letter: opp.cover_letter,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOpportunities(prev => prev.map(o => o.id === opp.id ? { ...o, status: 'applied' as const, applied_at: new Date().toISOString(), apply_method: 'freelancer' as const } : o));
        setFetchResult('Bid envoye !');
      } else {
        setFetchResult(data.error || 'Erreur bid');
      }
      setTimeout(() => setFetchResult(null), 3000);
    }

    if (method === 'clipboard') {
      if (opp.cover_letter) {
        await navigator.clipboard.writeText(opp.cover_letter);
        setFetchResult('Lettre copiee !');
        setTimeout(() => setFetchResult(null), 2000);
      }
      if (opp.source_url) window.open(opp.source_url, '_blank');
    }
  }, []);

  const handleClearJobs = useCallback(async () => {
    if (!confirm('Supprimer toutes les opportunites ? Cette action est irreversible.')) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/clear-jobs', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session?.access_token || ''}` },
      });
      if ((await res.json()).success) {
        setOpportunities([]);
        setFetchResult('Toutes les opportunites ont ete supprimees');
        setTimeout(() => setFetchResult(null), 3000);
      }
    } catch { /* ignore */ }
  }, []);

  const handlePrefsSave = useCallback(async (prefs: JobPreferences) => {
    await updateJobPreferences(prefs.id, {
      skills: prefs.skills,
      keywords: prefs.keywords,
      exclude_keywords: prefs.exclude_keywords,
      min_budget: prefs.min_budget,
      bio: prefs.bio,
      full_name: prefs.full_name,
      email: prefs.email,
      phone: prefs.phone,
      cv_url: prefs.cv_url,
      freelancer_token: prefs.freelancer_token,
    });
    setPreferences(prefs);
  }, []);

  // Filtrage
  const filtered = opportunities.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (sourceFilter !== 'all' && o.source !== sourceFilter) return false;
    if (o.match_score < minScoreFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!o.title.toLowerCase().includes(q) && !(o.description || '').toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Compteurs
  const counts = {
    all: opportunities.length,
    new: opportunities.filter(o => o.status === 'new').length,
    interested: opportunities.filter(o => o.status === 'interested').length,
    applied: opportunities.filter(o => o.status === 'applied').length,
    interview: opportunities.filter(o => o.status === 'interview').length,
  };

  // Sources presentes
  const activeSources = [...new Set(opportunities.map(o => o.source))];

  // Stats
  const avgScore = opportunities.length > 0
    ? Math.round(opportunities.reduce((sum, o) => sum + o.match_score, 0) / opportunities.length)
    : 0;
  const thisWeek = opportunities.filter(o => {
    const d = new Date(o.created_at);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  if (loading) return (
    <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center">
      <i className="fas fa-spinner animate-spin text-[#FF4D29] text-3xl"></i>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
            <i className="fas fa-arrow-left text-gray-500 text-xs"></i>
          </Link>
          <div>
            <h1 className="text-sm font-extrabold text-[#0F0F0F] flex items-center gap-2">
              Opportunites Freelance
              {counts.new > 0 && (
                <span className="px-2 py-0.5 bg-[#FF4D29] text-white text-xs font-extrabold rounded-full">
                  {counts.new}
                </span>
              )}
            </h1>
            <p className="text-xs text-gray-400">{opportunities.length} opportunite{opportunities.length > 1 ? 's' : ''} au total</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {fetchResult && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
              {fetchResult}
            </span>
          )}
          <button
            onClick={handleFetchJobs}
            disabled={fetching}
            className="px-4 py-2 bg-[#FF4D29] hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-[#FF4D29]/20"
          >
            <i className={`fas ${fetching ? 'fa-spinner animate-spin' : 'fa-sync-alt'} text-xs`}></i>
            {fetching ? 'Recherche...' : 'Actualiser'}
          </button>
          <button
            onClick={handleClearJobs}
            className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            <i className="fas fa-trash-alt text-xs"></i>
          </button>
          <button
            onClick={() => setShowPrefs(true)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            <i className="fas fa-sliders-h text-xs"></i> Preferences
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Nouvelles', value: counts.new, icon: 'fa-sparkles', color: 'text-[#FF4D29]', bg: 'bg-orange-50' },
            { label: 'Cette semaine', value: thisWeek, icon: 'fa-calendar-week', color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Score moyen', value: `${avgScore}%`, icon: 'fa-chart-line', color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: 'Candidatures', value: counts.applied, icon: 'fa-paper-plane', color: 'text-green-500', bg: 'bg-green-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <i className={`fas ${s.icon} ${s.color} text-sm`}></i>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0F0F0F]">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filtres statut */}
        <div className="flex flex-wrap gap-2 mb-4">
          {([
            { key: 'all' as const, label: 'Toutes', count: counts.all },
            { key: 'new' as const, label: 'Nouvelles', count: counts.new },
            { key: 'interested' as const, label: 'Interessees', count: counts.interested },
            { key: 'applied' as const, label: 'Postulees', count: counts.applied },
            { key: 'interview' as const, label: 'Entretiens', count: counts.interview },
          ]).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                statusFilter === key
                  ? 'bg-[#FF4D29] text-white border-[#FF4D29] shadow-md shadow-[#FF4D29]/20'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF4D29]/40 hover:text-[#FF4D29]'
              }`}
            >
              {label}
              <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-full ${
                statusFilter === key ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Filtres avances */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Source */}
          <select
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 focus:outline-none focus:border-[#FF4D29]/40"
          >
            <option value="all">Toutes les sources</option>
            {activeSources.map(s => (
              <option key={s} value={s}>{SOURCE_CONFIG[s]?.label || s}</option>
            ))}
          </select>
          {/* Score min */}
          <select
            value={minScoreFilter}
            onChange={e => setMinScoreFilter(Number(e.target.value))}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 focus:outline-none focus:border-[#FF4D29]/40"
          >
            <option value={0}>Tous les scores</option>
            <option value={30}>Score &ge; 30%</option>
            <option value={50}>Score &ge; 50%</option>
            <option value={70}>Score &ge; 70%</option>
            <option value={90}>Score &ge; 90%</option>
          </select>
          {/* Recherche */}
          <div className="relative flex-1 min-w-[200px]">
            <i className="fas fa-search text-gray-300 text-xs absolute left-4 top-1/2 -translate-y-1/2"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]/40"
            />
          </div>
        </div>

        {/* Liste */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
              <i className="fas fa-briefcase text-gray-300 text-2xl"></i>
            </div>
            <p className="text-gray-400 font-semibold">Aucune opportunite dans cette categorie.</p>
            <p className="text-gray-300 text-sm mt-1">Les offres arriveront automatiquement via votre webhook.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(opp => (
              <OpportunityCard
                key={opp.id}
                opp={opp}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal preferences */}
      {showPrefs && (
        <PreferencesModal
          preferences={preferences || {
            id: 1, skills: [], keywords: [], exclude_keywords: [], min_budget: null,
            preferred_budget_type: null, preferred_duration: [], preferred_experience: [],
            preferred_sources: [], bio: null, cv_url: null, full_name: null, email: null,
            phone: null, freelancer_token: null, updated_at: '',
          }}
          onClose={() => setShowPrefs(false)}
          onSave={handlePrefsSave}
        />
      )}
    </div>
  );
}
