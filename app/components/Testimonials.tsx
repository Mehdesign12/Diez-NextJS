'use client';
import { useRef } from 'react';
import { useLang } from '../context/LangContext';
import { BlurFade } from './ui/BlurFade';
import { TextAnimate } from './ui/TextAnimate';

export default function Testimonials() {
  const { t } = useLang();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
    }
  };

  const reviews = [
    { key: 'testim-1', name: 'Marc D.', role: 'Dirigeant, LogiTrans', img: '68' },
    { key: 'testim-2', name: 'Sophie L.', role: 'Fondatrice, Cabinet Conseil', img: '44' },
    { key: 'testim-3', name: 'Thomas B.', role: 'Directeur, BatiPro', img: '12' },
  ];

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 text-center md:text-left">
          <div className="mx-auto md:mx-0">
            <BlurFade delay={0} duration={0.5} yOffset={16} blur="10px" inView>
              <h2 className="text-4xl font-bold text-[#0F0F0F] mb-4">
                <TextAnimate animation="slideUp" by="word" delay={0}>
                  {t('testim-title')}
                </TextAnimate>
              </h2>
            </BlurFade>
            <BlurFade delay={0.25} duration={0.5} yOffset={10} blur="8px" inView>
              <p className="text-gray-600">{t('testim-subtitle')}</p>
            </BlurFade>
          </div>
        </div>

        {/* Cards */}
        <div className="relative group/slider">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth"
          >
            {reviews.map((r, i) => (
              <BlurFade key={i} delay={0.1 + i * 0.12} duration={0.55} yOffset={18} blur="10px" inView>
                <div className="min-w-[85vw] md:min-w-0 snap-center h-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex text-[#FF4D29] mb-4 text-xs gap-1">
                    {[...Array(5)].map((_, j) => <i key={j} className="fas fa-star"></i>)}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{t(r.key)}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${r.img}`} alt={r.name} loading="lazy" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0F0F0F]">{r.name}</div>
                      <div className="text-xs text-gray-400">{r.role}</div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Mobile Arrow */}
          <button
            onClick={scrollSlider}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-[#0F0F0F] shadow-lg animate-pulse hover:bg-white transition-all active:scale-95"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
