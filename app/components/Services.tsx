'use client';
import { useLang } from '../context/LangContext';

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative z-0 min-h-screen flex flex-col justify-start pt-32 md:pt-48 pb-32 bg-[#0F0F0F] text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#FF4D29] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal">
          <span className="text-[#FF4D29] font-bold tracking-wider uppercase text-sm mb-4 block">{t('bento-label')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('bento-title')}</h2>
          <p className="text-xl text-gray-400 leading-relaxed">{t('bento-subtitle')}</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* 1. Interfaces */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-100 relative overflow-hidden bento-card">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl mb-6">
                <i className="fas fa-pen-ruler"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('bento-1-title')}</h3>
              <p className="text-gray-400 max-w-sm">{t('bento-1-desc')}</p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <div className="flex gap-4">
                <div className="w-32 h-32 rounded-full border-4 border-white/20"></div>
                <div className="w-32 h-32 rounded-full bg-blue-500/30 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* 2. Dev (Tall) */}
          <div className="md:row-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-200 relative overflow-hidden flex flex-col bento-card">
            <div className="w-12 h-12 rounded-xl bg-[#FF4D29]/20 flex items-center justify-center text-[#FF4D29] text-xl mb-6">
              <i className="fas fa-code"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2">{t('bento-2-title')}</h3>
            <p className="text-gray-400 mb-8">{t('bento-2-desc')}</p>
            {/* Fake Terminal */}
            <div className="mt-auto bg-black/50 rounded-xl p-4 font-mono text-xs text-green-400 border border-white/5 shadow-2xl">
              <div className="flex gap-1.5 mb-3 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <p><span className="text-purple-400">const</span> <span className="text-yellow-300">process</span> = <span className="text-blue-300">async</span> {`() => {`}</p>
              <p className="pl-4"><span className="text-purple-400">await</span> automatiser(<span className="text-orange-300">&apos;Facturation&apos;</span>);</p>
              <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-green-300">&quot;Temps Gagné&quot;</span>;</p>
              <p>{`}`}</p>
            </div>
          </div>

          {/* 3. Automatisation */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-300 relative overflow-hidden bento-card">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 text-xl mb-6">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('bento-3-title')}</h3>
              <p className="text-gray-400 text-sm">{t('bento-3-desc')}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-between px-8 pb-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <div className="w-2 bg-green-400 h-4 rounded-t"></div>
              <div className="w-2 bg-green-400 h-8 rounded-t"></div>
              <div className="w-2 bg-green-400 h-6 rounded-t"></div>
              <div className="w-2 bg-green-400 h-12 rounded-t"></div>
              <div className="w-2 bg-green-400 h-10 rounded-t"></div>
            </div>
          </div>

          {/* 4. Accessibilité */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-400 relative overflow-hidden bento-card">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-xl mb-6">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('bento-4-title')}</h3>
              <p className="text-gray-400 text-sm">{t('bento-4-desc')}</p>
            </div>
            <i className="fas fa-wifi absolute -bottom-4 -right-4 text-8xl text-white/5 group-hover:text-white/10 transition-colors" style={{ transform: 'rotate(-15deg)' }}></i>
          </div>
        </div>
      </div>
    </section>
  );
}
