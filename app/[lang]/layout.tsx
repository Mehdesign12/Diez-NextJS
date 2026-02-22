import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LangProvider } from '../context/LangContext';

export const SUPPORTED_LANGS = ['fr', 'en'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];

const META: Record<SupportedLang, { title: string; description: string; url: string }> = {
  fr: {
    title: 'Diez Agency | Expert en Automatisation & Développement Sur-Mesure',
    description: 'Automatisez vos processus, créez des outils internes sur-mesure et transformez votre business. Audit gratuit. Délais garantis. Budget respecté.',
    url: 'https://diez-agency.com/fr',
  },
  en: {
    title: 'Diez Agency | Custom Automation & Development Agency',
    description: 'Automate your processes, build custom internal tools and transform your business. Free audit. Guaranteed deadlines. Respected budget.',
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
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
      locale: l === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/images/og-image.jpg'],
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
