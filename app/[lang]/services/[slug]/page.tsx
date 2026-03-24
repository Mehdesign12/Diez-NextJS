import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type SupportedLang } from '../../layout';
import { ServiceSlugClient } from './ServiceSlugClient';
import { SERVICES_DATA } from '../servicesData';

const VALID_SLUGS = ['saas-web-app', 'llm-seo', 'agent-automation'];

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

  const srv = SERVICES_DATA.find(s => s.id === slug);
  const copy = srv ? (lang === 'fr' ? srv.fr : srv.en) : null;
  const homeLabel = lang === 'fr' ? 'Accueil' : 'Home';

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: `https://diez-agency.com/${lang}` },
      { "@type": "ListItem", position: 2, name: "Services", item: `https://diez-agency.com/${lang}/services` },
      { "@type": "ListItem", position: 3, name: copy?.title ?? slug },
    ],
  };

  const serviceJsonLd = copy ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.title,
    description: copy.heroSubtitle,
    provider: {
      "@type": "Organization",
      name: "Diez Agency",
      url: "https://diez-agency.com",
    },
    url: `https://diez-agency.com/${lang}/services/${slug}`,
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {serviceJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />}
      <ServiceSlugClient />
    </>
  );
}
