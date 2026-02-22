import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticles } from '@/lib/supabase';
import BlogClient from './BlogClient';
import { SUPPORTED_LANGS, type SupportedLang } from '../layout';

const META: Record<SupportedLang, { title: string; description: string; url: string }> = {
  fr: {
    title: 'Blog | Diez Agency — Conseils Digitaux & Automatisation',
    description: 'Nos articles sur la transformation digitale, l\'automatisation et le développement sur-mesure. Des conseils concrets pour booster votre business.',
    url: 'https://diez-agency.com/fr/blog',
  },
  en: {
    title: 'Blog | Diez Agency — Digital & Automation Insights',
    description: 'Our articles on digital transformation, automation and custom development. Practical tips to boost your business.',
    url: 'https://diez-agency.com/en/blog',
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
        fr: 'https://diez-agency.com/fr/blog',
        en: 'https://diez-agency.com/en/blog',
        'x-default': 'https://diez-agency.com/en/blog',
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  const articles = await getArticles();
  return <BlogClient articles={articles} />;
}
