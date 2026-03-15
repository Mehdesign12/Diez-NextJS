'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useLang } from '../context/LangContext';
import { getRealisationsFeatured } from '../../lib/supabase';
import type { Realisation } from '../../lib/types';
import { MagicCard } from './ui/MagicCard';
import { BlurFade } from './ui/BlurFade';

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
function Modal({ r, onClose }: { r: Realisation; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', fn);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" style={{ animation: 'fadeIn .25s ease forwards' }} />
      <div
        className="relative z-10 w-full md:max-w-2xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden"
        style={{ maxHeight: '90vh', overflowY: 'auto', animation: 'slideUp .35s cubic-bezier(.34,1.56,.64,1) forwards' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full h-56 md:h-64 flex-shrink-0" style={{ background: '#111827' }}>
          {r.image_url
            ? <img src={r.image_url} alt={r.title} width={800} height={400} className="absolute inset-0 w-full h-full object-cover" />
            : <div className="absolute inset-0 flex items-center justify-center"><i className="fas fa-rocket text-6xl" style={{ color: 'rgba(255,255,255,0.15)' }} /></div>
          }
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 60%)' }} />
          {r.featured && <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#FF4D29' }}>⭐ Featured</span>}
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(0,0,0,.5)' }}>
            <i className="fas fa-times text-sm" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-2xl font-extrabold text-white">{r.title}</h2>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          {r.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {r.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#FFF8F3', border: '1px solid #FFD5C8', color: '#FF4D29' }}>{tag}</span>
              ))}
            </div>
          )}
          <p className="text-gray-600 text-sm leading-relaxed mb-3">{r.description}</p>
          {r.long_description && <p className="text-gray-400 text-sm leading-relaxed pt-3" style={{ borderTop: '1px solid #f0f0f0' }}>{r.long_description}</p>}
          <div className="flex gap-3 mt-5">
            {r.link && (
              <a href={r.link} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white text-sm"
                style={{ background: '#FF4D29' }}>
                <i className="fas fa-external-link-alt text-xs" /> Voir le projet
              </a>
            )}
            <button onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-gray-700 text-sm" style={{ background: '#f4f4f5' }}>
              <i className="fas fa-times text-xs" /> Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   CARTE PROJET — design sobre (ref image 1)
══════════════════════════════════════════ */
function ProjectCard({ r, onClick }: { r: Realisation; onClick: () => void }) {
  return (
    <MagicCard
      gradientColor="#FF4D290A"
      gradientSize={220}
      className="border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
    >
      <div onClick={onClick} className="flex flex-col h-full">

        {/* Image — coins arrondis, ratio fixe */}
        <div className="relative w-full overflow-hidden rounded-xl m-3" style={{ width: 'calc(100% - 24px)', aspectRatio: '16/10', background: '#f3f4f6' }}>
          {r.image_url
            ? (
              <img
                src={r.image_url}
                alt={r.title}
                width={800}
                height={500}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )
            : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <i className="fas fa-rocket text-5xl text-gray-300" />
              </div>
            )
          }
          {/* Badge featured */}
          {r.featured && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white" style={{ background: '#FF4D29' }}>
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Contenu texte */}
        <div className="px-5 pb-5 pt-1 flex flex-col gap-3 flex-1">

          {/* Titre */}
          <h3 className="text-[1rem] font-bold text-[#0F0F0F] leading-snug group-hover:text-[#FF4D29] transition-colors duration-200">
            {r.title}
          </h3>

          {/* Tags */}
          {r.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {r.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{ background: '#FFF8F3', border: '1px solid #FFE0D5', color: '#FF4D29' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-500 text-[0.82rem] leading-relaxed line-clamp-2 flex-1">
            {r.description}
          </p>

          {/* Footer CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-[#FF4D29] flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
              Voir les détails <i className="fas fa-arrow-right text-[10px]" />
            </span>
            {r.link && (
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Voir le projet ${r.title}`}
                onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF4D29] hover:bg-orange-50 transition-colors duration-200"
              >
                <i className="fas fa-external-link-alt text-[10px]" />
              </a>
            )}
          </div>
        </div>

      </div>
    </MagicCard>
  );
}

/* ══════════════════════════════════════════
   SECTION PORTFOLIO (homepage)
══════════════════════════════════════════ */
export default function Portfolio() {
  const { t, lang } = useLang();
  const [projects, setProjects] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Realisation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRealisationsFeatured()
      .then(data => { setProjects(data); setLoading(false); })
      .catch(err => { console.error(err); setError('Erreur de chargement'); setLoading(false); });
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="work" className="py-20 bg-white relative">
      {selected && <Modal r={selected} onClose={closeModal} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-12">
          <BlurFade delay={0.05} yOffset={8} blur="8px">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#0F0F0F]">{t('work-title')}</h2>
              <p className="text-gray-500 text-sm md:text-base">{t('work-subtitle')}</p>
            </div>
          </BlurFade>
          <BlurFade delay={0.15} yOffset={6} blur="6px">
            <Link href={`/${lang}/work`} className="hidden md:inline-flex items-center gap-2 font-semibold text-[#FF4D29] mt-4 md:mt-0 hover:gap-4 transition-all">
              {t('work-link')} <i className="fas fa-arrow-right" />
            </Link>
          </BlurFade>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#FF4D29] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-400">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-gray-400">Aucune réalisation featured pour le moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((r, i) => (
              <BlurFade key={r.id} delay={0.1 + i * 0.08} yOffset={12} blur="8px" inView>
                <ProjectCard r={r} onClick={() => setSelected(r)} />
              </BlurFade>
            ))}
          </div>
        )}

        {/* Lien mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link href={`/${lang}/work`} className="inline-flex items-center gap-2 font-semibold text-[#FF4D29]">
            {t('work-link')} <i className="fas fa-arrow-right" />
          </Link>
        </div>

      </div>
    </section>
  );
}
