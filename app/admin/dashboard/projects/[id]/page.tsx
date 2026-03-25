'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getSession, getProjectById, getProjectContacts, updateProjectContactStatus, getContactNotes, addContactNote, supabase } from '@/lib/supabase';
import type { Project, ProjectContact, ProjectContactNote } from '@/lib/types';

const STATUS_CONFIG = {
  new:     { label: 'Nouveau',  color: 'bg-orange-100 text-[#FF4D29] border-orange-200' },
  read:    { label: 'Lu',       color: 'bg-blue-50 text-blue-600 border-blue-100' },
  replied: { label: 'Répondu', color: 'bg-green-50 text-green-600 border-green-100' },
};

/* ═══════════════════════════════════════════
   NOTES SECTION
═══════════════════════════════════════════ */
function NotesSection({ contactId }: { contactId: number }) {
  const [notes, setNotes] = useState<ProjectContactNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getContactNotes(contactId).then((n) => { setNotes(n); setLoaded(true); });
  }, [contactId]);

  const handleAdd = async () => {
    if (!newNote.trim() || saving) return;
    setSaving(true);
    const { error } = await addContactNote(contactId, newNote.trim());
    if (!error) {
      setNotes((prev) => [{ id: Date.now(), contact_id: contactId, content: newNote.trim(), created_at: new Date().toISOString() }, ...prev]);
      setNewNote('');
    }
    setSaving(false);
  };

  if (!loaded) return <div className="text-xs text-gray-400"><i className="fas fa-spinner animate-spin mr-1"></i>Chargement notes...</div>;

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
        <i className="fas fa-sticky-note mr-1.5"></i>Notes internes ({notes.length})
      </p>
      <div className="flex gap-2 mb-3">
        <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="Ajouter une note..." className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF4D29] transition-colors" />
        <button onClick={handleAdd} disabled={!newNote.trim() || saving} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${newNote.trim() && !saving ? 'bg-[#FF4D29] text-white hover:bg-orange-600' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
          {saving ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-plus"></i>}
        </button>
      </div>
      {notes.length > 0 && (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {notes.map((n) => (
            <div key={n.id} className="flex items-start gap-2 text-sm">
              <i className="fas fa-circle text-[3px] text-gray-300 mt-2 flex-shrink-0"></i>
              <div className="flex-1 min-w-0">
                <p className="text-[#0F0F0F] text-sm">{n.content}</p>
                <p className="text-xs text-gray-400 mt-0.5">{new Date(n.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEAD CARD (compact for detail page)
═══════════════════════════════════════════ */
function LeadCard({ lead, onStatusChange }: { lead: ProjectContact; onStatusChange: (id: number, status: ProjectContact['status']) => void }) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[lead.status];
  const date = new Date(lead.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${lead.status === 'new' ? 'border-[#FF4D29]/30 shadow-md shadow-[#FF4D29]/5' : 'border-gray-100 shadow-sm'}`}>
      <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group" onClick={() => { setOpen((v) => !v); if (lead.status === 'new') onStatusChange(lead.id, 'read'); }}>
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-500 font-extrabold text-sm">{lead.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#0F0F0F] text-sm">{lead.name}</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${cfg.color}`}>{cfg.label}</span>
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
        <div className="px-6 pb-6 border-t border-gray-50 pt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Detail icon="fa-envelope" label="Email" value={lead.email} link={`mailto:${lead.email}`} />
              {lead.phone && <Detail icon="fa-phone" label="Téléphone" value={lead.phone} link={`tel:${lead.phone}`} />}
              {lead.budget && <Detail icon="fa-coins" label="Budget" value={lead.budget} />}
            </div>
            <div className="space-y-3">
              {lead.interests && lead.interests.length > 0 && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5"><i className="fas fa-tags text-gray-400 text-[10px]"></i></div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">Intérêts</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lead.interests.map((i) => (<span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">{i}</span>))}
                    </div>
                  </div>
                </div>
              )}
              <Detail icon="fa-calendar" label="Reçu le" value={date} />
            </div>
          </div>

          {lead.message && (
            <div className="bg-[#FFF8F3] border border-orange-100 rounded-xl p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"><i className="fas fa-comment-alt mr-1.5"></i>Message</p>
              <p className="text-sm text-[#0F0F0F] leading-relaxed whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}

          <NotesSection contactId={lead.id} />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Statut :</span>
            {(['new', 'read', 'replied'] as ProjectContact['status'][]).map((s) => (
              <button key={s} onClick={() => onStatusChange(lead.id, s)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-150 ${lead.status === s ? STATUS_CONFIG[s].color + ' opacity-100' : 'bg-white border-gray-200 text-gray-400 hover:border-[#FF4D29]/30 hover:text-[#FF4D29]'}`}>
                {STATUS_CONFIG[s].label}
              </button>
            ))}
            <a href={`mailto:${lead.email}?subject=Re: Your inquiry`} onClick={() => onStatusChange(lead.id, 'replied')} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-[#FF4D29] text-white text-xs font-bold rounded-full hover:bg-orange-600 transition-all shadow-md shadow-[#FF4D29]/20">
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
      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5"><i className={`fas ${icon} text-gray-400 text-[10px]`}></i></div>
      <div>
        <p className="text-xs text-gray-400 font-semibold">{label}</p>
        {link ? <a href={link} className="text-sm font-semibold text-[#FF4D29] hover:underline">{value}</a> : <p className="text-sm font-semibold text-[#0F0F0F]">{value}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROJECT DETAIL PAGE
═══════════════════════════════════════════ */
export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = Number(params?.id);

  const [project, setProject] = useState<Project | null>(null);
  const [leads, setLeads] = useState<ProjectContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ProjectContact['status']>('all');
  const [showKey, setShowKey] = useState(false);

  const loadData = useCallback(async () => {
    const [p, l] = await Promise.all([getProjectById(projectId), getProjectContacts(projectId)]);
    setProject(p);
    setLeads(l);
  }, [projectId]);

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (!session) { router.push('/admin'); return; }
      await loadData();
      setLoading(false);
    };
    init();
  }, [router, loadData]);

  // Auto-polling
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => loadData(), 30_000);
    return () => clearInterval(interval);
  }, [loading, loadData]);

  const handleStatusChange = useCallback(async (id: number, status: ProjectContact['status']) => {
    await updateProjectContactStatus(id, status);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
  }, []);

  const handleStatusToggle = async (newStatus: Project['status']) => {
    if (!project) return;
    await supabase.from('projects').update({ status: newStatus }).eq('id', project.id);
    setProject({ ...project, status: newStatus });
  };

  const filtered = leads.filter((l) => filter === 'all' || l.status === filter);
  const counts = { all: leads.length, new: leads.filter((l) => l.status === 'new').length, read: leads.filter((l) => l.status === 'read').length, replied: leads.filter((l) => l.status === 'replied').length };

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const weekLeads = leads.filter((l) => new Date(l.created_at) >= weekAgo).length;
  const monthLeads = leads.filter((l) => new Date(l.created_at) >= monthAgo).length;
  const conversionRate = leads.length > 0 ? Math.round((counts.replied / leads.length) * 100) : 0;

  if (loading) return (
    <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center">
      <i className="fas fa-spinner animate-spin text-[#FF4D29] text-3xl"></i>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 font-semibold mb-4">Projet introuvable</p>
        <Link href="/admin/dashboard/projects" className="text-[#FF4D29] font-bold hover:underline">Retour aux projets</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard/projects" className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
            <i className="fas fa-arrow-left text-gray-500 text-xs"></i>
          </Link>
          <div>
            <h1 className="text-sm font-extrabold text-[#0F0F0F] flex items-center gap-2">
              {project.name}
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${project.status === 'active' ? 'bg-green-50 text-green-600' : project.status === 'paused' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'}`}>
                {project.status}
              </span>
            </h1>
            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-[#FF4D29] transition-colors">{project.url} <i className="fas fa-external-link-alt text-[10px]"></i></a>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {project.status === 'active' ? (
            <button onClick={() => handleStatusToggle('paused')} className="px-3 py-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-all">
              <i className="fas fa-pause mr-1"></i> Pause
            </button>
          ) : (
            <button onClick={() => handleStatusToggle('active')} className="px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all">
              <i className="fas fa-play mr-1"></i> Activer
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total leads', value: leads.length, icon: 'fa-users', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Cette semaine', value: weekLeads, icon: 'fa-calendar-week', color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Ce mois', value: monthLeads, icon: 'fa-calendar', color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: 'Taux réponse', value: `${conversionRate}%`, icon: 'fa-chart-line', color: 'text-green-500', bg: 'bg-green-50' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <i className={`fas ${s.icon} ${s.color}`}></i>
              </div>
              <p className="text-2xl font-extrabold text-[#0F0F0F]">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Project info & API key */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-sm font-extrabold text-[#0F0F0F] mb-4">Informations du projet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.description && (
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1">Description</p>
                <p className="text-sm text-[#0F0F0F]">{project.description}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 font-semibold mb-1">Créé le</p>
              <p className="text-sm text-[#0F0F0F]">{new Date(project.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* API Key */}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <p className="text-xs text-gray-400 font-semibold mb-2">Clé API</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-[#0F0F0F] select-all">
                {showKey ? project.api_key : '••••••••••••••••••••••••••••••'}
              </code>
              <button onClick={() => setShowKey(!showKey)} className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
                <i className={`fas ${showKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {([
            { key: 'all', label: 'Tous', count: counts.all },
            { key: 'new', label: 'Nouveaux', count: counts.new },
            { key: 'read', label: 'Lus', count: counts.read },
            { key: 'replied', label: 'Répondus', count: counts.replied },
          ] as const).map(({ key, label, count }) => (
            <button key={key} onClick={() => setFilter(key)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${filter === key ? 'bg-[#FF4D29] text-white border-[#FF4D29] shadow-md shadow-[#FF4D29]/20' : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF4D29]/40 hover:text-[#FF4D29]'}`}>
              {label}
              <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-full ${filter === key ? 'bg-white/20' : 'bg-gray-100'}`}>{count}</span>
            </button>
          ))}
        </div>

        {/* Leads list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
              <i className="fas fa-inbox text-gray-300 text-2xl"></i>
            </div>
            <p className="text-gray-400 font-semibold">Aucun lead dans cette catégorie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((l) => (
              <LeadCard key={l.id} lead={l} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
