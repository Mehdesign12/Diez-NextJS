'use client';
import Link from 'next/link';
import { useLang } from '../context/LangContext';

export default function CTA() {
  const { t, lang } = useLang();

  return (
    <section className="py-12 md:py-24 px-4 relative overflow-hidden z-30 bg-white rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl mb-0 md:mb-[400px]">
      <div className="max-w-6xl mx-auto relative">
        <div className="bg-[#0F0F0F] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl reveal border border-white/5">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#FF4D29] rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 pb-4">
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight">
              {t('cta-title-1')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D29] to-white">{t('cta-title-2')}</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 mb-10 md:mb-12 max-w-2xl mx-auto font-light">
              {t('cta-subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${lang}/contact`}
                className="px-8 py-4 md:px-10 md:py-5 bg-white text-[#0F0F0F] rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-2 group active:scale-95"
              >
                {t('cta-btn-1')}
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
              <Link
                href={`/${lang}#work`}
                className="px-8 py-4 md:px-10 md:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-base md:text-lg hover:bg-white/20 transition-all flex items-center justify-center active:scale-95"
              >
                {t('cta-btn-2')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
