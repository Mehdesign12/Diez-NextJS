import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type SupportedLang } from '../../layout';
import {
  getPseoCities,
  getPseoCityBySlug,
  getPseoPageByCity,
  getAllPseoCitySlugs,
} from '@/lib/supabase';
import PseoPage from '@/app/components/PseoPage';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export async function generateStaticParams() {
  const slugs = await getAllPseoCitySlugs();
  return SUPPORTED_LANGS.flatMap((lang) =>
    slugs.map((city) => ({ lang, city }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; city: string }>;
}): Promise<Metadata> {
  const { lang, city: citySlug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) return {};

  const city = await getPseoCityBySlug(citySlug);
  if (!city) return {};

  const page = await getPseoPageByCity(city.id);

  const title = page
    ? (lang === 'fr' ? page.meta_title_fr : page.meta_title_en) ?? (lang === 'fr' ? page.title_fr : page.title_en)
    : lang === 'fr'
      ? `Agence Digitale à ${city.name_fr} | Diez Agency`
      : `Digital Agency in ${city.name_en} | Diez Agency`;

  const description = page
    ? (lang === 'fr' ? page.meta_description_fr : page.meta_description_en)
    : lang === 'fr'
      ? `Diez Agency, votre agence digitale à ${city.name_fr}. Création de sites web, SaaS, automatisation IA et SEO. Audit gratuit.`
      : `Diez Agency, your digital agency in ${city.name_en}. Website creation, SaaS, AI automation and SEO. Free audit.`;

  const url = `https://diez-agency.com/${lang}/agence/${citySlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `https://diez-agency.com/fr/agence/${citySlug}`,
        en: `https://diez-agency.com/en/agence/${citySlug}`,
        'x-default': `https://diez-agency.com/en/agence/${citySlug}`,
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

export default async function CityPage({
  params,
}: {
  params: Promise<{ lang: string; city: string }>;
}) {
  const { lang, city: citySlug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();

  const city = await getPseoCityBySlug(citySlug);
  if (!city) notFound();

  const page = await getPseoPageByCity(city.id);
  if (!page) notFound();

  const allCities = await getPseoCities();
  const otherCities = allCities.filter((c) => c.slug !== citySlug);

  const homeLabel = lang === 'fr' ? 'Accueil' : 'Home';
  const cityName = lang === 'fr' ? city.name_fr : city.name_en;

  // Schema.org — BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: `https://diez-agency.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: cityName },
    ],
  };

  // Schema.org — LocalBusiness
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Diez Agency — ${cityName}`,
    description: lang === 'fr' ? page.meta_description_fr : page.meta_description_en,
    url: `https://diez-agency.com/${lang}/agence/${citySlug}`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <Navbar />
      <PseoPage city={city} page={page} otherCities={otherCities} />
      <Footer />
    </>
  );
}
