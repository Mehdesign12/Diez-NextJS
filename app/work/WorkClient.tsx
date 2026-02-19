'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { getRealisations } from '@/lib/supabase';
import type { Realisation } from '@/lib/types';

/* ── Fallback image ── */
const FALLBACK_BG = '#1a1a2e';

/* ══════════════════════════════════════════
   MODAL DETAIL RÉALISATION
══════════════════════════════════════════ */
function RealisationModal({
  realisation,
  onClose,
}: {
  realisation: Realisation;
  onClose: () => void;
}) {
  /* Fermeture clavier */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" />

      {/* Panel */}
      <div
        className="relative z-10 w-full md:max-w-3xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Image header */}
        <div className="relative h-56 md:h-72 bg-[#1a1a2e] overflow-hidden">
          {realisation.image_url ? (
            <img
              src={realisation.image_url}
              alt={realisation.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="fas fa-rocket text-7xl text-white/20"></i>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge featured */}
          {realisation.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#FF4D29] text-white text-xs font-bold rounded-full shadow-lg">
              ⭐ Featured
            </span>
          )}

          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <i className="fas fa-times text-sm"></i>
          </button>

          {/* Titre sur image */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
              {realisation.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {/* Tags */}
          {realisation.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {realisation.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#FFF8F3] border border-orange-100 text-[#FF4D29] text-xs font-bold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description courte */}
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {realisation.description}
          </p>

          {/* Description longue */}
          {realisation.long_description && (
            <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4 mb-4">
              {realisation.long_description}
            </p>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {realisation.link && (
              <a
                href={realisation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF4D29] text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-[#FF4D29]/20 hover:-translate-y-0.5 active:scale-95"
              >
                <i className="fas fa-external-link-alt text-sm"></i>
                Voir le projet
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
            >
              <i className="fas fa-times text-sm"></i>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE /work
══════════════════════════════════════════ */
export default function WorkClient() {
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<Realisation | null>(null);

  useEffect(() => {
    getRealisations().then((data) => {
      setRealisations(data);
      setLoading(false);
    });
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  const allTags = Array.from(new Set(realisations.flatMap((r) => r.tags)));
  const filtered = activeTag
    ? realisations.filter((r) => r.tags.includes(activeTag))
    : realisations;

  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      {/* ── Modal ── */}
      {selected && (
        <RealisationModal realisation={selected} onClose={closeModal} />
      )}

      {/* ── Navbar retour ── */}
      <nav className="fixed w-full z-50 top-6 px-4">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img src="/images/logo_clean.png" alt="Diez Agency" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#FF4D29] transition-colors">Diez Agency</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/#work" className="text-sm font-medium text-gray-500 hover:text-[#FF4D29] transition-colors flex items-center gap-1.5">
              <i className="fas fa-arrow-left text-xs"></i> Retour
            </Link>
            <Link href="/#contact" className="px-5 py-2 bg-[#FF4D29] text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-all">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-36 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#FF4D29] animate-pulse"></span>
            Portfolio complet
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F0F0F] leading-tight mb-6">
            Tous nos <span className="text-gradient-orange">projets</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Des écosystèmes digitaux qui scalent. Chaque projet est conçu pour durer et performer.
          </p>
        </div>
      </section>

      {/* ── Filtres par tag ── */}
      {allTags.length > 0 && !loading && (
        <section className="pb-10 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTag === null
                  ? 'bg-[#FF4D29] text-white shadow-lg shadow-[#FF4D29]/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF4D29] hover:text-[#FF4D29]'
              }`}
            >
              Tous ({realisations.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-[#FF4D29] text-white shadow-lg shadow-[#FF4D29]/20'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF4D29] hover:text-[#FF4D29]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Grille projets ── */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-4 border-[#FF4D29] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <i className="fas fa-folder-open text-4xl mb-4 block"></i>
              <p className="text-lg">Aucun projet pour ce filtre.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r, i) => (
                <article
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col cursor-pointer"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden" style={{ backgroundColor: FALLBACK_BG }}>
                    {r.image_url ? (
                      <img
                        src={r.image_url}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fas fa-rocket text-5xl text-white/20 group-hover:scale-110 transition-transform duration-500"></i>
                      </div>
                    )}
                    {r.featured && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#FF4D29] text-white text-xs font-bold rounded-full shadow">
                        ⭐ Featured
                      </span>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#FF4D29]/0 group-hover:bg-[#FF4D29]/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-[#FF4D29] font-bold text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <i className="fas fa-eye text-xs"></i> Voir les détails
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {r.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {r.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 bg-[#FFF8F3] border border-orange-100 text-[#FF4D29] text-xs font-semibold rounded-full">
                            {tag}
                          </span>
                        ))}
                        {r.tags.length > 3 && (
                          <span className="px-2.5 py-0.5 bg-gray-50 text-gray-400 text-xs rounded-full">
                            +{r.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <h2 className="text-lg font-extrabold text-[#0F0F0F] mb-2 group-hover:text-[#FF4D29] transition-colors">
                      {r.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2">
                      {r.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-[#FF4D29] text-sm font-bold">
                      <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                      <span>Voir le projet</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA bas de page ── */}
      <section className="bg-[#0F0F0F] py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Votre projet, <span className="text-[#FF4D29]">notre prochain succès</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Audit gratuit · Délais garantis · Budget respecté
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D29] text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-[#FF4D29]/30 hover:shadow-[#FF4D29]/50 hover:-translate-y-0.5"
          >
            <i className="fas fa-rocket"></i> Démarrer mon projet
          </Link>
        </div>
      </section>
    </div>
  );
}
