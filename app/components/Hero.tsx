'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useLang } from '../context/LangContext';
import { TextAnimate } from './ui/TextAnimate';
import { ShimmerButton } from './ui/ShimmerButton';
import { BlurFade } from './ui/BlurFade';
import { LightRays } from './ui/LightRays';

export default function Hero() {
  const { t, lang } = useLang();

  const line1Words = lang === 'fr'
    ? ['Votre', 'Transformation', 'Digitale,']
    : ['Your', 'Digital', 'Transformation,'];

  const accentWord = lang === 'fr' ? 'Sereine' : 'Serene';
  const endWords   = lang === 'fr' ? ['&', 'Maîtrisée'] : ['&', 'Controlled'];

  return (
    <header className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">

      {/* ── LightRays background ── */}
      <LightRays
        rayColor="#FF4D29"
        rayCount={10}
        rayOpacityMax={0.05}
        className="z-0"
      />

      {/* Blobs décoratifs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#FF4D29]/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
        <div className="absolute top-20 right-10 w-48 h-48 md:w-72 md:h-72 bg-purple-300/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">

        {/* ── Badge — 0s ── */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-soft mb-8"
          initial={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#FF4D29] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('hero-badge')}</span>
        </motion.div>

        {/* ── Titre principal — 0.1s → 0.9s ── */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-5 md:mb-7 max-w-5xl mx-auto">

          {/* Ligne 1 — slideUp mot par mot */}
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 mb-1 md:mb-2">
            {line1Words.map((word, i) => (
              <TextAnimate
                key={word}
                animation="slideUp"
                by="word"
                delay={i * 0.08}
              >
                {word}
              </TextAnimate>
            ))}
          </div>

          {/* Ligne 2 — accent wavy + fin slideUp */}
          <div className="flex flex-wrap justify-center items-baseline gap-x-3 md:gap-x-5">

            {/* Mot orange — wavy spring par caractère */}
            <span className="relative inline-block pb-1 md:pb-2">
              <span className="text-gradient-orange">
                <TextAnimate animation="wavyChar" by="character" delay={0.28}>
                  {accentWord}
                </TextAnimate>
              </span>
              {/* Soulignement SVG animé */}
              <motion.svg
                className="absolute w-full h-3 md:h-4 -bottom-1 left-0 text-[#FF4D29]"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <motion.path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                />
              </motion.svg>
            </span>

            {/* "& Controlled" — slideUp décalé */}
            {endWords.map((word, i) => (
              <TextAnimate
                key={word}
                animation="slideUp"
                by="word"
                delay={0.55 + i * 0.1}
              >
                {word}
              </TextAnimate>
            ))}
          </div>
        </h1>

        {/* ── Sous-titre — BlurFade à 1.0s ── */}
        <BlurFade delay={1.0} duration={0.55} yOffset={12} blur="10px">
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            {t('hero-subtitle')}
            <br className="hidden md:block" />
            <strong>{t('hero-subtitle-strong')}</strong>
          </p>
        </BlurFade>

        {/* ── Boutons — BlurFade à 1.35s ── */}
        <BlurFade delay={1.35} duration={0.5} yOffset={14} blur="8px">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4 mb-8 md:mb-10">

            {/* Bouton principal — ShimmerButton orange */}
            <Link href={`/${lang}/contact`} className="w-full sm:w-auto">
              <ShimmerButton
                background="#FF4D29"
                borderRadius="9999px"
                className="w-full sm:w-auto font-bold"
              >
                {t('hero-cta1')} <i className="fas fa-arrow-right text-xs" />
              </ShimmerButton>
            </Link>

            {/* Bouton secondaire */}
            <Link
              href="#work"
              className="w-full sm:w-auto px-5 py-3 md:px-7 md:py-3.5 bg-white text-[#0F0F0F] border border-gray-200 rounded-full font-bold text-sm md:text-base shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 active:scale-95 text-center"
            >
              {t('hero-cta2')}
            </Link>

          </div>
        </BlurFade>

        {/* ── Trust bar — BlurFade à 1.6s ── */}
        <BlurFade delay={1.6} duration={0.55} yOffset={10} blur="8px">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-2">

            {/* Avatar circles + compteur */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[32, 11, 5, 44, 68].map((img, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm"
                    style={{ zIndex: 5 - i }}
                  >
                    <img
                      src={`https://i.pravatar.cc/80?img=${img}`}
                      alt="client"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#0F0F0F]">
                  {lang === 'fr' ? '50+ clients satisfaits' : '50+ happy clients'}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-[#FF4D29] text-[10px]"></i>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">5.0</span>
                </div>
              </div>
            </div>

            {/* Séparateur */}
            <div className="hidden sm:block w-px h-10 bg-gray-200" />

            {/* Trustpilot */}
            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Logo Trustpilot SVG inline */}
              <svg viewBox="0 0 126 32" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0L19.6 11.6H32L22 18.8L25.6 30.4L16 23.2L6.4 30.4L10 18.8L0 11.6H12.4L16 0Z" fill="#00B67A"/>
                <text x="38" y="22" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#191919">Trustpilot</text>
              </svg>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#00B67A">
                    <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 20l-6.4 5 2.8-8.7L2 10.9h8.1z"/>
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">4.9/5</span>
            </a>

          </div>
        </BlurFade>

      </div>
    </header>
  );
}
