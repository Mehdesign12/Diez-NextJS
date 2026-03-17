import { MetadataRoute } from 'next';
import { getAllArticleSlugs, getAllPseoPages } from '@/lib/supabase';

const BASE_URL = 'https://diez-agency.com';
const LANGS = ['fr', 'en'];

const SERVICE_SLUGS = ['saas-web-app', 'llc-creation', 'llm-seo', 'agent-automation'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/work', '/blog', '/contact', '/services'];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const lang of LANGS) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'daily',
        priority: route === '' ? 1.0 : route === '/blog' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  // Service pages
  for (const lang of LANGS) {
    for (const slug of SERVICE_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${lang}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [l, `${BASE_URL}/${l}/services/${slug}`])
          ),
        },
      });
    }
  }

  // Blog articles (dynamic from Supabase)
  const articleSlugs = await getAllArticleSlugs();
  for (const lang of LANGS) {
    for (const slug of articleSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [l, `${BASE_URL}/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  // PSEO pages (dynamic from Supabase)
  const pseoPages = await getAllPseoPages();
  for (const lang of LANGS) {
    for (const p of pseoPages) {
      const citySlug = p.city.slug;
      const path = p.service_slug
        ? `/agence/${citySlug}/${p.service_slug}`
        : `/agence/${citySlug}`;

      entries.push({
        url: `${BASE_URL}/${lang}${path}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
