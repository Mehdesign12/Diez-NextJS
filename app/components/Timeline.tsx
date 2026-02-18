'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function Timeline() {
  const { t } = useLang();
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !progressRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const offset = windowHeight / 2;
      const scrolled = windowHeight - rect.top - offset;
      const totalHeight = rect.height;
      let percentage = (scrolled / totalHeight) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      progressRef.current.style.height = percentage + '%';

      dotsRef.current.forEach((dot, index) => {
        const triggers = [10, 45, 80];
        if (percentage > triggers[index]) {
          dot.className = dot.className
            .replace('border-gray-100', 'border-[#FF4D29]')
            .replace('text-gray-300', 'text-[#FF4D29]');
          dot.classList.add('border-[#FF4D29]', 'text-[#FF4D29]', 'bg-orange-50', 'scale-110', 'shadow-glow');
          dot.classList.remove('border-gray-100', 'text-gray-300');
        } else {
          dot.classList.add('border-gray-100', 'text-gray-300');
          dot.classList.remove('border-[#FF4D29]', 'text-[#FF4D29]', 'bg-orange-50', 'scale-110', 'shadow-glow');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { title: t('step-1-title'), desc: t('step-1-desc'), num: '1', side: 'left' },
    { title: t('step-2-title'), desc: t('step-2-desc'), num: '2', side: 'right' },
    { title: t('step-3-title'), desc: t('step-3-desc'), num: '3', side: 'left' },
  ];

  return (
    <section id="how-we-work" className="py-32 bg-white relative z-10 rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 reveal">
          <span className="text-[#FF4D29] font-bold tracking-wider uppercase text-sm mb-4 block">{t('steps-label')}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F0F0F]">{t('steps-title')}</h2>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Background line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2"></div>
          {/* Progress line */}
          <div ref={progressRef} className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-[#FF4D29] -translate-x-1/2 transition-all duration-75 ease-linear" style={{ height: '0%' }}></div>

          <div className="space-y-16 md:space-y-24 pt-4">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                {step.side === 'left' ? (
                  <>
                    <div className="pl-16 md:pl-0 md:w-1/2 md:pr-16 md:text-right order-1 reveal delay-100">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-[#0F0F0F]">{step.title}</h3>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">{step.desc}</p>
                    </div>
                    <div
                      ref={(el) => { if (el) dotsRef.current[i] = el; }}
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-gray-100 rounded-full z-10 flex items-center justify-center font-bold text-sm md:text-base text-gray-300 transition-all duration-500 shadow-sm top-0 md:top-auto"
                    >
                      {step.num}
                    </div>
                    <div className="hidden md:block md:w-1/2 md:pl-16 order-3"></div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block md:w-1/2 md:pr-16 order-1"></div>
                    <div
                      ref={(el) => { if (el) dotsRef.current[i] = el; }}
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-gray-100 rounded-full z-10 flex items-center justify-center font-bold text-sm md:text-base text-gray-300 transition-all duration-500 shadow-sm top-0 md:top-auto"
                    >
                      {step.num}
                    </div>
                    <div className="pl-16 md:pl-16 md:w-1/2 md:text-left order-1 reveal delay-100">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-[#0F0F0F]">{step.title}</h3>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
