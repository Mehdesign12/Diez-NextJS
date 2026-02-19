'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '../context/LangContext';
import { getRealisationsFeatured } from '../../lib/supabase';
import type { Realisation } from '../../lib/types';

const FALLBACK_BG = '#1f2937';

export default function Portfolio() {
  const { t } = useLang();
  const [projects, setProjects] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getRealisationsFeatured().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const scrollSlider = () => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth * 0.85;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 reveal text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0F0F0F]">{t('work-title')}</h2>
            <p className="text-gray-600 text-lg">{t('work-subtitle')}</p>
          </div>
          <Link href="/work" className="hidden md:inline-flex items-center gap-2 font-semibold text-[#FF4D29] hover:gap-4 transition-all">
            {t('work-link')} <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="relative group/slider">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12">
            <div ref={sliderRef} className="md:contents flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth">
              {loading ? (
                <div className="min-w-full flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#FF4D29] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="min-w-full flex items-center justify-center py-12 text-gray-400">
                  Aucune réalisation pour le moment
                </div>
              ) : (
                projects.map((r, index) => {
                  const marginTop = index % 2 === 1 ? 'md:mt-16' : '';
                  return (
                    <div
                      key={r.id}
                      className={`min-w-[85vw] md:min-w-0 snap-center group cursor-pointer ${marginTop} reveal ${index % 2 === 0 ? 'delay-100' : 'delay-200'} overflow-hidden rounded-3xl shadow-lg mb-0 md:mb-6 aspect-[4/3] relative active:scale-95 transition-transform duration-300`}
                      onClick={() => r.link && window.open(r.link, '_blank')}
                    >
                      {/* Background */}
                      <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: FALLBACK_BG }}>
                        {r.image_url ? (
                          <img src={r.image_url} alt={r.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-chart-line text-7xl md:text-9xl opacity-20 text-white"></i>
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10"></div>

                      {/* Info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-extrabold text-white mb-1">{r.title}</h3>
                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                          {r.description}
                        </p>
                        {r.tags.length > 0 && (
                          <div className="flex gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 flex-wrap">
                            {r.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Mobile arrow */}
          <button onClick={scrollSlider} className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-[#0F0F0F] shadow-lg hover:bg-white transition-all active:scale-95">
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        {projects.length > 0 && (
          <div className="md:hidden flex justify-center gap-2 mt-4 mb-8 opacity-50">
            {projects.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#FF4D29]' : 'bg-gray-300'}`}></div>
            ))}
          </div>
        )}

        <div className="mt-4 text-center md:hidden">
          <Link href="/work" className="inline-flex items-center gap-2 font-semibold text-[#FF4D29]">
            {t('work-link')} <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
