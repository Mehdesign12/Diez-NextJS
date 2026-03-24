import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type SupportedLang } from '../../../layout';
import {
  getPseoCities,
  getPseoCityBySlug,
  getPseoPageByCityAndService,
  getPseoPageByCityAndSector,
  getPseoSectorBySlug,
  getAllPseoCityServiceParams,
  getAllPseoCitySectorParams,
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
  const [serviceCombos, sectorCombos] = await Promise.all([
    getAllPseoCityServiceParams(),
    getAllPseoCitySectorParams(),
  ]);

  return SUPPORTED_LANGS.flatMap((lang) => [
    ...serviceCombos.map((c) => ({ lang, city: c.city, service: c.service })),
    ...sectorCombos.map((c) => ({ lang, city: c.city, service: c.sector })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; city: string; service: string }>;
}): Promise<Metadata> {
  const { lang, city: citySlug, service: slug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) return {};

  const city = await getPseoCityBySlug(citySlug);
  if (!city) return {};

  const isService = VALID_SERVICE_SLUGS.includes(slug);
  const cityName = lang === 'fr' ? city.name_fr : city.name_en;

  let title: string;
  let description: string | null;
  let url: string;

  if (isService) {
    const page = await getPseoPageByCityAndService(city.id, slug);
    const serviceName = SERVICE_LABELS[slug]?.[lang] ?? slug;

    title = page
      ? (lang === 'fr' ? page.meta_title_fr : page.meta_title_en) ?? (lang === 'fr' ? page.title_fr : page.title_en)
      : lang === 'fr'
        ? `${serviceName} à ${cityName} | Diez Agency`
        : `${serviceName} in ${cityName} | Diez Agency`;

    description = page
      ? (lang === 'fr' ? page.meta_description_fr : page.meta_description_en)
      : lang === 'fr'
        ? `${serviceName} à ${cityName} par Diez Agency. Résultats garantis, délais respectés. Audit gratuit.`
        : `${serviceName} in ${cityName} by Diez Agency. Guaranteed results, on-time delivery. Free audit.`;

    url = `https://diez-agency.com/${lang}/agence/${citySlug}/${slug}`;
  } else {
    const sector = await getPseoSectorBySlug(slug);
    if (!sector) return {};

    const page = await getPseoPageByCityAndSector(city.id, sector.id);
    const sectorName = lang === 'fr' ? sector.name_fr : sector.name_en;

    title = page
      ? (lang === 'fr' ? page.meta_title_fr : page.meta_title_en) ?? (lang === 'fr' ? page.title_fr : page.title_en)
      : lang === 'fr'
        ? `Agence Digitale ${sectorName} à ${cityName} | Diez Agency`
        : `${sectorName} Digital Agency in ${cityName} | Diez Agency`;

    description = page
      ? (lang === 'fr' ? page.meta_description_fr : page.meta_description_en)
      : lang === 'fr'
        ? `Solutions digitales pour le secteur ${sectorName} à ${cityName}. Sites web, automatisation et SEO. Audit gratuit.`
        : `Digital solutions for the ${sectorName} sector in ${cityName}. Websites, automation and SEO. Free audit.`;

    url = `https://diez-agency.com/${lang}/agence/${citySlug}/${slug}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `https://diez-agency.com/fr/agence/${citySlug}/${slug}`,
        en: `https://diez-agency.com/en/agence/${citySlug}/${slug}`,
        'x-default': `https://diez-agency.com/en/agence/${citySlug}/${slug}`,
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

export default async function CityServiceOrSectorPage({
  params,
}: {
  params: Promise<{ lang: string; city: string; service: string }>;
}) {
  const { lang, city: citySlug, service: slug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();

  const city = await getPseoCityBySlug(citySlug);
  if (!city) notFound();

  const isService = VALID_SERVICE_SLUGS.includes(slug);
  const allCities = await getPseoCities();
  const otherCities = allCities.filter((c) => c.slug !== citySlug);

  const homeLabel = lang === 'fr' ? 'Accueil' : 'Home';
  const cityName = lang === 'fr' ? city.name_fr : city.name_en;

  if (isService) {
    const page = await getPseoPageByCityAndService(city.id, slug);
    if (!page) notFound();

    const serviceName = SERVICE_LABELS[slug]?.[lang] ?? slug;

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: `https://diez-agency.com/${lang}` },
        { '@type': 'ListItem', position: 2, name: cityName, item: `https://diez-agency.com/${lang}/agence/${citySlug}` },
        { '@type': 'ListItem', position: 3, name: serviceName },
      ],
    };

    const serviceJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${serviceName} — ${cityName}`,
      description: lang === 'fr' ? page.meta_description_fr : page.meta_description_en,
      url: `https://diez-agency.com/${lang}/agence/${citySlug}/${slug}`,
      provider: { '@type': 'Organization', name: 'Diez Agency', url: 'https://diez-agency.com' },
      areaServed: {
        '@type': 'City',
        name: cityName,
        ...(city.lat && city.lng ? { geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng } } : {}),
      },
    };

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
        <PseoPage city={city} page={page} otherCities={otherCities} serviceSlug={slug} />
        <Footer />
      </>
    );
  }

  // ── Sector page ──
  const sector = await getPseoSectorBySlug(slug);
  if (!sector) notFound();

  const page = await getPseoPageByCityAndSector(city.id, sector.id);
  if (!page) notFound();

  const sectorName = lang === 'fr' ? sector.name_fr : sector.name_en;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: `https://diez-agency.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: cityName, item: `https://diez-agency.com/${lang}/agence/${citySlug}` },
      { '@type': 'ListItem', position: 3, name: sectorName },
    ],
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Diez Agency — ${sectorName} ${cityName}`,
    description: lang === 'fr' ? page.meta_description_fr : page.meta_description_en,
    url: `https://diez-agency.com/${lang}/agence/${citySlug}/${slug}`,
    ...(city.lat && city.lng
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: cityName,
            addressRegion: city.region,
            addressCountry: 'MA',
          },
          geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
        }
      : {}),
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <Navbar />
      <PseoPage city={city} page={page} otherCities={otherCities} sectorSlug={slug} sector={sector} />
      <Footer />
    </>
  );
}
