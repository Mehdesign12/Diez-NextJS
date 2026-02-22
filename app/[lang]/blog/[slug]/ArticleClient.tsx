'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { marked } from 'marked';
import type { Article } from '@/lib/types';

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"%3E%3Crect width="1200" height="600" fill="%23f4f4f5"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="28" fill="%23999" font-family="sans-serif"%3ECover article%3C/text%3E%3C/svg%3E';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

// Configuration marked
marked.setOptions({ gfm: true, breaks: true });

interface Props { article: Article }

export default function ArticleClient({ article }: Props) {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const htmlContent = useMemo(() => marked(article.content) as string, [article.content]);

  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      {/* ── Navbar ── */}
      <nav className="fixed w-full z-50 top-6 px-4">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img src="/images/logo_clean.png" alt="Diez Agency" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#FF4D29] transition-colors">Diez Agency</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`/${lang}/blog`} className="text-sm font-medium text-gray-500 hover:text-[#FF4D29] transition-colors flex items-center gap-1.5">
              <i className="fas fa-arrow-left text-xs"></i> Blog
            </Link>
            <Link href={`/${lang}#contact`} className="px-5 py-2 bg-[#FF4D29] text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-all">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero article ── */}
      <header className="pt-32 pb-0">
        {/* Cover image */}
        <div className="max-w-4xl mx-auto px-4 mb-10">
          <div className="rounded-3xl overflow-hidden h-64 md:h-96 bg-[#F4F4F5]">
            <img
              src={article.cover_url || FALLBACK_IMAGE}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Meta */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="px-3 py-1 bg-[#FFF8F3] border border-orange-100 text-[#FF4D29] text-xs font-bold rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1.5">
              <i className="fas fa-clock text-xs"></i>
              {readingTime(article.content)} min de lecture
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1.5">
              <i className="fas fa-calendar text-xs"></i>
              {formatDate(article.created_at)}
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F0F0F] leading-tight mb-6">
            {article.title}
          </h1>

          {/* Extrait */}
          <p className="text-lg text-gray-500 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#FF4D29] rounded-full mx-auto mt-8"></div>
        </div>
      </header>

      {/* ── Contenu Markdown ── */}
      <main className="py-14 px-4">
        <article
          className="max-w-2xl mx-auto prose prose-lg
            prose-headings:font-extrabold prose-headings:text-[#0F0F0F]
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-[#0F0F0F] prose-strong:font-bold
            prose-a:text-[#FF4D29] prose-a:no-underline hover:prose-a:underline
            prose-ul:text-gray-600 prose-li:my-1
            prose-ol:text-gray-600
            prose-blockquote:border-l-[#FF4D29] prose-blockquote:text-gray-500 prose-blockquote:italic
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-[#FF4D29]
            prose-pre:bg-[#0F0F0F] prose-pre:text-gray-100 prose-pre:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>

      {/* ── Footer article : partage + CTA ── */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Partager cet article</p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://diez-agency.com/blog/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-100 hover:bg-[#1DA1F2] hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-all"
                >
                  <i className="fab fa-x-twitter text-sm"></i>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://diez-agency.com/blog/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-100 hover:bg-[#0077B5] hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-all"
                >
                  <i className="fab fa-linkedin-in text-sm"></i>
                </a>
              </div>
            </div>
            <Link
              href={`/${lang}/blog`}
              className="text-sm font-bold text-[#FF4D29] flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              <i className="fas fa-arrow-left text-xs"></i> Voir tous les articles
            </Link>
          </div>
        </div>
      </div>

      {/* ── JSON-LD Schema.org pour SEO ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            image: article.cover_url || '',
            datePublished: article.created_at,
            dateModified: article.updated_at,
            author: {
              '@type': 'Organization',
              name: 'Diez Agency',
              url: 'https://diez-agency.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Diez Agency',
              url: 'https://diez-agency.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://diez-agency.com/blog/${article.slug}`,
            },
          }),
        }}
      />

      {/* ── CTA bas ── */}
      <section className="bg-[#0F0F0F] py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Prêt à passer à l&apos;action ?
          </h2>
          <p className="text-gray-400 mb-8">Audit gratuit · Délais garantis · Budget respecté</p>
          <Link
            href={`/${lang}#contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D29] text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-[#FF4D29]/30 hover:-translate-y-0.5"
          >
            <i className="fas fa-rocket"></i> Démarrer mon projet
          </Link>
        </div>
      </section>
    </div>
  );
}
