import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/supabase';
import ArticleClient from './ArticleClient';
import { SUPPORTED_LANGS, type SupportedLang } from '../../layout';

// ─── SEO dynamique par article ───────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> }
): Promise<Metadata> {
  const { slug, lang } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article introuvable | Diez Agency' };

  const baseUrl = `https://diez-agency.com/${lang}/blog/${article.slug}`;
  return {
    title: `${article.title} | Diez Agency`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: baseUrl,
      type: 'article',
      publishedTime: article.created_at,
      images: article.cover_url ? [{ url: article.cover_url }] : [],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.cover_url ? [article.cover_url] : [],
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

// ─── Génération statique des slugs (par langue) ───────────────
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  const params = [];
  for (const lang of SUPPORTED_LANGS) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

// ─── Page ────────────────────────────────────────────────────
export default async function ArticlePage(
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleClient article={article} />;
}
