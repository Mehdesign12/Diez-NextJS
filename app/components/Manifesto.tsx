'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function Manifesto() {
  const { t } = useLang();
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const text = t('manifesto-text');
    const isDarkBg = false;
    const inactiveColor = isDarkBg ? 'text-gray-600' : 'text-gray-300';
    const activeColor = isDarkBg ? 'text-white' : 'text-[#0F0F0F]';

    containerRef.current.innerHTML = text
      .split(' ')
      .map(
        (word) =>
          `<span class="highlight-word ${inactiveColor} transition-colors duration-300" data-active="${activeColor}" data-inactive="${inactiveColor}">${word} </span>`
      )
      .join('');

    const orangeKeywords = [
      'technologie', 'technology', 'métier', 'business', 'croissance', 'growth',
      'potentiel', 'potential', 'performance', 'sérénité', 'serenity',
      'outils', 'tools', 'logiciel', 'software', 'libère', 'unleashes',
    ];

    const handleScroll = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;
      const centerLine = windowHeight / 2;
      const words = containerRef.current.querySelectorAll('.highlight-word');
      words.forEach((wordEl) => {
        const el = wordEl as HTMLElement;
        const rect = el.getBoundingClientRect();
        const activeClr = el.dataset.active || activeColor;
        const inactiveClr = el.dataset.inactive || inactiveColor;
        const distanceFromCenter = Math.abs(rect.top - centerLine + 50);
        const cleanWord = el.innerText.trim().toLowerCase().replace(/[.,]/g, '');

        if (distanceFromCenter < 150) {
          if (orangeKeywords.includes(cleanWord)) {
            el.classList.remove(inactiveClr, activeClr);
            el.classList.add('text-[#FF4D29]');
          } else {
            el.classList.remove(inactiveClr, 'text-[#FF4D29]');
            el.classList.add(activeClr);
          }
        } else {
          el.classList.remove(activeClr, 'text-[#FF4D29]');
          el.classList.add(inactiveClr);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t]);

  return (
    <section className="py-32 bg-white relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <p className="text-sm font-bold text-[#FF4D29] uppercase tracking-widest mb-8 text-center">{t('manifesto-label')}</p>
        <p
          ref={containerRef}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center"
        >
          {t('manifesto-text')}
        </p>
      </div>
    </section>
  );
}
