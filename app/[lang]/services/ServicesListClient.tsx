'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useLang } from '@/app/context/LangContext';
import { TextAnimate } from '@/app/components/ui/TextAnimate';
import { BlurFade } from '@/app/components/ui/BlurFade';
import { MagicCard } from '@/app/components/ui/MagicCard';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { SERVICES_DATA } from './servicesData';

export function ServicesListClient() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="bg-[#FFF8F3]">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-30 pointer-events-none bg-[#FF4D29]"/>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <BlurFade delay={0.05} yOffset={8} blur="6px">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF4D29] mb-5">
                <span className="w-6 h-px bg-[#FF4D29]"/>
                {lang === 'fr' ? 'Ce que nous faisons' : 'What we do'}
                <span className="w-6 h-px bg-[#FF4D29]"/>
              </span>
            </BlurFade>

            <TextAnimate animation="slideUp" by="word" className="text-5xl md:text-7xl font-extrabold text-[#0F0F0F] leading-[1.05] mb-5 max-w-4xl mx-auto">
              {lang === 'fr' ? 'Nos Services Sur‑Mesure' : 'Our Tailored Services'}
            </TextAnimate>

            <BlurFade delay={0.35} yOffset={8} blur="6px">
              <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                {lang === 'fr'
                  ? 'Quatre services conçus pour générer un impact mesurable sur votre croissance — développement, structure juridique, visibilité IA et automatisation.'
                  : 'Four services designed to generate measurable impact on your growth — development, legal structure, AI visibility and automation.'}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-[#FF4D29] shadow-lg shadow-[#FF4D29]/30 hover:opacity-90 active:scale-95 transition-all"
              >
                {lang === 'fr' ? 'Démarrer un projet' : 'Start a project'} <i className="fas fa-arrow-right text-xs"/>
              </Link>
            </BlurFade>
          </div>
        </section>

        {/* ══════════════════════════════════════
            GRILLE SERVICES
        ══════════════════════════════════════ */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES_DATA.map((srv, i) => {
                const copy = lang === 'fr' ? srv.fr : srv.en;
                return (
                  <BlurFade key={srv.id} delay={0.1 + i * 0.1} yOffset={16} blur="10px" inView>
                    <MagicCard
                      gradientColor={`${srv.color}0D`}
                      gradientSize={300}
                      className="border border-gray-100 bg-white shadow-sm h-full group"
                    >
                      <Link href={`/${lang}/services/${srv.id}`} className="flex flex-col h-full p-8">

                        {/* Header card */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: srv.bgLight }}>
                              <i className={`fas ${srv.icon} text-xl`} style={{ color: srv.color }}/>
                            </div>
                            <span className="text-xs font-bold text-gray-200">{srv.num}</span>
                          </div>
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-gray-300 group-hover:bg-gray-50 transition-all"
                          >
                            <i className="fas fa-arrow-right text-[11px] text-gray-400"/>
                          </motion.div>
                        </div>

                        {/* Titre + tagline */}
                        <h2 className="text-2xl font-extrabold text-[#0F0F0F] mb-2 group-hover:text-[#FF4D29] transition-colors duration-200 leading-snug">
                          {copy.title}
                        </h2>
                        <p className="text-base font-semibold mb-3" style={{ color: srv.color }}>
                          {copy.tagline}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                          {copy.desc}
                        </p>

                        {/* Résultats pills */}
                        <div className="flex flex-wrap gap-2 pt-5 border-t border-gray-100">
                          {copy.results.slice(0, 3).map((r, ri) => (
                            <span key={ri} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: srv.bgLight, color: srv.color }}>
                              <i className="fas fa-bolt text-[9px]"/>
                              {r.metric} {r.label}
                            </span>
                          ))}
                        </div>

                      </Link>
                    </MagicCard>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            POURQUOI DIEZ
        ══════════════════════════════════════ */}
        <section className="py-20 bg-[#0F0F0F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.05} yOffset={10} blur="8px" inView>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF4D29] mb-4">
                  <span className="w-5 h-px bg-[#FF4D29]"/>
                  {lang === 'fr' ? 'Pourquoi Diez' : 'Why Diez'}
                  <span className="w-5 h-px bg-[#FF4D29]"/>
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  {lang === 'fr' ? 'Ce qui nous différencie' : 'What sets us apart'}
                </h2>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: 'fa-lock', label: lang === 'fr' ? 'Devis fixe, 0 surprise' : 'Fixed quote, 0 surprise', desc: lang === 'fr' ? 'Le prix signé est le prix payé. Jamais de surcoût.' : 'The signed price is the price paid. Never any extra.' },
                { icon: 'fa-calendar-check', label: lang === 'fr' ? 'Délais garantis par contrat' : 'Deadlines guaranteed by contract', desc: lang === 'fr' ? 'Livraison à la date prévue ou pénalités.' : 'Delivery on the scheduled date or penalties.' },
                { icon: 'fa-comments', label: lang === 'fr' ? 'Zéro jargon technique' : 'Zero technical jargon', desc: lang === 'fr' ? 'Vous comprenez chaque décision. Toujours.' : 'You understand every decision. Always.' },
                { icon: 'fa-chart-line', label: lang === 'fr' ? 'Orienté ROI' : 'ROI-oriented', desc: lang === 'fr' ? 'Chaque décision est mesurée à son impact business.' : 'Every decision is measured by its business impact.' },
              ].map((item, i) => (
                <BlurFade key={i} delay={0.1 + i * 0.08} yOffset={12} blur="8px" inView>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/8 transition-colors text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#FF4D29]/15">
                      <i className={`fas ${item.icon} text-[#FF4D29]`}/>
                    </div>
                    <h3 className="font-bold text-white text-sm mb-2">{item.label}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full blur-[100px] opacity-15 pointer-events-none bg-[#FF4D29]"/>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <BlurFade delay={0.05} yOffset={12} blur="10px" inView>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F0F0F] mb-4 leading-tight">
                {lang === 'fr' ? 'Quel service vous convient ?' : 'Which service suits you?'}
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                {lang === 'fr'
                  ? 'Pas sûr ? Obtenez un audit gratuit en 48h. On vous oriente vers la solution qui génère le plus de ROI pour votre situation.'
                  : 'Not sure? Get a free audit in 48h. We\'ll guide you toward the solution that generates the most ROI for your situation.'}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold text-white bg-[#FF4D29] hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-[#FF4D29]/30"
              >
                {lang === 'fr' ? 'Obtenir mon audit gratuit' : 'Get my free audit'} <i className="fas fa-arrow-right text-sm"/>
              </Link>
              <p className="text-xs text-gray-400 mt-4">
                {lang === 'fr' ? 'Audit gratuit · Réponse en 48h · Sans engagement' : 'Free audit · Response in 48h · No commitment'}
              </p>
            </BlurFade>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
