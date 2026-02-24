'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, getContacts, updateContactStatus } from '@/lib/supabase';
import type { Contact } from '@/lib/types';

const STATUS_CONFIG = {
  new:     { label: 'Nouveau',  color: 'bg-orange-100 text-[#FF4D29] border-orange-200' },
  read:    { label: 'Lu',       color: 'bg-blue-50 text-blue-600 border-blue-100' },
  replied: { label: 'Répondu', color: 'bg-green-50 text-green-600 border-green-100' },
};

function ContactCard({
  contact,
  onStatusChange,
}: {
  contact: Contact;
  onStatusChange: (id: number, status: Contact['status']) => void;
}) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[contact.status];
  const date = new Date(contact.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
      contact.status === 'new' ? 'border-[#FF4D29]/30 shadow-md shadow-[#FF4D29]/5' : 'border-gray-100 shadow-sm'
    }`}>
      {/* Header carte */}
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
        onClick={() => {
          setOpen((v) => !v);
          if (contact.status === 'new') onStatusChange(contact.id, 'read');
        }}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Avatar initiale */}
          <div className="w-10 h-10 rounded-full bg-[#FF4D29]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-[#FF4D29] font-extrabold text-sm">
              {contact.first_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#0F0F0F] text-sm">{contact.first_name}</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-gray-50 text-gray-400 rounded-full border border-gray-100">
                {contact.lang.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5 truncate">{contact.email}</p>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">{contact.need}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-400 hidden sm:block">{date}</span>
          <i className={`fas fa-chevron-down text-gray-300 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {/* Détails expandables */}
      {open && (
        <div className="px-6 pb-6 border-t border-gray-50 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Colonne gauche */}
            <div className="space-y-3">
              <Detail icon="fa-lightbulb" label="Besoin" value={contact.need} />
              <Detail icon="fa-coins" label="Budget" value={contact.budget} />
              <Detail icon="fa-clock" label="Délai" value={contact.timeline} />
            </div>
            {/* Colonne droite */}
            <div className="space-y-3">
              <Detail icon="fa-envelope" label="Email" value={contact.email} link={`mailto:${contact.email}`} />
              {contact.phone && <Detail icon="fa-phone" label="Téléphone" value={contact.phone} link={`tel:${contact.phone}`} />}
              <Detail icon="fa-calendar" label="Reçu le" value={date} />
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#FFF8F3] border border-orange-100 rounded-xl p-4 mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              <i className="fas fa-comment-alt mr-1.5"></i>Description du projet
            </p>
            <p className="text-sm text-[#0F0F0F] leading-relaxed">{contact.description}</p>
          </div>

          {/* Actions statut */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Statut :</span>
            {(['new', 'read', 'replied'] as Contact['status'][]).map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(contact.id, s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-150 ${
                  contact.status === s
                    ? STATUS_CONFIG[s].color + ' opacity-100'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-[#FF4D29]/30 hover:text-[#FF4D29]'
                }`}
              >
                {STATUS_CONFIG[s].label}
              </button>
            ))}
            <a
              href={`mailto:${contact.email}?subject=Diez Agency — Votre projet ${contact.need}`}
              onClick={() => onStatusChange(contact.id, 'replied')}
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
   PAGE PRINCIPALE
═══════════════════════════════════════════ */
export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Contact['status']>('all');

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (!session) { router.push('/admin'); return; }
      const data = await getContacts();
      setContacts(data);
      setLoading(false);
    };
    init();
  }, [router]);

  const handleStatusChange = useCallback(async (id: number, status: Contact['status']) => {
    await updateContactStatus(id, status);
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
  }, []);

  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);
  const counts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === 'new').length,
    read: contacts.filter((c) => c.status === 'read').length,
    replied: contacts.filter((c) => c.status === 'replied').length,
  };

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
              Demandes Contact
              {counts.new > 0 && (
                <span className="px-2 py-0.5 bg-[#FF4D29] text-white text-xs font-extrabold rounded-full">
                  {counts.new}
                </span>
              )}
            </h1>
            <p className="text-xs text-gray-400">{contacts.length} demande{contacts.length > 1 ? 's' : ''} au total</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8">
          {([
            { key: 'all', label: 'Toutes', count: counts.all },
            { key: 'new', label: 'Nouvelles', count: counts.new },
            { key: 'read', label: 'Lues', count: counts.read },
            { key: 'replied', label: 'Répondues', count: counts.replied },
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
        </div>

        {/* Liste contacts */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
              <i className="fas fa-inbox text-gray-300 text-2xl"></i>
            </div>
            <p className="text-gray-400 font-semibold">Aucune demande dans cette catégorie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((c) => (
              <ContactCard
                key={c.id}
                contact={c}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
