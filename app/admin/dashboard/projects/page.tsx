'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, getProjects, getProjectContacts, updateProjectContactStatus, supabase } from '@/lib/supabase';
import type { Project, ProjectContact } from '@/lib/types';

const STATUS_CONFIG = {
  new:     { label: 'Nouveau',  color: 'bg-orange-100 text-[#FF4D29] border-orange-200' },
  read:    { label: 'Lu',       color: 'bg-blue-50 text-blue-600 border-blue-100' },
  replied: { label: 'Répondu', color: 'bg-green-50 text-green-600 border-green-100' },
};

/* ═══════════════════════════════════════════
   LEAD CARD
═══════════════════════════════════════════ */
function LeadCard({
  lead,
  projectName,
  onStatusChange,
}: {
  lead: ProjectContact;
  projectName: string;
  onStatusChange: (id: number, status: ProjectContact['status']) => void;
}) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[lead.status];
  const date = new Date(lead.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
      lead.status === 'new' ? 'border-[#FF4D29]/30 shadow-md shadow-[#FF4D29]/5' : 'border-gray-100 shadow-sm'
    }`}>
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
        onClick={() => {
          setOpen((v) => !v);
          if (lead.status === 'new') onStatusChange(lead.id, 'read');
        }}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-500 font-extrabold text-sm">
              {lead.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#0F0F0F] text-sm">{lead.name}</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-500 rounded-full border border-indigo-100">
                {projectName}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5 truncate">{lead.email}</p>
            {lead.budget && <p className="text-xs text-gray-400 mt-0.5 font-medium">Budget: {lead.budget}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-400 hidden sm:block">{date}</span>
          <i className={`fas fa-chevron-down text-gray-300 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-50 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="space-y-3">
              <Detail icon="fa-envelope" label="Email" value={lead.email} link={`mailto:${lead.email}`} />
              {lead.phone && <Detail icon="fa-phone" label="Téléphone" value={lead.phone} link={`tel:${lead.phone}`} />}
              {lead.budget && <Detail icon="fa-coins" label="Budget" value={lead.budget} />}
            </div>
            <div className="space-y-3">
              {lead.interests && lead.interests.length > 0 && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-tags text-gray-400 text-[10px]"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">Intérêts</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lead.interests.map((i) => (
                        <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <Detail icon="fa-calendar" label="Reçu le" value={date} />
            </div>
          </div>

          {lead.message && (
            <div className="bg-[#FFF8F3] border border-orange-100 rounded-xl p-4 mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <i className="fas fa-comment-alt mr-1.5"></i>Message
              </p>
              <p className="text-sm text-[#0F0F0F] leading-relaxed whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Statut :</span>
            {(['new', 'read', 'replied'] as ProjectContact['status'][]).map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(lead.id, s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-150 ${
                  lead.status === s
                    ? STATUS_CONFIG[s].color + ' opacity-100'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-[#FF4D29]/30 hover:text-[#FF4D29]'
                }`}
              >
                {STATUS_CONFIG[s].label}
              </button>
            ))}
            <a
              href={`mailto:${lead.email}?subject=Re: Your inquiry`}
              onClick={() => onStatusChange(lead.id, 'replied')}
              className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-[#FF4D29] text-white text-xs font-bold rounded-full hover:bg-orange-600 transition-all shadow-md shadow-[#FF4D29]/20"
            >
              <i className="fas fa-reply text-[10px]"></i> Répondre
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ icon, label, value, link }: { icon: string; label: string; value: string; link?: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <i className={`fas ${icon} text-gray-400 text-[10px]`}></i>
      </div>
      <div>
        <p className="text-xs text-gray-400 font-semibold">{label}</p>
        {link ? (
          <a href={link} className="text-sm font-semibold text-[#FF4D29] hover:underline">{value}</a>
        ) : (
          <p className="text-sm font-semibold text-[#0F0F0F]">{value}</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ADD PROJECT MODAL
═══════════════════════════════════════════ */
function AddProjectModal({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');

  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'dz_';
    for (let i = 0; i < 32; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
    return key;
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const apiKey = generateApiKey();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const { error } = await supabase.from('projects').insert({
      name: name.trim(),
      slug,
      url: url.trim() || null,
      api_key: apiKey,
      description: description.trim() || null,
      status: 'active',
    });

    setSaving(false);
    if (error) {
      console.error(error);
      return;
    }
    setGeneratedKey(apiKey);
  };

  if (generatedKey) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
            <i className="fas fa-check text-green-500 text-xl"></i>
          </div>
          <h3 className="text-lg font-extrabold text-center text-[#0F0F0F] mb-2">Projet créé !</h3>
          <p className="text-sm text-gray-500 text-center mb-6">Voici la clé API à configurer dans le sous-projet :</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">API Key</p>
            <code className="text-sm text-[#0F0F0F] font-mono break-all select-all">{generatedKey}</code>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-xs text-amber-700 font-semibold">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              Copiez cette clé maintenant. Elle ne sera plus affichée.
            </p>
          </div>

          <button
            onClick={() => { onAdded(); onClose(); }}
            className="w-full py-3 bg-[#FF4D29] text-white font-bold rounded-xl hover:bg-orange-600 transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-extrabold text-[#0F0F0F] mb-6">Ajouter un projet</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nom du projet *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: MonSaaS"
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">URL du site</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://monsaas.com"
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Description courte du projet..."
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || saving}
            className={`flex-1 py-3 font-bold rounded-xl transition-all text-sm ${
              name.trim() && !saving
                ? 'bg-[#FF4D29] text-white hover:bg-orange-600 shadow-md shadow-[#FF4D29]/20'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            {saving ? <><i className="fas fa-spinner animate-spin mr-1"></i> Création...</> : 'Créer le projet'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<ProjectContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ProjectContact['status']>('all');
  const [projectFilter, setProjectFilter] = useState<number | 'all'>('all');
  const [showModal, setShowModal] = useState(false);

  const loadData = useCallback(async () => {
    const [p, l] = await Promise.all([getProjects(), getProjectContacts()]);
    setProjects(p);
    setLeads(l);
  }, []);

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (!session) { router.push('/admin'); return; }
      await loadData();
      setLoading(false);
    };
    init();
  }, [router, loadData]);

  const handleStatusChange = useCallback(async (id: number, status: ProjectContact['status']) => {
    await updateProjectContactStatus(id, status);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
  }, []);

  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p.name]));

  const filtered = leads
    .filter((l) => projectFilter === 'all' || l.project_id === projectFilter)
    .filter((l) => filter === 'all' || l.status === filter);

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    read: leads.filter((l) => l.status === 'read').length,
    replied: leads.filter((l) => l.status === 'replied').length,
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center">
      <i className="fas fa-spinner animate-spin text-[#FF4D29] text-3xl"></i>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {showModal && <AddProjectModal onClose={() => setShowModal(false)} onAdded={loadData} />}

      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
            <i className="fas fa-arrow-left text-gray-500 text-xs"></i>
          </Link>
          <div>
            <h1 className="text-sm font-extrabold text-[#0F0F0F] flex items-center gap-2">
              Projets & Leads
              {counts.new > 0 && (
                <span className="px-2 py-0.5 bg-[#FF4D29] text-white text-xs font-extrabold rounded-full">
                  {counts.new}
                </span>
              )}
            </h1>
            <p className="text-xs text-gray-400">{projects.length} projet{projects.length > 1 ? 's' : ''} · {leads.length} lead{leads.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF4D29] text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-[#FF4D29]/20"
        >
          <i className="fas fa-plus text-xs"></i> Nouveau projet
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Projects overview */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {projects.map((p) => {
              const pLeads = leads.filter((l) => l.project_id === p.id);
              const newCount = pLeads.filter((l) => l.status === 'new').length;
              return (
                <button
                  key={p.id}
                  onClick={() => setProjectFilter(projectFilter === p.id ? 'all' : p.id)}
                  className={`text-left bg-white rounded-2xl p-5 border transition-all duration-200 ${
                    projectFilter === p.id
                      ? 'border-indigo-300 shadow-md shadow-indigo-500/10'
                      : 'border-gray-100 shadow-sm hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-extrabold text-[#0F0F0F] truncate">{p.name}</h3>
                    {newCount > 0 && (
                      <span className="px-2 py-0.5 bg-[#FF4D29] text-white text-xs font-extrabold rounded-full">
                        {newCount}
                      </span>
                    )}
                  </div>
                  {p.url && <p className="text-xs text-gray-400 truncate mb-2">{p.url}</p>}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-indigo-500">{pLeads.length} lead{pLeads.length > 1 ? 's' : ''}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      p.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Status filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {([
            { key: 'all', label: 'Tous', count: counts.all },
            { key: 'new', label: 'Nouveaux', count: counts.new },
            { key: 'read', label: 'Lus', count: counts.read },
            { key: 'replied', label: 'Répondus', count: counts.replied },
          ] as const).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                filter === key
                  ? 'bg-[#FF4D29] text-white border-[#FF4D29] shadow-md shadow-[#FF4D29]/20'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF4D29]/40 hover:text-[#FF4D29]'
              }`}
            >
              {label}
              <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-full ${
                filter === key ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {count}
              </span>
            </button>
          ))}

          {projectFilter !== 'all' && (
            <button
              onClick={() => setProjectFilter('all')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-all"
            >
              <i className="fas fa-times text-[10px]"></i>
              {projectMap[projectFilter]}
            </button>
          )}
        </div>

        {/* Leads list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
              <i className="fas fa-inbox text-gray-300 text-2xl"></i>
            </div>
            <p className="text-gray-400 font-semibold">
              {projects.length === 0 ? 'Aucun projet. Créez-en un pour commencer.' : 'Aucun lead dans cette catégorie.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((l) => (
              <LeadCard
                key={l.id}
                lead={l}
                projectName={projectMap[l.project_id] || 'Projet inconnu'}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
