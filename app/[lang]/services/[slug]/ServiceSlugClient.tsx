'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'next/navigation';
import { useLang } from '@/app/context/LangContext';
import { TextAnimate } from '@/app/components/ui/TextAnimate';
import { BlurFade } from '@/app/components/ui/BlurFade';
import { MagicCard } from '@/app/components/ui/MagicCard';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { SERVICES_DATA } from '../servicesData';

/* ── Photos Unsplash pour LLC ── */
const LLC_HERO_PHOTO = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop';
const LLC_TESTIMONIAL_PHOTO = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80&auto=format&fit=crop&crop=face';

/* Galerie de clients satisfaits (LLC social proof) */
const LLC_CLIENT_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&q=80&auto=format&fit=crop&crop=face', name: 'Marc D.', country: '🇫🇷' },
  { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&q=80&auto=format&fit=crop&crop=face', name: 'Aisha K.', country: '🇸🇳' },
  { url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&q=80&auto=format&fit=crop&crop=face', name: 'Thomas R.', country: '🇧🇪' },
  { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&q=80&auto=format&fit=crop&crop=face', name: 'Sofia M.', country: '🇲🇦' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&auto=format&fit=crop&crop=face', name: 'Yann P.', country: '🇨🇭' },
];

/* ── Illustrations SVG par service ── */
function ServiceIllustration({ id, color }: { id: string; color: string }) {
  if (id === 'saas-web-app') return (
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
      <rect x="20" y="20" width="360" height="260" rx="16" fill="white" stroke="#f0f0f0" strokeWidth="1.5"/>
      <rect x="20" y="20" width="360" height="44" rx="16" fill={color} opacity="0.08"/>
      <circle cx="48" cy="42" r="8" fill={color} opacity="0.4"/>
      <circle cx="68" cy="42" r="8" fill="#f0f0f0"/>
      <circle cx="88" cy="42" r="8" fill="#f0f0f0"/>
      <rect x="120" y="34" width="160" height="16" rx="8" fill="#f5f5f5"/>
      <rect x="44" y="80" width="140" height="100" rx="12" fill={color} opacity="0.07"/>
      <rect x="56" y="96" width="80" height="8" rx="4" fill={color} opacity="0.3"/>
      <rect x="56" y="112" width="60" height="6" rx="3" fill="#e5e5e5"/>
      <rect x="56" y="124" width="100" height="6" rx="3" fill="#e5e5e5"/>
      <rect x="56" y="136" width="70" height="6" rx="3" fill="#e5e5e5"/>
      <rect x="56" y="154" width="88" height="28" rx="8" fill={color} opacity="0.8"/>
      <rect x="200" y="80" width="160" height="46" rx="12" fill="#f9f9f9" stroke="#f0f0f0" strokeWidth="1"/>
      <rect x="214" y="96" width="60" height="6" rx="3" fill="#e5e5e5"/>
      <rect x="214" y="108" width="40" height="20" rx="6" fill={color} opacity="0.15"/>
      <rect x="200" y="136" width="72" height="44" rx="12" fill="#f9f9f9" stroke="#f0f0f0" strokeWidth="1"/>
      <rect x="288" y="136" width="72" height="44" rx="12" fill="#f9f9f9" stroke="#f0f0f0" strokeWidth="1"/>
      <rect x="44" y="196" width="316" height="60" rx="12" fill="#f5f5f5"/>
      <rect x="60" y="210" width="80" height="8" rx="4" fill="#e0e0e0"/>
      <rect x="60" y="224" width="120" height="6" rx="3" fill="#ebebeb"/>
      <rect x="60" y="234" width="90" height="6" rx="3" fill="#ebebeb"/>
      <circle cx="330" cy="226" r="16" fill={color} opacity="0.12"/>
      <text x="324" y="231" fontSize="12" fill={color} fontWeight="bold">✓</text>
    </svg>
  );

  if (id === 'llc-creation') return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl">
      {/* Photo principale */}
      <img
        src={LLC_HERO_PHOTO}
        alt="Entrepreneur américain, création LLC"
        width={800}
        height={600}
        className="w-full h-full object-cover"
        loading="eager"
      />
      {/* Overlay gradient léger */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"/>
      {/* Badge "Opérationnel en 72h" */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
          <span className="text-lg">🏛️</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#0F0F0F]">LLC opérationnelle</p>
          <p className="text-[10px] text-gray-500">Dépôt en 24h · EIN en 72h</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
          <span className="text-[10px] font-semibold text-green-600">En ligne</span>
        </div>
      </div>
    </div>
  );

  if (id === 'llm-seo') return (
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
      <circle cx="200" cy="150" r="90" fill={color} opacity="0.05"/>
      <circle cx="200" cy="150" r="60" fill={color} opacity="0.05"/>
      {[0,1,2,3,4,5,6,7].map(i => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x = 200 + 90 * Math.cos(angle);
        const y = 150 + 90 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="18" fill="white" stroke="#f0f0f0" strokeWidth="1.5"/>;
      })}
      <circle cx="200" cy="150" r="36" fill="white" stroke={color} strokeWidth="2" opacity="0.4"/>
      <text x="186" y="156" fontSize="18" fill={color}>🧠</text>
      {[
        [110,80],[290,80],[330,160],[280,230],[120,230],[70,160]
      ].map(([x,y], i) => (
        <line key={i} x1="200" y1="150" x2={x} y2={y} stroke={color} strokeWidth="1" opacity="0.15" strokeDasharray="4,4"/>
      ))}
      <rect x="30" y="40" width="80" height="32" rx="8" fill="white" stroke="#f0f0f0" strokeWidth="1"/>
      <text x="44" y="61" fontSize="11" fill="#333" fontWeight="600">ChatGPT</text>
      <rect x="290" y="40" width="80" height="32" rx="8" fill="white" stroke="#f0f0f0" strokeWidth="1"/>
      <text x="296" y="61" fontSize="11" fill="#333" fontWeight="600">Perplexity</text>
      <rect x="310" y="140" width="80" height="32" rx="8" fill="white" stroke="#f0f0f0" strokeWidth="1"/>
      <text x="318" y="160" fontSize="11" fill="#333" fontWeight="600">Gemini</text>
      <rect x="10" y="140" width="80" height="32" rx="8" fill={color} opacity="0.12"/>
      <text x="24" y="160" fontSize="11" fill={color} fontWeight="700">Google AI</text>
      <rect x="160" y="244" width="80" height="32" rx="8" fill="white" stroke={color} strokeWidth="1.5" opacity="0.6"/>
      <text x="174" y="264" fontSize="11" fill={color} fontWeight="700">Votre site</text>
    </svg>
  );

  // agent-automation
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
      <rect x="160" y="30" width="80" height="60" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="1.5"/>
      <circle cx="200" cy="55" r="16" fill={color} opacity="0.15"/>
      <text x="192" y="61" fontSize="14" fill={color}>🤖</text>
      <rect x="172" y="78" width="56" height="8" rx="4" fill="#f0f0f0"/>
      {[
        [40, 120, 'Leads'], [150, 120, 'Emails'], [250, 120, 'Data'], [320, 120, 'Reports']
      ].map(([x, y, label], i) => (
        <g key={i}>
          <rect x={Number(x)} y={Number(y)} width="76" height="44" rx="10" fill="white" stroke="#f0f0f0" strokeWidth="1.5"/>
          <rect x={Number(x)+8} y={Number(y)+10} width="28" height="6" rx="3" fill={color} opacity="0.2"/>
          <rect x={Number(x)+8} y={Number(y)+22} width="50" height="5" rx="2.5" fill="#f5f5f5"/>
          <rect x={Number(x)+8} y={Number(y)+32} width="36" height="5" rx="2.5" fill="#f5f5f5"/>
          <text x={Number(x)+12} y={Number(y)+12} fontSize="8" fill={color} fontWeight="600">{String(label)}</text>
          <line x1={Number(x)+38} y1={Number(y)} x2="200" y2="90" stroke={color} strokeWidth="1.2" strokeDasharray="4,4" opacity="0.3"/>
        </g>
      ))}
      <rect x="140" y="200" width="120" height="70" rx="14" fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.2" strokeWidth="1"/>
      <rect x="155" y="214" width="60" height="6" rx="3" fill={color} opacity="0.3"/>
      <rect x="155" y="226" width="90" height="5" rx="2.5" fill={color} opacity="0.15"/>
      <rect x="155" y="237" width="75" height="5" rx="2.5" fill={color} opacity="0.15"/>
      <rect x="155" y="248" width="50" height="14" rx="7" fill={color} opacity="0.5"/>
      <text x="161" y="259" fontSize="8" fill="white" fontWeight="600">Automatisé ✓</text>
      <line x1="200" y1="165" x2="200" y2="200" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

export function ServiceSlugClient() {
  const { lang } = useLang();
  const params = useParams();
  const slug = params?.slug as string;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const srv = SERVICES_DATA.find(s => s.id === slug);
  if (!srv) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-400">Service introuvable.</p>
      <Link href={`/${lang}/services`} className="text-[#FF4D29] font-semibold">← Retour</Link>
    </div>
  );

  const copy = lang === 'fr' ? srv.fr : srv.en;
  const others = SERVICES_DATA.filter(s => s.id !== slug);

  return (
    <>
      <Navbar />
      <main className="bg-[#FFF8F3]">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          {/* Blob */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: srv.color }}/>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ background: srv.color }}/>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <BlurFade delay={0.05} yOffset={6} blur="6px">
              <nav className="flex items-center gap-2 text-xs text-gray-400 mb-10">
                <Link href={`/${lang}`} className="hover:text-[#0F0F0F] transition-colors">{lang === 'fr' ? 'Accueil' : 'Home'}</Link>
                <i className="fas fa-chevron-right text-[8px]"/>
                <Link href={`/${lang}/services`} className="hover:text-[#0F0F0F] transition-colors">{lang === 'fr' ? 'Services' : 'Services'}</Link>
                <i className="fas fa-chevron-right text-[8px]"/>
                <span className="text-[#0F0F0F] font-medium">{copy.title}</span>
              </nav>
            </BlurFade>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Texte */}
              <div>
                <BlurFade delay={0.1} yOffset={8} blur="6px">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: srv.bgLight }}>
                      <i className={`fas ${srv.icon} text-xl`} style={{ color: srv.color }}/>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{srv.num}</span>
                  </div>
                </BlurFade>

                <TextAnimate animation="slideUp" by="word" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F0F0F] leading-[1.1] mb-4">
                  {copy.title}
                </TextAnimate>

                <BlurFade delay={0.3} yOffset={8} blur="6px">
                  <p className="text-xl font-semibold mb-5" style={{ color: srv.color }}>{copy.tagline}</p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{copy.heroSubtitle}</p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/${lang}/contact`}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                      style={{ background: srv.color, boxShadow: `0 12px 32px ${srv.color}35` }}
                    >
                      {copy.ctaBtn} <i className="fas fa-arrow-right text-xs"/>
                    </Link>
                    <Link
                      href={`/${lang}/services`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-medium text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                    >
                      <i className="fas fa-arrow-left text-xs"/> {lang === 'fr' ? 'Tous les services' : 'All services'}
                    </Link>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">{copy.ctaSubtitle}</p>
                </BlurFade>
              </div>

              {/* Illustration */}
              <BlurFade delay={0.35} yOffset={20} blur="12px">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white p-4 aspect-[4/3]">
                    <ServiceIllustration id={srv.id} color={srv.color}/>
                  </div>
                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: srv.bgLight }}>
                      <i className="fas fa-check text-xs" style={{ color: srv.color }}/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F0F0F]">{copy.results[0].metric}</p>
                      <p className="text-[10px] text-gray-400">{copy.results[0].label}</p>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2"
                  >
                    <span className="text-lg">{srv.id === 'agent-automation' ? '🤖' : srv.id === 'llm-seo' ? '🧠' : srv.id === 'llc-creation' ? '🏛️' : '⚡'}</span>
                    <p className="text-xs font-bold text-[#0F0F0F]">{copy.results[2].metric}</p>
                  </motion.div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PAIN POINTS
        ══════════════════════════════════════ */}
        <section className="py-20 bg-[#0F0F0F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.05} yOffset={10} blur="8px" inView>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: srv.color }}>
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                  {lang === 'fr' ? 'Le problème' : 'The problem'}
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">{copy.painTitle}</h2>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {copy.pains.map((pain, i) => (
                <BlurFade key={i} delay={0.1 + i * 0.08} yOffset={12} blur="8px" inView>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/8 transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${srv.color}20` }}>
                      <i className={`fas ${pain.icon} text-sm`} style={{ color: srv.color }}/>
                    </div>
                    <h3 className="font-bold text-white mb-2 text-sm">{pain.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{pain.desc}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SOLUTION — FEATURES
        ══════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.05} yOffset={10} blur="8px" inView>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: srv.color }}>
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                  {lang === 'fr' ? 'La solution' : 'The solution'}
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F0F] mb-3">{copy.solutionTitle}</h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">{copy.solutionSubtitle}</p>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {copy.features.map((feat, i) => (
                <BlurFade key={i} delay={0.08 + i * 0.07} yOffset={14} blur="8px" inView>
                  <MagicCard gradientColor={`${srv.color}10`} gradientSize={220} className="border border-gray-100 bg-white h-full">
                    <div className="p-6 flex flex-col h-full">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 shrink-0" style={{ background: srv.bgLight }}>
                        <i className={`fas ${feat.icon} text-base`} style={{ color: srv.color }}/>
                      </div>
                      <h3 className="font-bold text-[#0F0F0F] mb-2">{feat.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">{feat.desc}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PROCESSUS
        ══════════════════════════════════════ */}
        <section className="py-20" style={{ background: `linear-gradient(135deg, ${srv.bgLight} 0%, #FFF8F3 100%)` }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.05} yOffset={10} blur="8px" inView>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: srv.color }}>
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                  {lang === 'fr' ? 'Notre processus' : 'Our process'}
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F0F]">{copy.processTitle}</h2>
              </div>
            </BlurFade>

            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block"/>
              <div className="flex flex-col gap-6">
                {copy.steps.map((step, i) => (
                  <BlurFade key={i} delay={0.1 + i * 0.1} yOffset={12} blur="8px" inView>
                    <div className="flex gap-6 items-start">
                      <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-white z-10 relative" style={{ background: i === 0 ? srv.color : 'white' }}>
                        <span className="text-sm font-black" style={{ color: i === 0 ? 'white' : srv.color }}>{step.num}</span>
                      </div>
                      <div className="bg-white rounded-2xl p-6 flex-1 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-[#0F0F0F] mb-2">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            RÉSULTATS + TESTIMONIAL
        ══════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.05} yOffset={10} blur="8px" inView>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: srv.color }}>
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                  {lang === 'fr' ? 'Preuves & résultats' : 'Proof & results'}
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F0F]">{copy.resultsTitle}</h2>
              </div>
            </BlurFade>

            {/* Métriques */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {copy.results.map((r, i) => (
                <BlurFade key={i} delay={0.1 + i * 0.08} yOffset={12} blur="8px" inView>
                  <div className="text-center p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-4xl font-extrabold mb-2" style={{ color: srv.color }}>{r.metric}</p>
                    <p className="text-gray-500 text-sm leading-snug">{r.label}</p>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Social proof avec photos — LLC uniquement */}
            {srv.id === 'llc-creation' && (
              <BlurFade delay={0.25} yOffset={12} blur="8px" inView>
                <div className="mb-12 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                  {/* Bande photos */}
                  <div className="grid grid-cols-5 h-48">
                    {LLC_CLIENT_PHOTOS.map((p, i) => (
                      <div key={i} className="relative overflow-hidden group">
                        <img
                          src={p.url}
                          alt={p.name}
                          width={160}
                          height={192}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          <p className="text-white text-[10px] font-semibold">{p.name}</p>
                          <p className="text-[11px]">{p.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Caption */}
                  <div className="bg-white px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#0F0F0F]">
                        {lang === 'fr' ? 'Rejoignez +200 entrepreneurs' : 'Join 200+ entrepreneurs'}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {lang === 'fr'
                          ? 'Ils ont créé leur LLC américaine avec Diez — depuis la France, le Maroc, la Belgique et bien plus.'
                          : 'They created their US LLC with Diez — from France, Morocco, Belgium and beyond.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-xs" style={{ color: srv.color }}/>
                      ))}
                      <span className="text-xs font-bold ml-1 text-[#0F0F0F]">4.9/5</span>
                    </div>
                  </div>
                </div>
              </BlurFade>
            )}

            {/* Testimonial */}
            <BlurFade delay={0.3} yOffset={16} blur="10px" inView>
              <div className="max-w-3xl mx-auto rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${srv.bgLight} 0%, white 100%)` }}>
                <div className="absolute top-6 left-8 text-6xl font-black opacity-10" style={{ color: srv.color }}>"</div>
                <p className="text-lg md:text-xl text-[#0F0F0F] leading-relaxed font-medium mb-6 relative z-10">
                  {copy.testimonial.text}
                </p>
                <div className="flex items-center gap-4">
                  {srv.id === 'llc-creation' ? (
                    <img
                      src={LLC_TESTIMONIAL_PHOTO}
                      alt={copy.testimonial.author}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg" style={{ background: srv.color }}>
                      {copy.testimonial.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#0F0F0F]">{copy.testimonial.author}</p>
                    <p className="text-sm text-gray-500">{copy.testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-sm" style={{ color: srv.color }}/>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section className="py-20 bg-[#FFF8F3]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.05} yOffset={8} blur="8px" inView>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: srv.color }}>
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                  FAQ
                  <span className="w-5 h-px" style={{ background: srv.color }}/>
                </span>
                <h2 className="text-3xl font-extrabold text-[#0F0F0F]">{copy.faqTitle}</h2>
              </div>
            </BlurFade>
            <div className="flex flex-col gap-3">
              {copy.faqs.map((faq, i) => (
                <BlurFade key={i} delay={0.08 + i * 0.08} yOffset={8} blur="6px" inView>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-[#0F0F0F] text-sm">{faq.q}</span>
                      <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center shrink-0"
                        style={{ background: openFaq === i ? srv.bgLight : 'white' }}>
                        <i className="fas fa-chevron-down text-[10px] text-gray-400"/>
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                          <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════ */}
        <section className="py-24 bg-[#0F0F0F] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-20" style={{ background: srv.color }}/>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <BlurFade delay={0.05} yOffset={12} blur="10px" inView>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: `${srv.color}25` }}>
                <i className={`fas ${srv.icon} text-2xl`} style={{ color: srv.color }}/>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{copy.ctaTitle}</h2>
              <p className="text-gray-400 text-base mb-8">{copy.ctaSubtitle}</p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-2xl"
                style={{ background: srv.color, boxShadow: `0 20px 60px ${srv.color}50` }}
              >
                {copy.ctaBtn} <i className="fas fa-arrow-right text-sm"/>
              </Link>
            </BlurFade>
          </div>
        </section>

        {/* ══════════════════════════════════════
            AUTRES SERVICES
        ══════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade delay={0.05} yOffset={8} blur="8px" inView>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8 text-center">
                {lang === 'fr' ? 'Nos autres services' : 'Our other services'}
              </p>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {others.map((s, i) => {
                const c = lang === 'fr' ? s.fr : s.en;
                return (
                  <BlurFade key={s.id} delay={0.08 + i * 0.08} yOffset={10} blur="6px" inView>
                    <Link href={`/${lang}/services/${s.id}`}
                      className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md hover:border-gray-200 transition-all duration-200">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bgLight }}>
                        <i className={`fas ${s.icon} text-sm`} style={{ color: s.color }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#0F0F0F] leading-tight group-hover:text-[#FF4D29] transition-colors">{c.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{c.tagline}</p>
                      </div>
                      <i className="fas fa-arrow-right text-[10px] text-gray-300 group-hover:text-[#FF4D29] group-hover:translate-x-1 transition-all duration-200"/>
                    </Link>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
