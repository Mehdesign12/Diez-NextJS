'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '../context/LangContext';
import { TextAnimate } from './ui/TextAnimate';
import { BlurFade } from './ui/BlurFade';

/* ── Données statiques des 4 services ── */
const SERVICES = [
  {
    id: 'saas-web-app',
    icon: 'fa-code',
    color: '#FF4D29',
    bgLight: '#FFF4F1',
    num: '01',
    titleKey: 'srv1-title',
    taglineKey: 'srv1-tagline',
    shortKey: 'srv1-short',
    features: ['srv1-f1', 'srv1-f2', 'srv1-f3', 'srv1-f4', 'srv1-f5', 'srv1-f6'],
    results: ['srv1-r1', 'srv1-r2', 'srv1-r3'],
  },
  {
    id: 'llc-creation',
    icon: 'fa-building',
    color: '#0F0F0F',
    bgLight: '#F4F4F5',
    num: '02',
    titleKey: 'srv2-title',
    taglineKey: 'srv2-tagline',
    shortKey: 'srv2-short',
    features: ['srv2-f1', 'srv2-f2', 'srv2-f3', 'srv2-f4', 'srv2-f5', 'srv2-f6'],
    results: ['srv2-r1', 'srv2-r2', 'srv2-r3'],
  },
  {
    id: 'llm-seo',
    icon: 'fa-brain',
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    num: '03',
    titleKey: 'srv3-title',
    taglineKey: 'srv3-tagline',
    shortKey: 'srv3-short',
    features: ['srv3-f1', 'srv3-f2', 'srv3-f3', 'srv3-f4', 'srv3-f5', 'srv3-f6'],
    results: ['srv3-r1', 'srv3-r2', 'srv3-r3'],
  },
  {
    id: 'agent-automation',
    icon: 'fa-robot',
    color: '#059669',
    bgLight: '#ECFDF5',
    num: '04',
    titleKey: 'srv4-title',
    taglineKey: 'srv4-tagline',
    shortKey: 'srv4-short',
    features: ['srv4-f1', 'srv4-f2', 'srv4-f3', 'srv4-f4', 'srv4-f5', 'srv4-f6'],
    results: ['srv4-r1', 'srv4-r2', 'srv4-r3'],
  },
];

export default function ServicesSection() {
  const { t, lang } = useLang();
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <section id="services" className="py-20 bg-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <BlurFade delay={0.05} yOffset={8} blur="8px" inView>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF4D29] mb-3">
                <span className="w-6 h-px bg-[#FF4D29]" />
                {t('services-label')}
              </span>
            </BlurFade>
            <TextAnimate animation="slideUp" by="word" className="text-3xl md:text-4xl font-extrabold text-[#0F0F0F] leading-tight">
              {`${t('services-title')} ${t('services-title-accent')}`}
            </TextAnimate>
          </div>
          <BlurFade delay={0.2} yOffset={6} blur="6px" inView>
            <p className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed">
              {t('services-subtitle')}
            </p>
          </BlurFade>
        </div>

        {/* ── Accordion ── */}
        <div className="flex flex-col gap-3">
          {SERVICES.map((srv, i) => {
            const isOpen = openId === srv.id;
            return (
              <BlurFade key={srv.id} delay={0.1 + i * 0.07} yOffset={14} blur="8px" inView>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-gray-200 bg-white shadow-md'
                      : 'border-gray-100 bg-white/60 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {/* ── Row titre (cliquable) ── */}
                  <button
                    className="w-full flex items-center gap-4 px-6 py-5 text-left group"
                    onClick={() => toggle(srv.id)}
                  >
                    {/* Numéro */}
                    <span className="text-xs font-bold text-gray-300 w-6 shrink-0">{srv.num}</span>

                    {/* Icône */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{ background: srv.bgLight }}
                    >
                      <i className={`fas ${srv.icon} text-sm`} style={{ color: srv.color }} />
                    </div>

                    {/* Titre + tagline */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-bold text-[#0F0F0F] text-base leading-tight">{t(srv.titleKey)}</span>
                        {!isOpen && (
                          <span className="hidden sm:inline text-xs text-gray-400 font-normal truncate">— {t(srv.taglineKey)}</span>
                        )}
                      </div>
                      {isOpen && (
                        <p className="text-xs text-gray-400 mt-0.5">{t(srv.taglineKey)}</p>
                      )}
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center"
                    >
                      <i className="fas fa-chevron-down text-[10px] text-gray-400" />
                    </motion.div>
                  </button>

                  {/* ── Panel expand ── */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-gray-100">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">

                            {/* Description */}
                            <div className="lg:col-span-1">
                              <p className="text-gray-600 text-sm leading-relaxed">{t(srv.shortKey)}</p>
                              <Link
                                href={`/${lang}/services/${srv.id}`}
                                className="inline-flex items-center gap-2 mt-4 text-sm font-bold transition-all duration-200 hover:gap-3"
                                style={{ color: srv.color }}
                              >
                                {t('services-discover')} <i className="fas fa-arrow-right text-[10px]" />
                              </Link>
                            </div>

                            {/* Features */}
                            <div className="lg:col-span-1">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t('services-included')}</p>
                              <ul className="flex flex-col gap-2">
                                {srv.features.map(fk => (
                                  <li key={fk} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: srv.bgLight }}>
                                      <i className="fas fa-check text-[8px]" style={{ color: srv.color }} />
                                    </span>
                                    {t(fk)}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Résultats + CTA */}
                            <div className="lg:col-span-1">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t('services-results')}</p>
                              <ul className="flex flex-col gap-2 mb-5">
                                {srv.results.map(rk => (
                                  <li key={rk} className="flex items-start gap-2 text-sm font-semibold text-[#0F0F0F]">
                                    <span className="text-[#FF4D29] mt-0.5">→</span>
                                    {t(rk)}
                                  </li>
                                ))}
                              </ul>
                              <Link
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                                style={{ background: srv.color }}
                              >
                                {t('services-cta')} <i className="fas fa-arrow-right text-[10px]" />
                              </Link>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </BlurFade>
            );
          })}
        </div>

        {/* ── Lien voir tous ── */}
        <BlurFade delay={0.5} yOffset={8} blur="6px" inView>
          <div className="mt-8 text-center">
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 font-semibold text-[#FF4D29] hover:gap-4 transition-all duration-200"
            >
              {t('services-link')} <i className="fas fa-arrow-right text-xs" />
            </Link>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
