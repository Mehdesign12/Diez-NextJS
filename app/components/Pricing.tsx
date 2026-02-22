'use client';
import Link from 'next/link';
import { useLang } from '../context/LangContext';
import { WarpBackground } from './ui/WarpBackground';

/* ── Données des formules ─────────────────────────────────── */
const PLANS = {
  fr: [
    {
      id: 'starter',
      badge: null,
      title: 'Lancement',
      tagline: 'Partez du bon pied',
      description: 'Idéal pour les entrepreneurs et startups qui veulent une présence digitale solide et rapide.',
      features: [
        { icon: 'fa-palette', label: 'Identité visuelle & Design System' },
        { icon: 'fa-globe', label: 'Site web jusqu\'à 5 pages' },
        { icon: 'fa-magnifying-glass', label: 'SEO technique de base' },
        { icon: 'fa-mobile-alt', label: 'Responsive mobile-first' },
      ],
      result: { metric: '2×', label: 'plus de visibilité en ligne' },
      cta: 'Démarrer mon projet',
      dark: false,
      featured: false,
    },
    {
      id: 'growth',
      badge: 'Le plus choisi',
      title: 'Croissance',
      tagline: 'Scalez votre activité',
      description: 'Pour les équipes qui veulent automatiser, convertir davantage et mesurer chaque euro investi.',
      features: [
        { icon: 'fa-wand-magic-sparkles', label: 'UX/UI sur-mesure complète' },
        { icon: 'fa-code', label: 'Application web React/Next.js' },
        { icon: 'fa-plug', label: 'Intégrations API & automatisations' },
        { icon: 'fa-chart-line', label: 'Dashboard analytics & reporting' },
      ],
      result: { metric: '+340%', label: 'de trafic qualifié en 90 jours' },
      cta: 'Obtenir un devis',
      dark: true,
      featured: true,
    },
    {
      id: 'enterprise',
      badge: null,
      title: 'Entreprise',
      tagline: 'Transformation complète',
      description: 'Accompagnement stratégique et technique complet pour les organisations qui veulent dominer leur marché.',
      features: [
        { icon: 'fa-users', label: 'Équipe dédiée 5+ experts' },
        { icon: 'fa-shield-alt', label: 'Architecture cloud & sécurité' },
        { icon: 'fa-headset', label: 'Support prioritaire 24/7' },
        { icon: 'fa-rocket', label: 'Roadmap produit & sprints agiles' },
      ],
      result: { metric: '12', label: 'entreprises transformées en 2024' },
      cta: 'Parlons stratégie',
      dark: false,
      featured: false,
    },
  ],
  en: [
    {
      id: 'starter',
      badge: null,
      title: 'Launch',
      tagline: 'Start on the right foot',
      description: 'Perfect for entrepreneurs and startups who want a solid and fast digital presence.',
      features: [
        { icon: 'fa-palette', label: 'Visual identity & Design System' },
        { icon: 'fa-globe', label: 'Website up to 5 pages' },
        { icon: 'fa-magnifying-glass', label: 'Technical SEO basics' },
        { icon: 'fa-mobile-alt', label: 'Mobile-first responsive' },
      ],
      result: { metric: '2×', label: 'more online visibility' },
      cta: 'Start my project',
      dark: false,
      featured: false,
    },
    {
      id: 'growth',
      badge: 'Most popular',
      title: 'Growth',
      tagline: 'Scale your business',
      description: 'For teams that want to automate, convert more and measure every euro invested.',
      features: [
        { icon: 'fa-wand-magic-sparkles', label: 'Full custom UX/UI design' },
        { icon: 'fa-code', label: 'React/Next.js web application' },
        { icon: 'fa-plug', label: 'API integrations & automations' },
        { icon: 'fa-chart-line', label: 'Analytics dashboard & reporting' },
      ],
      result: { metric: '+340%', label: 'qualified traffic in 90 days' },
      cta: 'Get a quote',
      dark: true,
      featured: true,
    },
    {
      id: 'enterprise',
      badge: null,
      title: 'Enterprise',
      tagline: 'Full transformation',
      description: 'Complete strategic and technical support for organizations that want to dominate their market.',
      features: [
        { icon: 'fa-users', label: 'Dedicated team 5+ experts' },
        { icon: 'fa-shield-alt', label: 'Cloud architecture & security' },
        { icon: 'fa-headset', label: '24/7 priority support' },
        { icon: 'fa-rocket', label: 'Product roadmap & agile sprints' },
      ],
      result: { metric: '12', label: 'companies transformed in 2024' },
      cta: 'Let\'s talk strategy',
      dark: false,
      featured: false,
    },
  ],
} as const;

/* ── Stats globales ───────────────────────────────────────── */
const STATS = {
  fr: [
    { value: '98%', label: 'clients satisfaits' },
    { value: '72h', label: 'pour un premier livrable' },
    { value: '0€', label: 'de frais cachés' },
    { value: '∞', label: 'révisions incluses' },
  ],
  en: [
    { value: '98%', label: 'satisfied clients' },
    { value: '72h', label: 'for a first deliverable' },
    { value: '0€', label: 'hidden fees' },
    { value: '∞', label: 'revisions included' },
  ],
} as const;

