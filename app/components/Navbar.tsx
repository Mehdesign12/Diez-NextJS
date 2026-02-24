'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../context/LangContext';
import { ShinyButton } from './ui/ShinyButton';
import { AnimatePresence, motion } from 'motion/react';

/* ── Données dropdown services ── */
const SERVICES_ITEMS = [
  {
    id: 'saas-web-app',
    icon: 'fa-code',
    color: '#FF4D29',
    bgLight: '#FFF4F1',
    titleKey: 'srv1-title',
    shortKey: 'srv1-short',
  },
  {
    id: 'llc-creation',
    icon: 'fa-building',
    color: '#0F0F0F',
    bgLight: '#F4F4F5',
    titleKey: 'srv2-title',
    shortKey: 'srv2-short',
  },
  {
    id: 'llm-seo',
    icon: 'fa-brain',
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    titleKey: 'srv3-title',
    shortKey: 'srv3-short',
  },
  {
    id: 'agent-automation',
    icon: 'fa-robot',
    color: '#059669',
    bgLight: '#ECFDF5',
    titleKey: 'srv4-title',
    shortKey: 'srv4-short',
  },
];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [mobileServOpen, setMobileServOpen] = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dropOpen, setDropOpen]         = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  /* ── Scroll listener ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((scrollY / docH) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Fermer dropdown au clic extérieur ── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    if (!next) setMobileServOpen(false);
    document.body.style.overflow = next ? 'hidden' : 'auto';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServOpen(false);
    document.body.style.overflow = 'auto';
  };

  const switchLang = (newLang: 'fr' | 'en') => {
    setLang(newLang);
    closeMobile();
  };

  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const flagUrl   = lang === 'fr' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png';

  /* Liens hors Services */
  const navLinks = [
    { href: `/${lang}`,             label: t('nav-home') },
    { href: `/${lang}#how-we-work`, label: t('nav-process') },
    { href: `/${lang}#work`,        label: t('nav-portfolio') },
    { href: `/${lang}/blog`,        label: t('nav-blog') },
    { href: `/${lang}#testimonials`,label: t('nav-testimonials') },
  ];

  return (
    <div className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-3' : 'top-4'}`}>

      {/* ════════════════════════════════════════
          NAV DESKTOP
      ════════════════════════════════════════ */}
      <nav className={`relative z-50 mx-4 md:mx-auto px-4 transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md border border-gray-100 rounded-full overflow-visible ${
        scrolled
          ? 'max-w-4xl shadow-[0_8px_30px_rgba(255,77,41,0.18)]'
          : 'max-w-5xl shadow-[0_4px_20px_rgba(255,77,41,0.10)]'
      }`}>
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'}`}>

          {/* Barre de progression */}
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
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">

            {/* Accueil */}
            <Link href={`/${lang}`} className="text-sm font-bold text-[#FF4D29] transition-colors">
              {t('nav-home')}
            </Link>

            {/* Services dropdown */}
            <div ref={dropRef} className="relative">
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors"
                onMouseEnter={() => setDropOpen(true)}
                onClick={() => setDropOpen(v => !v)}
              >
                {t('nav-services')}
                <motion.i
                  className="fas fa-chevron-down text-[9px]"
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                />
              </button>

              {/* Panel dropdown */}
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50"
                    onMouseLeave={() => setDropOpen(false)}
                  >
                    {/* Flèche */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45 rounded-sm" />

                    <div className="grid grid-cols-2 gap-1.5">
                      {SERVICES_ITEMS.map(srv => (
                        <Link
                          key={srv.id}
                          href={`/${lang}/services/${srv.id}`}
                          onClick={() => setDropOpen(false)}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: srv.bgLight }}
                          >
                            <i className={`fas ${srv.icon} text-sm`} style={{ color: srv.color }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#0F0F0F] group-hover:text-[#FF4D29] transition-colors leading-tight">
                              {t(srv.titleKey)}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
                              {t(srv.shortKey)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer dropdown — voir tous */}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <Link
                        href={`/${lang}/services`}
                        onClick={() => setDropOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#FFF4F1] group transition-colors"
                      >
                        <span className="text-sm font-semibold text-[#FF4D29]">{t('services-link')}</span>
                        <i className="fas fa-arrow-right text-[10px] text-[#FF4D29] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Autres liens */}
            {navLinks.slice(1).map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm font-medium text-gray-600 hover:text-[#FF4D29] transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* CTA & Language Switcher */}
          <div className="flex items-center gap-3 pr-2 md:pr-4">
            <button
              onClick={() => switchLang(otherLang)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-white border border-gray-200 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group active:scale-95"
            >
              <img src={flagUrl} alt={lang.toUpperCase()} className="w-5 h-5 rounded-full object-cover shadow-sm border border-gray-100" />
              <span className="text-xs font-extrabold text-gray-600 group-hover:text-[#FF4D29] transition-colors">{lang.toUpperCase()}</span>
              <i className="fas fa-chevron-down text-[8px] text-gray-400" />
            </button>

            <Link href={`/${lang}/contact`} className="hidden md:block">
              <ShinyButton>{t('nav-contact')}</ShinyButton>
            </Link>

            {/* Mobile actions */}
            <div className="flex md:hidden items-center gap-2 mr-1">
              <button onClick={() => switchLang(otherLang)} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 active:scale-95 transition-all">
                <img src={flagUrl} alt={lang.toUpperCase()} className="w-5 h-5 rounded-full object-cover" />
              </button>
              <Link href={`/${lang}/contact`} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FF4D29] text-white shadow-md active:scale-95 transition-all">
                <i className="fas fa-paper-plane text-xs" />
              </Link>
            </div>

            {/* Burger */}
            <button onClick={toggleMobile} className="md:hidden p-2 z-50 relative text-gray-600 hover:text-[#FF4D29] focus:outline-none transition-colors">
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          MOBILE OVERLAY
      ════════════════════════════════════════ */}
      <div className={`fixed inset-0 bg-[#FFF8F3]/97 backdrop-blur-xl z-40 flex flex-col justify-center px-8 transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col space-y-5 text-center">

          {/* Accueil */}
          <Link href={`/${lang}`} onClick={closeMobile}
            className="text-4xl font-bold text-[#0F0F0F] hover:text-[#FF4D29] transition-colors"
            style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: 'all 0.5s ease 0ms' }}
          >
            {t('nav-home')}
          </Link>

          {/* Services avec sous-menu accordéon */}
          <div style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: 'all 0.5s ease 100ms' }}>
            <button
              className="w-full flex items-center justify-center gap-2 text-4xl font-bold text-[#0F0F0F] hover:text-[#FF4D29] transition-colors"
              onClick={() => setMobileServOpen(v => !v)}
            >
              {t('nav-services')}
              <motion.i
                className="fas fa-chevron-down text-xl"
                animate={{ rotate: mobileServOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>

            <AnimatePresence initial={false}>
              {mobileServOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden mt-3"
                >
                  <div className="flex flex-col gap-2">
                    {SERVICES_ITEMS.map(srv => (
                      <Link
                        key={srv.id}
                        href={`/${lang}/services/${srv.id}`}
                        onClick={closeMobile}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: srv.bgLight }}>
                          <i className={`fas ${srv.icon} text-sm`} style={{ color: srv.color }} />
                        </div>
                        <span className="text-base font-semibold text-[#0F0F0F]">{t(srv.titleKey)}</span>
                        <i className="fas fa-arrow-right text-[10px] text-gray-300 ml-auto" />
                      </Link>
                    ))}
                    <Link
                      href={`/${lang}/services`}
                      onClick={closeMobile}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-[#FF4D29] hover:bg-[#FFF4F1] transition-colors"
                    >
                      {t('services-link')} <i className="fas fa-arrow-right text-[10px]" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Autres liens */}
          {navLinks.slice(1).map(({ href, label }, i) => (
            <Link key={href} href={href} onClick={closeMobile}
              className="text-4xl font-bold text-[#0F0F0F] hover:text-[#FF4D29] transition-colors"
              style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: `all 0.5s ease ${(i + 2) * 100}ms` }}
            >
              {label}
            </Link>
          ))}

          {/* CTA */}
          <div className="pt-6" style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: 'all 0.5s ease 700ms' }}>
            <Link href={`/${lang}/contact`} onClick={closeMobile} className="inline-block w-full px-8 py-4 bg-[#FF4D29] text-white text-lg font-bold rounded-full shadow-lg shadow-[#FF4D29]/30 active:scale-95 transition-transform">
              {t('nav-contact')}
            </Link>
          </div>

          {/* Mobile Lang */}
          <div className="pt-2 flex justify-center gap-4" style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(2rem)', opacity: mobileOpen ? 1 : 0, transition: 'all 0.5s ease 800ms' }}>
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
