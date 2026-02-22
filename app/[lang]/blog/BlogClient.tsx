'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import type { Article } from '@/lib/types';

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23f4f4f5"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20" fill="%23999" font-family="sans-serif"%3EImage article%3C/text%3E%3C/svg%3E';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface Props { articles: Article[] }

export default function BlogClient({ articles }: Props) {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';

  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  const [featured, ...rest] = filtered;

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
            <Link href={`/${lang}`} className="text-sm font-medium text-gray-500 hover:text-[#FF4D29] transition-colors flex items-center gap-1.5">
              <i className="fas fa-arrow-left text-xs"></i> Retour
            </Link>
            <Link href={`/${lang}#contact`} className="px-5 py-2 bg-[#FF4D29] text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-all">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-36 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#FF4D29] animate-pulse"></span>
            Blog & Ressources
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F0F0F] leading-tight mb-4">
            Conseils pour votre <span className="text-gradient-orange">croissance</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Automatisation, design, développement : nos insights pour transformer votre business.
          </p>
        </div>
      </section>

      {/* ── Filtres catégories ── */}
      {categories.length > 0 && (
        <section className="pb-10 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === null
                  ? 'bg-[#FF4D29] text-white shadow-lg shadow-[#FF4D29]/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF4D29] hover:text-[#FF4D29]'
              }`}
            >
              Tous ({articles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#FF4D29] text-white shadow-lg shadow-[#FF4D29]/20'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF4D29] hover:text-[#FF4D29]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <i className="fas fa-newspaper text-4xl mb-4 block"></i>
              <p className="text-lg">Aucun article dans cette catégorie.</p>
            </div>
          ) : (
            <>
              {/* Article featured (premier) */}
              {featured && (
                <Link href={`/${lang}/blog/${featured.slug}`} className="group block mb-10">
                  <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 md:flex">
                    <div className="md:w-1/2 h-56 md:h-auto overflow-hidden bg-[#F4F4F5]">
                      <img
                        src={featured.cover_url || FALLBACK_IMAGE}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-[#FFF8F3] border border-orange-100 text-[#FF4D29] text-xs font-bold rounded-full">
                          {featured.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {readingTime(featured.content)} min de lecture
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F0F0F] mb-3 group-hover:text-[#FF4D29] transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-gray-500 leading-relaxed mb-5 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{formatDate(featured.created_at)}</span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF4D29] group-hover:gap-2.5 transition-all">
                          Lire l&apos;article <i className="fas fa-arrow-right text-xs"></i>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Grille des autres articles */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <Link key={article.id} href={`/${lang}/blog/${article.slug}`} className="group block">
                      <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                        <div className="h-44 overflow-hidden bg-[#F4F4F5]">
                          <img
                            src={article.cover_url || FALLBACK_IMAGE}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 bg-[#FFF8F3] border border-orange-100 text-[#FF4D29] text-xs font-bold rounded-full">
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {readingTime(article.content)} min
                            </span>
                          </div>
                          <h2 className="text-base font-extrabold text-[#0F0F0F] mb-2 group-hover:text-[#FF4D29] transition-colors leading-snug flex-1">
                            {article.title}
                          </h2>
                          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                            <span className="text-xs text-gray-400">{formatDate(article.created_at)}</span>
                            <span className="text-xs font-bold text-[#FF4D29] flex items-center gap-1 group-hover:gap-2 transition-all">
                              Lire <i className="fas fa-arrow-right text-[10px]"></i>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
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
