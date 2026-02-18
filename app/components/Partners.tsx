'use client';
import { useLang } from '../context/LangContext';

export default function Partners() {
  const { t } = useLang();

  const icons = [
    { cls: 'fab fa-aws', hover: 'hover:text-[#FF9900]', size: 'text-4xl md:text-5xl' },
    { cls: 'fab fa-google', hover: 'hover:text-blue-500', size: 'text-3xl md:text-4xl' },
    { cls: 'fab fa-stripe', hover: 'hover:text-[#635BFF]', size: 'text-5xl md:text-6xl' },
    { cls: 'fab fa-spotify', hover: 'hover:text-[#1DB954]', size: 'text-4xl md:text-5xl' },
    { cls: 'fab fa-airbnb', hover: 'hover:text-[#FF5A5F]', size: 'text-4xl md:text-5xl' },
    { cls: 'fab fa-microsoft', hover: 'hover:text-[#00A4EF]', size: 'text-4xl md:text-5xl' },
    { cls: 'fab fa-uber', hover: 'hover:text-black', size: 'text-4xl md:text-5xl' },
  ];

  return (
    <section className="py-12 border-y border-gray-200/60 bg-white/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-center text-xs font-bold text-[#FF4D29] uppercase tracking-[0.2em]">{t('partners-title')}</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#FFF8F3] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#FFF8F3] to-transparent z-10"></div>

        {/* Marquee */}
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 px-12">
          {[...icons, ...icons].map((icon, i) => (
            <i key={i} className={`${icon.cls} ${icon.size} text-gray-300 ${icon.hover} transition-colors cursor-pointer`}></i>
          ))}
        </div>
      </div>
    </section>
  );
}
