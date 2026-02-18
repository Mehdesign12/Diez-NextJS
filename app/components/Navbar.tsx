'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../context/LangContext';

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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

  return (
    <div className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-4' : 'top-6'}`}>
      <nav
        className={`relative z-50 mx-4 md:mx-auto px-4 sm:px-4 transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full ${
          scrolled ? 'max-w-4xl shadow-xl' : 'max-w-5xl'
        }`}
      >
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer pl-2 md:pl-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden hover:scale-105 transition-transform">
              <Image src="/images/logo_clean.png" alt="Diez Agency Logo" width={48} height={48} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="#" className="text-sm font-bold text-[#FF4D29] transition-colors">{t('nav-home')}</Link>
            <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors">{t('nav-services')}</Link>
            <Link href="#how-we-work" className="text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors">{t('nav-process')}</Link>
            <Link href="#work" className="text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors">{t('nav-portfolio')}</Link>
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors">Blog</Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors">{t('nav-testimonials')}</Link>
          </div>

          {/* CTA & Language */}
          <div className="flex items-center gap-4 pr-2 md:pr-4">
            {/* Language Switcher Desktop */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-white border border-gray-200 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group active:scale-95 mr-2"
            >
              <img
                src={lang === 'fr' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png'}
                alt="Lang"
                className="w-5 h-5 rounded-full object-cover shadow-sm border border-gray-100"
              />
              <span className="text-xs font-extrabold text-gray-600 group-hover:text-[#FF4D29] transition-colors">{lang.toUpperCase()}</span>
              <i className="fas fa-chevron-down text-[8px] text-gray-400 group-hover:text-[#0F0F0F] transition-colors"></i>
            </button>

            <Link
              href="#contact"
              className="hidden md:block px-6 py-2.5 bg-[#FF4D29] text-white text-sm font-bold rounded-full shadow-lg shadow-[#FF4D29]/20 hover:bg-orange-600 hover:shadow-[#FF4D29]/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {t('nav-contact')}
            </Link>

            {/* Mobile Header Actions */}
            <div className="flex md:hidden items-center gap-2 mr-1">
              <button
                onClick={toggleLanguage}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 active:scale-95 transition-all"
              >
                <img
                  src={lang === 'fr' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png'}
                  alt={lang.toUpperCase()}
                  className="w-5 h-5 rounded-full object-cover"
                />
              </button>
              <Link
                href="#contact"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FF4D29] text-white shadow-md active:scale-95 transition-all"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobile}
              className="md:hidden p-2 z-50 relative text-gray-600 hover:text-[#FF4D29] focus:outline-none transition-colors"
            >
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-[#FFF8F3]/95 backdrop-blur-xl z-40 flex flex-col justify-center px-8 transition-transform duration-500 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-6 text-center">
          {[
            { href: '#', label: t('nav-home'), delay: '0ms' },
            { href: '#services', label: t('nav-services'), delay: '100ms' },
            { href: '#how-we-work', label: t('nav-process'), delay: '200ms' },
            { href: '#work', label: t('nav-portfolio'), delay: '300ms' },
            { href: '/blog', label: 'Blog', delay: '350ms' },
            { href: '#testimonials', label: t('nav-testimonials'), delay: '400ms' },
          ].map(({ href, label, delay }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobile}
              className="text-4xl font-bold text-[#0F0F0F] hover:text-[#FF4D29] transition-colors"
              style={{
                transitionDelay: delay,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)',
                opacity: mobileOpen ? 1 : 0,
                transition: `all 0.5s ease ${delay}`,
              }}
            >
              {label}
            </Link>
          ))}

          <div className="pt-8" style={{
            transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)',
            opacity: mobileOpen ? 1 : 0,
            transition: 'all 0.5s ease 500ms',
          }}>
            <Link
              href="#contact"
              onClick={closeMobile}
              className="inline-block w-full px-8 py-4 bg-[#FF4D29] text-white text-lg font-bold rounded-full shadow-lg shadow-[#FF4D29]/30 active:scale-95 transition-transform"
            >
              {t('nav-contact')}
            </Link>
          </div>

          {/* Mobile Lang Switcher */}
          <div className="pt-4 flex justify-center gap-4" style={{
            transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)',
            opacity: mobileOpen ? 1 : 0,
            transition: 'all 0.5s ease 600ms',
          }}>
            <button
              onClick={() => { toggleLanguage(); closeMobile(); }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm active:scale-95 transition-transform"
            >
              <img src="https://flagcdn.com/w40/fr.png" className="w-5 h-5 rounded-full object-cover" alt="FR" />
              <span className="font-bold text-gray-600">FR</span>
            </button>
            <button
              onClick={() => { toggleLanguage(); closeMobile(); }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm active:scale-95 transition-transform"
            >
              <img src="https://flagcdn.com/w40/gb.png" className="w-5 h-5 rounded-full object-cover" alt="EN" />
              <span className="font-bold text-gray-600">EN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
