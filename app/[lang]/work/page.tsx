import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WorkClient from './WorkClient';
import { SUPPORTED_LANGS, type SupportedLang } from '../layout';

const META: Record<SupportedLang, { title: string; description: string; url: string }> = {
  fr: {
    title: 'Nos Réalisations | Diez Agency',
    description: 'Découvrez tous nos projets : dashboards, automatisations, applications mobiles et sites web sur-mesure réalisés pour nos clients.',
    url: 'https://diez-agency.com/fr/work',
  },
  en: {
    title: 'Our Work | Diez Agency',
    description: 'Discover all our projects: dashboards, automations, mobile apps and custom websites built for our clients.',
    url: 'https://diez-agency.com/en/work',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) return {};
  const m = META[lang as SupportedLang];
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: m.url,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
    alternates: {
      canonical: m.url,
      languages: {
        fr: 'https://diez-agency.com/fr/work',
        en: 'https://diez-agency.com/en/work',
        'x-default': 'https://diez-agency.com/en/work',
      },
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  return <WorkClient />;
}
