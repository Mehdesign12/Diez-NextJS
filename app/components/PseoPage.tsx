'use client';

import Link from 'next/link';
import { useLang } from '../context/LangContext';
import type { PseoCity, PseoPage as PseoPageType, PseoFaqItem } from '@/lib/types';

interface PseoPageProps {
  city: PseoCity;
  page: PseoPageType;
  /** Other cities for internal linking */
  otherCities: PseoCity[];
  /** Current service slug (if on a city+service page) */
  serviceSlug?: string;
}

const SERVICE_LABELS: Record<string, Record<string, string>> = {
  'saas-web-app': { fr: 'SaaS, Sites Web & Applications', en: 'SaaS, Websites & Applications' },
  'llc-creation': { fr: 'Création de LLC Complète', en: 'Full LLC Creation' },
  'llm-seo': { fr: 'LLM SEO Optimisation', en: 'LLM SEO Optimization' },
  'agent-automation': { fr: 'Agent Automation Process', en: 'Agent Automation Process' },
};

const SERVICE_SLUGS = ['saas-web-app', 'llc-creation', 'llm-seo', 'agent-automation'];

export default function PseoPage({ city, page, otherCities, serviceSlug }: PseoPageProps) {
  const { lang, t } = useLang();

  const title = lang === 'fr' ? page.title_fr : page.title_en;
  const content = lang === 'fr' ? page.content_fr : page.content_en;
  const faqs: PseoFaqItem[] = lang === 'fr' ? (page.faq_fr ?? []) : (page.faq_en ?? []);
  const cityName = lang === 'fr' ? city.name_fr : city.name_en;
  const cityDesc = lang === 'fr' ? city.description_fr : city.description_en;

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#FF4D29] font-semibold text-sm uppercase tracking-wider mb-4">
            Diez Agency — {cityName}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0F0F0F] tracking-tight leading-tight mb-6">
            {title}
          </h1>
          {cityDesc && (
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              {cityDesc}
            </p>
          )}
          {city.population && (
            <div className="flex justify-center gap-8 text-center mb-10">
              <div>
                <p className="text-3xl font-bold text-[#0F0F0F]">
                  {(city.population / 1_000_000).toFixed(1)}M+
                </p>
                <p className="text-gray-500 text-sm">{lang === 'fr' ? 'Habitants' : 'Residents'}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0F0F0F]">50+</p>
                <p className="text-gray-500 text-sm">{lang === 'fr' ? 'Projets livrés' : 'Projects delivered'}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0F0F0F]">4.9/5</p>
                <p className="text-gray-500 text-sm">Trustpilot</p>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-4 bg-[#FF4D29] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center gap-2"
            >
              {t('cta-btn-1')}
              <i className="fas fa-arrow-right"></i>
            </Link>
            <Link
              href={`/${lang}/services`}
              className="px-8 py-4 bg-gray-100 text-[#0F0F0F] rounded-full font-bold text-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
            >
              {t('services-link')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      {content && (
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            {content.split('\n').map((paragraph, i) => (
              paragraph.trim() ? <p key={i}>{paragraph}</p> : null
            ))}
          </div>
        </section>
      )}

      {/* ── Services grid (city page only) ── */}
      {!serviceSlug && (
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-[#0F0F0F] mb-4">
              {lang === 'fr'
                ? `Nos services à ${cityName}`
                : `Our services in ${cityName}`}
            </h2>
            <p className="text-gray-500 text-center text-lg mb-12 max-w-2xl mx-auto">
              {lang === 'fr'
                ? 'Chaque service est pensé pour générer un impact mesurable sur votre croissance.'
                : 'Every service is designed to generate measurable impact on your growth.'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {SERVICE_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  href={`/${lang}/agence/${city.slug}/${slug}`}
                  className="group p-8 rounded-2xl border border-gray-200 hover:border-[#FF4D29]/30 hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-[#0F0F0F] mb-2 group-hover:text-[#FF4D29] transition-colors">
                    {SERVICE_LABELS[slug]?.[lang] ?? slug}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {lang === 'fr'
                      ? `Découvrir ce service à ${cityName}`
                      : `Discover this service in ${cityName}`}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#FF4D29] text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                    {lang === 'fr' ? 'En savoir plus' : 'Learn more'}
                    <i className="fas fa-arrow-right text-xs"></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-[#0F0F0F] mb-12">
              {lang === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#0F0F0F] text-lg hover:text-[#FF4D29] transition-colors">
                    {faq.question}
                    <i className="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0F0F0F] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#FF4D29] rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {lang === 'fr'
                  ? `Prêt à lancer votre projet à ${cityName} ?`
                  : `Ready to launch your project in ${cityName}?`}
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                {lang === 'fr'
                  ? 'Audit gratuit de votre business en 24h. Zéro engagement.'
                  : 'Free business audit within 24h. Zero commitment.'}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#0F0F0F] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                {t('cta-btn-1')}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Internal links — other cities ── */}
      {otherCities.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0F0F0F] mb-8">
              {lang === 'fr'
                ? 'Nos autres implantations au Maroc'
                : 'Our other locations in Morocco'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherCities.map((c) => {
                const href = serviceSlug
                  ? `/${lang}/agence/${c.slug}/${serviceSlug}`
                  : `/${lang}/agence/${c.slug}`;
                return (
                  <Link
                    key={c.slug}
                    href={href}
                    className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-[#0F0F0F] hover:border-[#FF4D29] hover:text-[#FF4D29] transition-colors"
                  >
                    {lang === 'fr' ? c.name_fr : c.name_en}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