export default function Pricing() {
  const { lang } = useLang();
  const l = lang as 'fr' | 'en';
  const plans = PLANS[l];
  const stats = STATS[l];

  return (
    <section id="pricing" className="py-14 bg-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D29]/10 text-[#FF4D29] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D29] animate-pulse"></span>
            {l === 'fr' ? 'Nos formules' : 'Our plans'}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F0F0F] mb-2">
            {l === 'fr' ? 'Votre investissement, votre rythme.' : 'Your investment, your pace.'}
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            {l === 'fr'
              ? 'Chaque formule est conçue pour générer un retour mesurable. Les tarifs sont personnalisés selon votre projet.'
              : 'Every plan is designed to generate measurable returns. Pricing is tailored to your project.'}
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {plans.map((plan, i) => {
            const delayClass = i === 0 ? 'delay-100' : i === 1 ? 'delay-200' : 'delay-300';
            const cardClass = `reveal relative flex flex-col rounded-2xl transition-all duration-300 ${delayClass} ${
              plan.dark
                ? 'bg-[#0F0F0F] shadow-2xl ring-2 ring-[#FF4D29]/40 md:scale-105'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
            }`;

            const badge = plan.badge ? (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-[#FF4D29] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-[#FF4D29]/30 uppercase tracking-wide whitespace-nowrap">
                  {plan.badge}
                </span>
              </div>
            ) : null;

            const cardInner = (
              <>
                {badge}

              <div className={`flex flex-col flex-1 p-6 ${plan.badge ? 'pt-7' : 'pt-6'}`}>

                {/* Titre + tagline */}
                <div className="mb-4">
                  <h3 className={`text-lg font-extrabold mb-0.5 ${plan.dark ? 'text-white' : 'text-[#0F0F0F]'}`}>
                    {plan.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF4D29]">
                    {plan.tagline}
                  </p>
                  <p className={`text-xs mt-1.5 leading-relaxed ${plan.dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Séparateur */}
                <div className={`h-px mb-4 ${plan.dark ? 'bg-white/10' : 'bg-gray-100'}`} />

                {/* Features */}
                <ul className="space-y-2.5 mb-4 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                        plan.dark ? 'bg-[#FF4D29]/15' : 'bg-[#FF4D29]/8'
                      }`}>
                        <i className={`fas ${f.icon} text-[9px] text-[#FF4D29]`}></i>
                      </div>
                      <span className={`text-xs leading-relaxed ${plan.dark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Séparateur */}
                <div className={`h-px mb-4 ${plan.dark ? 'bg-white/10' : 'bg-gray-100'}`} />

                {/* Résultat client */}
                <div className={`rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2.5 ${
                  plan.dark ? 'bg-white/5 border border-white/10' : 'bg-[#FF4D29]/5 border border-[#FF4D29]/10'
                }`}>
                  <span className="text-lg font-extrabold text-[#FF4D29] leading-none">{plan.result.metric}</span>
                  <span className={`text-xs leading-snug ${plan.dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.result.label}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`/${lang}/contact`}
                  className={`block w-full py-3 px-5 text-center rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 ${
                    plan.dark
                      ? 'bg-[#FF4D29] text-white hover:bg-orange-500 shadow-lg shadow-[#FF4D29]/30 hover:shadow-[#FF4D29]/50 hover:-translate-y-0.5'
                      : 'border-2 border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white'
                  }`}
                >
                  {plan.cta}
                  <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </Link>

              </div>
            </>
            );

            // Carte Croissance : enveloppée dans WarpBackground
            if (plan.featured) {
              return (
                <WarpBackground
                  key={plan.id}
                  className={cardClass}
                  beamsPerSide={2}
                  beamSize={8}
                  beamDuration={5}
                  beamDelayMax={3}
                  gridColor="rgba(255, 77, 41, 0.07)"
                >
                  {cardInner}
                </WarpBackground>
              );
            }

            // Cartes standard
            return (
              <div key={plan.id} className={cardClass}>
                {cardInner}
              </div>
            );
          })}
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 reveal">
          {stats.map((s) => (
            <div key={s.label} className="text-center bg-white rounded-xl py-3 px-3 border border-gray-100 shadow-sm">
              <div className="text-xl font-extrabold text-[#FF4D29]">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Ligne de réassurance ── */}
        <div className="mt-6 text-center reveal">
          <p className={`text-xs text-gray-400 flex items-center justify-center gap-2 flex-wrap`}>
            <i className="fas fa-lock text-[#FF4D29]"></i>
            {l === 'fr'
              ? 'Devis gratuit et sans engagement · Réponse sous 24h · Budget fixé dès le départ'
              : 'Free no-obligation quote · Reply within 24h · Budget set from the start'}
          </p>
        </div>

      </div>
    </section>
  );
}
