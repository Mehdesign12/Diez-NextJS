'use client';
import { useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function Pricing() {
  const { t } = useLang();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F0F0F] mb-6">{t('pricing-title')}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('pricing-subtitle')}</p>
        </div>

        <div className="relative group/slider">
          <div ref={sliderRef} className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-8 items-center pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth">

            {/* Starter */}
            <div className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 reveal delay-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('price-1-title')}</h3>
              <div className="text-4xl font-bold mb-6">2 900€<span className="text-base font-normal text-gray-500">{t('price-1-period')}</span></div>
              <p className="text-gray-500 mb-8 text-sm">{t('price-1-desc')}</p>
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center gap-3"><i className="fas fa-check text-green-500"></i> {t('price-1-f1')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-green-500"></i> {t('price-1-f2')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-green-500"></i> {t('price-1-f3')}</li>
                <li className="flex items-center gap-3 text-gray-300"><i className="fas fa-times"></i> {t('price-1-f4')}</li>
              </ul>
              <a href="#contact" className="block w-full py-3 px-6 text-center rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors">{t('price-1-btn')}</a>
            </div>

            {/* Pro (featured) */}
            <div className="min-w-[85vw] md:min-w-0 snap-center bg-[#0F0F0F] p-8 rounded-3xl shadow-2xl border border-gray-800 transform scale-100 md:scale-105 relative z-10 reveal delay-200">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF4D29] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{t('price-2-badge')}</div>
              <h3 className="text-xl font-bold text-white mb-2">{t('price-2-title')}</h3>
              <div className="text-4xl font-bold text-white mb-6">5 500€<span className="text-base font-normal text-gray-400">{t('price-2-period')}</span></div>
              <p className="text-gray-400 mb-8 text-sm">{t('price-2-desc')}</p>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center gap-3"><i className="fas fa-check text-[#FF4D29]"></i> {t('price-2-f1')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-[#FF4D29]"></i> {t('price-2-f2')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-[#FF4D29]"></i> {t('price-2-f3')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-[#FF4D29]"></i> {t('price-2-f4')}</li>
              </ul>
              <a href="#contact" className="block w-full py-3 px-6 text-center rounded-xl bg-[#FF4D29] text-white font-bold hover:bg-white hover:text-[#FF4D29] transition-colors">{t('price-2-btn')}</a>
            </div>

            {/* Enterprise */}
            <div className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 reveal delay-300">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('price-3-title')}</h3>
              <div className="text-4xl font-bold mb-6">Sur mesure<span className="text-base font-normal text-gray-500">{t('price-3-period')}</span></div>
              <p className="text-gray-500 mb-8 text-sm">{t('price-3-desc')}</p>
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center gap-3"><i className="fas fa-check text-green-500"></i> {t('price-3-f1')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-green-500"></i> {t('price-3-f2')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-green-500"></i> {t('price-3-f3')}</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-green-500"></i> {t('price-3-f4')}</li>
              </ul>
              <a href="#contact" className="block w-full py-3 px-6 text-center rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors">{t('price-3-btn')}</a>
            </div>
          </div>

          {/* Mobile Arrow */}
          <button onClick={scrollSlider} className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[#FF4D29]/80 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse hover:bg-[#FF4D29] transition-all active:scale-95">
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        {/* Mobile indicators */}
        <div className="md:hidden flex justify-center gap-2 mt-4 opacity-50">
          <div className="w-2 h-2 rounded-full bg-[#FF4D29]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
}
