'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, signOut, supabase } from '@/lib/supabase';

interface Stats {
  realisations: number;
  articles: number;
  published: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ realisations: 0, articles: 0, published: 0 });

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (!session) { router.push('/admin'); return; }

      // Charger les stats
      const [{ count: rCount }, { count: aCount }, { count: pCount }] = await Promise.all([
        supabase.from('realisations').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }).eq('published', true),
      ]);

      setStats({
        realisations: rCount ?? 0,
        articles: aCount ?? 0,
        published: pCount ?? 0,
      });
      setLoading(false);
    };
    init();
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <i className="fas fa-spinner animate-spin text-[#FF4D29] text-3xl"></i>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      {/* ── Topbar ── */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="/images/logo_clean.png" alt="Diez Agency" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-[#0F0F0F]">Diez Agency</h1>
            <p className="text-xs text-gray-400">Panel Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-sm text-gray-500 hover:text-[#FF4D29] transition-colors flex items-center gap-1.5">
            <i className="fas fa-external-link-alt text-xs"></i> Voir le site
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <i className="fas fa-sign-out-alt text-xs"></i> Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { label: 'Réalisations', value: stats.realisations, icon: 'fa-briefcase', color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Articles total', value: stats.articles, icon: 'fa-newspaper', color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: 'Articles publiés', value: stats.published, icon: 'fa-check-circle', color: 'text-green-500', bg: 'bg-green-50' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>
                <i className={`fas ${s.icon} ${s.color} text-lg`}></i>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#0F0F0F]">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <h2 className="text-lg font-extrabold text-[#0F0F0F] mb-5">Gestion du contenu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Réalisations */}
          <Link href="/admin/dashboard/realisations" className="group block">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FF4D29]/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <i className="fas fa-briefcase text-[#FF4D29] text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-gray-300 group-hover:text-[#FF4D29] group-hover:translate-x-1 transition-all"></i>
              </div>
              <h3 className="text-lg font-extrabold text-[#0F0F0F] mb-1">Réalisations</h3>
              <p className="text-sm text-gray-500">Ajouter, modifier ou supprimer vos projets portfolio.</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
                <span className="text-xs font-semibold text-[#FF4D29]">{stats.realisations} projets</span>
              </div>
            </div>
          </Link>

          {/* Blog */}
          <Link href="/admin/dashboard/blog" className="group block">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FF4D29]/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <i className="fas fa-newspaper text-purple-500 text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-gray-300 group-hover:text-[#FF4D29] group-hover:translate-x-1 transition-all"></i>
              </div>
              <h3 className="text-lg font-extrabold text-[#0F0F0F] mb-1">Articles Blog</h3>
              <p className="text-sm text-gray-500">Rédiger, publier ou dépublier vos articles.</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
                <span className="text-xs font-semibold text-purple-500">{stats.published} publiés</span>
                <span className="text-xs text-gray-400">/ {stats.articles} total</span>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
