'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useLang } from '../context/LangContext';
import { getRealisationsFeatured } from '../../lib/supabase';
import type { Realisation } from '../../lib/types';

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
            ? <img src={r.image_url} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />
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
   CARTE PROJET
══════════════════════════════════════════ */
function ProjectCard({ r, onClick }: { r: Realisation; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-3xl overflow-hidden"
      style={{
        background: '#111827',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        transition: 'transform .3s ease, box-shadow .3s ease',
        minHeight: '320px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.20)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)';
      }}
    >
      {/* Zone image — hauteur fixe px */}
      <div style={{ width: '100%', height: '220px', position: 'relative', flexShrink: 0, background: '#1f2937' }}>
        {r.image_url
          ? <img src={r.image_url} alt={r.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }}
              className="group-hover:scale-105" />
          : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-rocket" style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.12)' }} />
            </div>
        }
        {/* Gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 60%)' }} />
        {/* Badge featured */}
        {r.featured && (
          <span style={{ position: 'absolute', top: 12, left: 12, background: '#FF4D29', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
            ⭐ Featured
          </span>
        )}
        {/* Hover CTA */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .3s ease' }}
          className="group-hover:opacity-100">
          <span style={{ background: 'rgba(255,255,255,.92)', color: '#FF4D29', fontWeight: 700, fontSize: 13, padding: '8px 18px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="fas fa-eye text-xs" /> Voir les détails
          </span>
        </div>
        {/* Titre sur image */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px' }}>
          <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{r.title}</h3>
        </div>
      </div>

      {/* Zone texte */}
      <div style={{ padding: '16px 20px 20px', background: '#fff', flex: 1 }}>
        {r.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {r.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{ background: '#FFF8F3', border: '1px solid #FFD5C8', color: '#FF4D29', fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20 }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {r.description}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION PORTFOLIO (homepage)
══════════════════════════════════════════ */
export default function Portfolio() {
  const { t } = useLang();
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
    <section id="work" className="py-24 bg-white relative">
      {selected && <Modal r={selected} onClose={closeModal} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0F0F0F]">{t('work-title')}</h2>
            <p className="text-gray-600 text-lg">{t('work-subtitle')}</p>
          </div>
          <Link href="/work" className="hidden md:inline-flex items-center gap-2 font-semibold text-[#FF4D29] mt-4 md:mt-0 hover:gap-4 transition-all">
            {t('work-link')} <i className="fas fa-arrow-right" />
          </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((r, i) => (
              <div key={r.id} className={i % 2 === 1 ? 'md:mt-12' : ''}>
                <ProjectCard r={r} onClick={() => setSelected(r)} />
              </div>
            ))}
          </div>
        )}

        {/* Lien mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link href="/work" className="inline-flex items-center gap-2 font-semibold text-[#FF4D29]">
            {t('work-link')} <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
