import { Metadata } from 'next';
import { getArticles } from '@/lib/supabase';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog | Diez Agency — Conseils Digitaux & Automatisation',
  description: 'Nos articles sur la transformation digitale, l\'automatisation et le développement sur-mesure. Des conseils concrets pour booster votre business.',
  openGraph: {
    title: 'Blog | Diez Agency',
    description: 'Conseils digitaux, automatisation et développement sur-mesure.',
    url: 'https://diez-agency.com/blog',
  },
  alternates: {
    canonical: 'https://diez-agency.com/blog',
  },
};

export default async function BlogPage() {
  const articles = await getArticles();
  return <BlogClient articles={articles} />;
}
