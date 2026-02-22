'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../context/LangContext';

export default function Hero() {
  const { t, lang } = useLang();

  return (
    <header className="relative pt-36 pb-16 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#FF4D29]/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-10 w-48 h-48 md:w-72 md:h-72 bg-purple-300/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Floating Avatars */}
      <div className="absolute top-32 left-[10%] md:left-[20%] lg:left-[25%] animate-hover-card z-20 hidden md:block" style={{ animationDelay: '0s' }}>
        <div className="relative">
          <img src="https://i.pravatar.cc/150?img=32" alt="Collaborator" className="w-12 h-12 rounded-full border-2 border-white shadow-lg" loading="lazy" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm text-[10px]">
            <i className="fas fa-mouse-pointer transform -rotate-12"></i>
          </div>
        </div>
      </div>

      <div className="absolute top-48 right-[5%] md:right-[15%] lg:right-[22%] animate-hover-card z-20 hidden md:block" style={{ animationDelay: '1.5s' }}>
        <div className="relative">
          <img src="https://i.pravatar.cc/150?img=11" alt="Collaborator" className="w-14 h-14 rounded-full border-2 border-white shadow-lg" loading="lazy" />
          <div className="absolute -bottom-1 -left-2 w-7 h-7 bg-[#FF4D29] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm text-xs">
            <i className="fas fa-pen"></i>
          </div>
        </div>
      </div>

      <div className="absolute bottom-48 left-[15%] md:left-[25%] animate-hover-card z-20 hidden md:block" style={{ animationDelay: '2.5s' }}>
        <div className="relative">
          <img src="https://i.pravatar.cc/150?img=5" alt="Collaborator" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" loading="lazy" />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm text-[8px]">
            <i className="fas fa-check"></i>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-soft mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-[#FF4D29] animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('hero-badge')}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] md:leading-[1.15] mb-4 md:mb-6 max-w-6xl mx-auto flex flex-col items-center gap-1 md:gap-2">
          {/* Line 1 */}
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-6">
            {lang === 'fr' ? (
              <>
                <span className="word-mask"><span className="word-animate delay-100">Votre</span></span>
                <span className="word-mask"><span className="word-animate delay-200">Transformation</span></span>
                <span className="word-mask"><span className="word-animate delay-300">Digitale,</span></span>
              </>
            ) : (
              <>
                <span className="word-mask"><span className="word-animate delay-100">Your</span></span>
                <span className="word-mask"><span className="word-animate delay-200">Digital</span></span>
                <span className="word-mask"><span className="word-animate delay-300">Transformation,</span></span>
              </>
            )}
          </div>
          {/* Line 2 */}
          <div className="flex flex-wrap justify-center items-baseline gap-x-2 md:gap-x-6">
            <span className="word-mask pb-2" style={{ overflow: 'hidden' }}>
              <span className="word-animate delay-400 block relative">
                <span className="text-gradient-orange animate-shimmer relative inline-block pb-1 md:pb-2">
                  {lang === 'fr' ? 'Sereine' : 'Serene'}
                  <svg className="absolute w-full h-3 md:h-4 -bottom-1 left-0 text-[#FF4D29] opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </span>
            </span>
            <span className="word-mask"><span className="word-animate delay-500">&</span></span>
            <span className="word-mask"><span className="word-animate delay-500">{lang === 'fr' ? 'Maîtrisée' : 'Controlled'}</span></span>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
          {t('hero-subtitle')}
          <br className="hidden md:block" />
          <strong>{t('hero-subtitle-strong')}</strong>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-20 w-full px-4">
          <Link
            href={`/${lang}/contact`}
            className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-[#FF4D29] text-white rounded-full font-bold text-base md:text-lg shadow-lg shadow-[#FF4D29]/30 hover:shadow-[#FF4D29]/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            {t('hero-cta1')} <i className="fas fa-arrow-right text-sm"></i>
          </Link>
          <Link
            href="#work"
            className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-white text-[#0F0F0F] border border-gray-200 rounded-full font-bold text-base md:text-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 active:scale-95 text-center"
          >
            {t('hero-cta2')}
          </Link>
        </div>

        {/* Hero Visual / Mockup */}
        <div className="relative max-w-6xl mx-auto mt-10">
          <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-900 aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden">
              <div className="w-full h-full relative opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out">
                {/* Sidebar */}
                <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 border-r border-gray-700/50 hidden md:block">
                  <div className="h-12 w-32 bg-gray-800 rounded-lg m-6"></div>
                  <div className="space-y-4 px-6 mt-10">
                    <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
                  </div>
                </div>
                {/* Header */}
                <div className="absolute top-0 left-0 md:left-64 right-0 h-20 bg-gray-900/50 border-b border-gray-700/50 backdrop-blur-md flex items-center px-8 justify-between">
                  <div className="h-8 w-48 bg-gray-700 rounded"></div>
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#FF4D29]"></div>
                  </div>
                </div>
                {/* Content */}
                <div className="absolute top-20 left-0 md:left-64 right-0 bottom-0 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                  <div className="col-span-2 h-64 bg-gray-800/50 rounded-2xl border border-gray-700/30 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#FF4D29]/20 to-transparent"></div>
                  </div>
                  <div className="h-64 bg-gray-800/50 rounded-2xl border border-gray-700/30"></div>
                  <div className="col-span-3 h-48 bg-gray-800/50 rounded-2xl border border-gray-700/30"></div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -right-10 top-20 w-64 h-40 bg-white rounded-xl shadow-xl p-4 transform rotate-6 hidden lg:block animate-float">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t('hero-float-1-title')}</div>
                    <div className="text-xs text-gray-500">{t('hero-float-1-desc')}</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full mb-2 overflow-hidden">
                  <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -left-10 bottom-20 w-56 h-auto bg-[#0F0F0F] rounded-xl shadow-xl p-5 transform -rotate-3 hidden lg:block animate-float-delayed">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-medium text-gray-400">{t('hero-float-2-title')}</div>
                  <div className="text-xs font-bold text-[#FF4D29]">+24%</div>
                </div>
                <div className="text-3xl font-bold text-white">42.5k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
