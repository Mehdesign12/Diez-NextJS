'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Realisation } from '@/lib/types';

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect width="800" height="500" fill="%23f4f4f5"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24" fill="%23999" font-family="sans-serif"%3EAperçu du projet%3C/text%3E%3C/svg%3E';

interface Props {
  realisations: Realisation[];
}

export default function WorkClient({ realisations }: Props) {
  const allTags = Array.from(new Set(realisations.flatMap((r) => r.tags)));
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? realisations.filter((r) => r.tags.includes(activeTag))
    : realisations;

  return (
    <div className="min-h-screen bg-[#FFF8F3]">

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
      {allTags.length > 0 && (
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
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <i className="fas fa-folder-open text-4xl mb-4 block"></i>
              <p className="text-lg">Aucun projet pour ce filtre.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => (
                <article
                  key={r.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-[#F4F4F5]">
                    <img
                      src={r.image_url || FALLBACK_IMAGE}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {r.featured && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#FF4D29] text-white text-xs font-bold rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags */}
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
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {r.description}
                    </p>

                    {/* Footer card */}
                    {r.link && (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FF4D29] hover:gap-3 transition-all"
                      >
                        Voir le projet <i className="fas fa-arrow-right text-xs"></i>
                      </a>
                    )}
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
