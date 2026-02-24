import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type SupportedLang } from '../../layout';
import { ServiceSlugClient } from './ServiceSlugClient';

const VALID_SLUGS = ['saas-web-app', 'llc-creation', 'llm-seo', 'agent-automation'];

export async function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap(lang =>
    VALID_SLUGS.map(slug => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const titles: Record<string, Record<string, string>> = {
    'saas-web-app': {
      fr: 'SaaS, Sites Web & Applications | Diez Agency',
      en: 'SaaS, Websites & Applications | Diez Agency',
    },
    'llc-creation': {
      fr: 'Création de LLC Complète | Diez Agency',
      en: 'Full LLC Creation | Diez Agency',
    },
    'llm-seo': {
      fr: 'LLM SEO Optimisation | Diez Agency',
      en: 'LLM SEO Optimization | Diez Agency',
    },
    'agent-automation': {
      fr: 'Agent Automation Process | Diez Agency',
      en: 'Agent Automation Process | Diez Agency',
    },
  };
  const title = titles[slug]?.[lang] ?? 'Services | Diez Agency';
  return { title };
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  if (!VALID_SLUGS.includes(slug)) notFound();
  return <ServiceSlugClient />;
}
