import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type SupportedLang } from '../layout';
import { ServicesListClient } from './ServicesListClient';

const META: Record<SupportedLang, { title: string; description: string }> = {
  fr: {
    title: 'Nos Services | Diez Agency',
    description: 'SaaS & Web, Création LLC, LLM SEO, Agent Automation — découvrez tous les services sur‑mesure de Diez Agency.',
  },
  en: {
    title: 'Our Services | Diez Agency',
    description: 'SaaS & Web, LLC Creation, LLM SEO, Agent Automation — discover all Diez Agency tailored services.',
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
  return { title: m.title, description: m.description };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  return <ServicesListClient />;
}
