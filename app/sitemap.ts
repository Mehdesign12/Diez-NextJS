import { MetadataRoute } from 'next';

const BASE_URL = 'https://diez-agency.com';
const LANGS = ['fr', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/work', '/blog'];

  const entries: MetadataRoute.Sitemap = [];

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

  return entries;
}
