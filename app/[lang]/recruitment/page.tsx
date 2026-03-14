import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LANGS, type SupportedLang } from '../layout';
import RecruitmentClient from './RecruitmentClient';

const META: Record<SupportedLang, { title: string; description: string; url: string }> = {
  fr: {
    title: 'Recrutement – Rejoignez l\'équipe | Diez Agency',
    description: 'Envoyez votre candidature pour rejoindre Diez Agency. Déposez votre CV et présentez-vous en 2 minutes.',
    url: 'https://diez-agency.com/fr/recruitment',
  },
  en: {
    title: 'Careers – Join the team | Diez Agency',
    description: 'Apply to join Diez Agency. Upload your CV and introduce yourself in 2 minutes.',
    url: 'https://diez-agency.com/en/recruitment',
  },
};

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
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
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Diez Agency – Présence digitale, Profit mesurable.' }],
    },
    alternates: {
      canonical: m.url,
      languages: {
        fr: 'https://diez-agency.com/fr/recruitment',
        en: 'https://diez-agency.com/en/recruitment',
        'x-default': 'https://diez-agency.com/en/recruitment',
      },
    },
  };
}

export default async function RecruitmentPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  return <RecruitmentClient />;
}
