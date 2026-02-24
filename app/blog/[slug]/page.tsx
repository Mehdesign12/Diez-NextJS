import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/supabase';
import ArticleClient from './ArticleClient';

// ─── SEO dynamique par article ───────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article introuvable | Diez Agency' };

  return {
    title: `${article.title} | Diez Agency`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://diez-agency.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.created_at,
      images: article.cover_url ? [{ url: article.cover_url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.cover_url ? [article.cover_url] : [],
    },
    alternates: {
      canonical: `https://diez-agency.com/blog/${article.slug}`,
    },
  };
}

// ─── Génération statique des slugs ───────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Page ────────────────────────────────────────────────────
export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleClient article={article} />;
}
