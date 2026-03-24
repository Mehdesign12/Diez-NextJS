import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type SupportedLang } from '../../../../layout';
import {
  getPseoCities,
  getPseoCityBySlug,
  getPseoSectorBySlug,
  getPseoPageByCityServiceAndSector,
  getAllPseoCityServiceSectorParams,
} from '@/lib/supabase';
import PseoPage from '@/app/components/PseoPage';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const VALID_SERVICE_SLUGS = ['saas-web-app', 'llm-seo', 'agent-automation'];

const SERVICE_LABELS: Record<string, Record<string, string>> = {
  'saas-web-app': { fr: 'SaaS, Sites Web & Applications', en: 'SaaS, Websites & Applications' },
  'llm-seo': { fr: 'LLM SEO Optimisation', en: 'LLM SEO Optimization' },
  'agent-automation': { fr: 'Agent Automation Process', en: 'Agent Automation Process' },
};

export async function generateStaticParams() {
  const combos = await getAllPseoCityServiceSectorParams();
  return SUPPORTED_LANGS.flatMap((lang) =>
    combos.map((c) => ({ lang, city: c.city, service: c.service, sector: c.sector }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; city: string; service: string; sector: string }>;
}): Promise<Metadata> {
  const { lang, city: citySlug, service: serviceSlug, sector: sectorSlug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) return {};
  if (!VALID_SERVICE_SLUGS.includes(serviceSlug)) return {};

  const city = await getPseoCityBySlug(citySlug);
  if (!city) return {};

  const sector = await getPseoSectorBySlug(sectorSlug);
  if (!sector) return {};

  const page = await getPseoPageByCityServiceAndSector(city.id, serviceSlug, sector.id);

  const serviceName = SERVICE_LABELS[serviceSlug]?.[lang] ?? serviceSlug;
  const sectorName = lang === 'fr' ? sector.name_fr : sector.name_en;
  const cityName = lang === 'fr' ? city.name_fr : city.name_en;

  const title = page
    ? (lang === 'fr' ? page.meta_title_fr : page.meta_title_en) ?? (lang === 'fr' ? page.title_fr : page.title_en)
    : lang === 'fr'
      ? `${serviceName} pour ${sectorName} à ${cityName} | Diez Agency`
      : `${serviceName} for ${sectorName} in ${cityName} | Diez Agency`;

  const description = page
    ? (lang === 'fr' ? page.meta_description_fr : page.meta_description_en)
    : lang === 'fr'
      ? `${serviceName} pour le secteur ${sectorName} à ${cityName}. Solutions sur-mesure par Diez Agency. Audit gratuit.`
      : `${serviceName} for the ${sectorName} sector in ${cityName}. Tailored solutions by Diez Agency. Free audit.`;

  const url = `https://diez-agency.com/${lang}/agence/${citySlug}/${serviceSlug}/${sectorSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `https://diez-agency.com/fr/agence/${citySlug}/${serviceSlug}/${sectorSlug}`,
        en: `https://diez-agency.com/en/agence/${citySlug}/${serviceSlug}/${sectorSlug}`,
        'x-default': `https://diez-agency.com/en/agence/${citySlug}/${serviceSlug}/${sectorSlug}`,
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description: description ?? undefined,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function CityServiceSectorPage({
  params,
}: {
  params: Promise<{ lang: string; city: string; service: string; sector: string }>;
}) {
  const { lang, city: citySlug, service: serviceSlug, sector: sectorSlug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  if (!VALID_SERVICE_SLUGS.includes(serviceSlug)) notFound();

  const city = await getPseoCityBySlug(citySlug);
  if (!city) notFound();

  const sector = await getPseoSectorBySlug(sectorSlug);
  if (!sector) notFound();

  const page = await getPseoPageByCityServiceAndSector(city.id, serviceSlug, sector.id);
  if (!page) notFound();

  const allCities = await getPseoCities();
  const otherCities = allCities.filter((c) => c.slug !== citySlug);

  const homeLabel = lang === 'fr' ? 'Accueil' : 'Home';
  const cityName = lang === 'fr' ? city.name_fr : city.name_en;
  const serviceName = SERVICE_LABELS[serviceSlug]?.[lang] ?? serviceSlug;
  const sectorName = lang === 'fr' ? sector.name_fr : sector.name_en;

  // Schema.org — BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: `https://diez-agency.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: cityName, item: `https://diez-agency.com/${lang}/agence/${citySlug}` },
      { '@type': 'ListItem', position: 3, name: serviceName, item: `https://diez-agency.com/${lang}/agence/${citySlug}/${serviceSlug}` },
      { '@type': 'ListItem', position: 4, name: sectorName },
    ],
  };

  // Schema.org — Service
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${serviceName} — ${sectorName} — ${cityName}`,
    description: lang === 'fr' ? page.meta_description_fr : page.meta_description_en,
    url: `https://diez-agency.com/${lang}/agence/${citySlug}/${serviceSlug}/${sectorSlug}`,
    provider: { '@type': 'Organization', name: 'Diez Agency', url: 'https://diez-agency.com' },
    areaServed: {
      '@type': 'City',
      name: cityName,
      ...(city.lat && city.lng ? { geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng } } : {}),
    },
    audience: {
      '@type': 'Audience',
      audienceType: sectorName,
    },
  };

  // Schema.org — FAQPage
  const faqs = lang === 'fr' ? page.faq_fr : page.faq_en;
  const faqJsonLd = faqs && faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <Navbar />
      <PseoPage city={city} page={page} otherCities={otherCities} serviceSlug={serviceSlug} sectorSlug={sectorSlug} sector={sector} />
      <Footer />
    </>
  );
}
