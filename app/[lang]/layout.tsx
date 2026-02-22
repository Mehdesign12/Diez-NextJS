import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LangProvider } from '../context/LangContext';
import { SUPPORTED_LANGS, type SupportedLang } from '@/lib/i18n';

// Ré-exporter pour les pages enfants qui importent depuis './layout'
export { SUPPORTED_LANGS, type SupportedLang };

const META: Record<SupportedLang, { title: string; description: string; url: string }> = {
  fr: {
    title: 'Diez Agency – Présence digitale, Profit mesurable.',
    description: 'Diez Agency – Présence digitale, Profit mesurable. Création de sites web, identité visuelle et stratégie digitale sur-mesure. Audit gratuit.',
    url: 'https://diez-agency.com/fr',
  },
  en: {
    title: 'Diez Agency – Digital Presence, Measurable Profit.',
    description: 'Diez Agency – Digital Presence, Measurable Profit. Custom website creation, visual identity and digital strategy. Free audit.',
    url: 'https://diez-agency.com/en',
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) return {};
  const l = lang as SupportedLang;
  const m = META[l];

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: m.url,
      languages: {
        'fr': 'https://diez-agency.com/fr',
        'en': 'https://diez-agency.com/en',
        'x-default': 'https://diez-agency.com/en',
      },
    },
    openGraph: {
      type: 'website',
      url: m.url,
      title: m.title,
      description: m.description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Diez Agency – Présence digitale, Profit mesurable.' }],
      locale: l === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();

  return (
    <LangProvider initialLang={lang as SupportedLang}>
      {children}
    </LangProvider>
  );
}
