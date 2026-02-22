'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../context/LangContext';
import { ShinyButton } from './ui/ShinyButton';

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      // Progression : 0% en haut, 100% en bas
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : 'auto';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = 'auto';
  };

  const switchLang = (newLang: 'fr' | 'en') => {
    setLang(newLang);
    closeMobile();
  };

  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const flagUrl = lang === 'fr' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png';
  const otherFlagUrl = lang === 'fr' ? 'https://flagcdn.com/w40/gb.png' : 'https://flagcdn.com/w40/fr.png';

  const navLinks = [
    { href: `/${lang}#`, label: t('nav-home') },
    { href: `/${lang}#services`, label: t('nav-services') },
    { href: `/${lang}#how-we-work`, label: t('nav-process') },
    { href: `/${lang}#work`, label: t('nav-portfolio') },
    { href: `/${lang}/blog`, label: t('nav-blog') },
    { href: `/${lang}#testimonials`, label: t('nav-testimonials') },
  ];

  return (
    <div className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-3' : 'top-4'}`}>
      <nav className={`relative z-50 mx-4 md:mx-auto px-4 transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md border border-gray-100 rounded-full overflow-hidden ${
        scrolled
          ? 'max-w-4xl shadow-[0_8px_30px_rgba(255,77,41,0.18)]'
          : 'max-w-5xl shadow-[0_4px_20px_rgba(255,77,41,0.10)]'
      }`}>
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'}`}>

          {/* Barre de progression — absolue en bas du nav */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF4D29] transition-all duration-100 ease-out rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Logo */}
          <Link href={`/${lang}`} className="flex-shrink-0 flex items-center gap-3 pl-2 md:pl-4">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden hover:scale-105 transition-transform">
              <Image
                src="https://qegewzvyjiijozioqsgq.supabase.co/storage/v1/object/public/logo/logo%20diez.png"
                alt="Diez Agency"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors first:font-bold first:text-[#FF4D29]">
                {label}
              </Link>
            ))}
          </div>

          {/* CTA & Language Switcher */}
          <div className="flex items-center gap-3 pr-2 md:pr-4">
            {/* Language Switcher Desktop */}
            <button
              onClick={() => switchLang(otherLang)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-white border border-gray-200 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group active:scale-95"
              title={`Switch to ${otherLang.toUpperCase()}`}
            >
              <img src={flagUrl} alt={lang.toUpperCase()} className="w-5 h-5 rounded-full object-cover shadow-sm border border-gray-100" />
              <span className="text-xs font-extrabold text-gray-600 group-hover:text-[#FF4D29] transition-colors">{lang.toUpperCase()}</span>
              <i className="fas fa-chevron-down text-[8px] text-gray-400"></i>
            </button>

            <Link href={`/${lang}/contact`} className="hidden md:block">
              <ShinyButton>
                {t('nav-contact')}
              </ShinyButton>
            </Link>

            {/* Mobile Header Actions */}
            <div className="flex md:hidden items-center gap-2 mr-1">
              <button onClick={() => switchLang(otherLang)} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 active:scale-95 transition-all">
                <img src={flagUrl} alt={lang.toUpperCase()} className="w-5 h-5 rounded-full object-cover" />
              </button>
              <Link href={`/${lang}/contact`} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FF4D29] text-white shadow-md active:scale-95 transition-all">
                <i className="fas fa-paper-plane text-xs"></i>
              </Link>
            </div>

            {/* Burger */}
            <button onClick={toggleMobile} className="md:hidden p-2 z-50 relative text-gray-600 hover:text-[#FF4D29] focus:outline-none transition-colors">
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 bg-[#FFF8F3]/95 backdrop-blur-xl z-40 flex flex-col justify-center px-8 transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col space-y-6 text-center">
          {navLinks.map(({ href, label }, i) => (
            <Link key={href} href={href} onClick={closeMobile}
              className="text-4xl font-bold text-[#0F0F0F] hover:text-[#FF4D29] transition-colors"
              style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: `all 0.5s ease ${i * 100}ms` }}
            >
              {label}
            </Link>
          ))}

          <div className="pt-8" style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: 'all 0.5s ease 600ms' }}>
            <Link href={`/${lang}/contact`} onClick={closeMobile} className="inline-block w-full px-8 py-4 bg-[#FF4D29] text-white text-lg font-bold rounded-full shadow-lg shadow-[#FF4D29]/30 active:scale-95 transition-transform">
              {t('nav-contact')}
            </Link>
          </div>

          {/* Mobile Lang Switcher */}
          <div className="pt-4 flex justify-center gap-4" style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: 'all 0.5s ease 700ms' }}>
            <button onClick={() => switchLang('fr')} className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all border ${lang === 'fr' ? 'bg-[#FF4D29] border-[#FF4D29] text-white' : 'bg-white border-gray-200 text-gray-600'}`}>
              <img src="https://flagcdn.com/w40/fr.png" className="w-5 h-5 rounded-full object-cover" alt="FR" />
              <span className="font-bold">FR</span>
            </button>
            <button onClick={() => switchLang('en')} className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all border ${lang === 'en' ? 'bg-[#FF4D29] border-[#FF4D29] text-white' : 'bg-white border-gray-200 text-gray-600'}`}>
              <img src="https://flagcdn.com/w40/gb.png" className="w-5 h-5 rounded-full object-cover" alt="EN" />
              <span className="font-bold">EN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
