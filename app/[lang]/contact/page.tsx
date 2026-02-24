import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LANGS, type SupportedLang } from '../layout';
import ContactClient from './ContactClient';

const META: Record<SupportedLang, { title: string; description: string; url: string }> = {
  fr: {
    title: 'Contact – Démarrez votre projet | Diez Agency',
    description: 'Parlez-nous de votre projet en 2 minutes. Audit gratuit, réponse sous 24h. Présence digitale, profit mesurable.',
    url: 'https://diez-agency.com/fr/contact',
  },
  en: {
    title: 'Contact – Start your project | Diez Agency',
    description: 'Tell us about your project in 2 minutes. Free audit, reply within 24h. Digital presence, measurable profit.',
    url: 'https://diez-agency.com/en/contact',
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
        fr: 'https://diez-agency.com/fr/contact',
        en: 'https://diez-agency.com/en/contact',
        'x-default': 'https://diez-agency.com/en/contact',
      },
    },
  };
}

export default async function ContactPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  return <ContactClient />;
}
