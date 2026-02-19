'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, supabase, uploadImage, deleteImage } from '@/lib/supabase';
import type { Article, ArticleForm } from '@/lib/types';

const EMPTY_FORM: ArticleForm = {
  title: '', slug: '', excerpt: '', content: '',
  cover_url: '', category: 'Général', published: false,
};

const CATEGORIES = ['Général', 'Automatisation', 'Design & UX', 'Développement', 'Business', 'Tutoriel'];

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (!session) { router.push('/admin'); return; }
      await fetchItems();
    };
    init();
  }, [router]);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); setTab('edit'); };

  const openEdit = (a: Article) => {
    setForm({
      title: a.title, slug: a.slug, excerpt: a.excerpt, content: a.content,
      cover_url: a.cover_url ?? '', category: a.category, published: a.published,
    });
    setEditId(a.id);
    setShowForm(true);
    setTab('edit');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'articles');
    if (url) setForm((f) => ({ ...f, cover_url: url }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editId) {
      await supabase.from('articles').update(form).eq('id', editId);
      showToast('✅ Article mis à jour !');
    } else {
      await supabase.from('articles').insert(form);
      showToast('✅ Article créé !');
    }

    setSaving(false);
    setShowForm(false);
    await fetchItems();
  };

  const handleDelete = async (a: Article) => {
    if (!confirm(`Supprimer "${a.title}" ?`)) return;
    if (a.cover_url) await deleteImage(a.cover_url);
    await supabase.from('articles').delete().eq('id', a.id);
    showToast('🗑️ Supprimé');
    await fetchItems();
  };

  const togglePublish = async (a: Article) => {
    await supabase.from('articles').update({ published: !a.published }).eq('id', a.id);
    showToast(a.published ? '🔒 Dépublié' : '🌐 Publié !');
    await fetchItems();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      {toast && (
        <div className="fixed top-4 right-4 z-50 px-5 py-3 bg-[#0F0F0F] text-white text-sm font-semibold rounded-2xl shadow-xl animate-fade-in-up">
          {toast}
        </div>
      )}

      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-[#FF4D29] transition-colors">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1 className="text-base font-extrabold text-[#0F0F0F]">Articles Blog</h1>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#FF4D29] text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-[#FF4D29]/20"
        >
          <i className="fas fa-plus text-xs"></i> Nouvel article
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="fas fa-spinner animate-spin text-[#FF4D29] text-2xl"></i>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <i className="fas fa-newspaper text-4xl mb-4 block"></i>
            <p>Aucun article. Créez-en un !</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                {/* Cover miniature */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F4F4F5] shrink-0">
                  {a.cover_url
                    ? <img src={a.cover_url} alt={a.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-gray-300"><i className="fas fa-image text-xl"></i></div>
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${a.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {a.published ? '🌐 Publié' : '🔒 Brouillon'}
                    </span>
                    <span className="px-2 py-0.5 bg-[#FFF8F3] border border-orange-100 text-[#FF4D29] text-xs font-semibold rounded-full">
                      {a.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#0F0F0F] text-sm truncate">{a.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(a.created_at)}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(a)}
                    className={`py-1.5 px-3 text-xs font-bold rounded-xl transition-all ${a.published ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' : 'bg-green-50 hover:bg-green-100 text-green-600'}`}
                  >
                    {a.published ? 'Dépublier' : 'Publier'}
                  </button>
                  <button
                    onClick={() => openEdit(a)}
                    className="py-1.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl transition-all"
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(a)}
                    className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold rounded-xl transition-all"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Modal Formulaire ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
              <h2 className="font-extrabold text-[#0F0F0F]">
                {editId ? 'Modifier l\'article' : 'Nouvel article'}
              </h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <i className="fas fa-times text-sm text-gray-500"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">

              {/* Titre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Titre *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]"
                  placeholder="Comment automatiser votre business…"
                />
              </div>

              {/* Slug + Catégorie */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug *</label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Catégorie *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] bg-white"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Extrait */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Extrait (méta description) *</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  required rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] resize-none"
                  placeholder="Une phrase résumant l'article pour le SEO…"
                />
              </div>

              {/* Cover */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image de couverture</label>
                {form.cover_url && (
                  <div className="mb-2 h-32 rounded-xl overflow-hidden bg-gray-50">
                    <img src={form.cover_url} alt="cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? 'border-[#FF4D29] bg-orange-50' : 'border-gray-200 hover:border-[#FF4D29]'}`}>
                  <i className={`fas ${uploading ? 'fa-spinner animate-spin text-[#FF4D29]' : 'fa-image text-gray-400'}`}></i>
                  <span className="text-sm text-gray-500">{uploading ? 'Upload en cours…' : 'Choisir une image de couverture'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              </div>

              {/* Contenu Markdown avec onglets */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-gray-700">Contenu (Markdown) *</label>
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                    <button type="button" onClick={() => setTab('edit')}
                      className={`px-3 py-1 text-xs font-semibold transition-colors ${tab === 'edit' ? 'bg-[#FF4D29] text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                      Éditer
                    </button>
                    <button type="button" onClick={() => setTab('preview')}
                      className={`px-3 py-1 text-xs font-semibold transition-colors ${tab === 'preview' ? 'bg-[#FF4D29] text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                      Aperçu
                    </button>
                  </div>
                </div>

                {tab === 'edit' ? (
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                    required rows={12}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-[#FF4D29] resize-y"
                    placeholder="## Introduction&#10;&#10;Votre contenu en Markdown…"
                  />
                ) : (
                  <div
                    className="w-full min-h-48 px-4 py-3 border border-gray-200 rounded-xl text-sm prose prose-sm max-w-none overflow-auto"
                    dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, '<br>') }}
                  />
                )}
                <p className="text-xs text-gray-400 mt-1.5">
                  Supporte : # Titres, **gras**, *italique*, - listes, `code`, &gt; citations
                </p>
              </div>

              {/* Publié toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${form.published ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-5' : ''}`}></span>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {form.published ? '🌐 Publié (visible sur le blog)' : '🔒 Brouillon (non visible)'}
                </span>
              </label>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-sm">
                  Annuler
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 bg-[#FF4D29] hover:bg-orange-600 text-white font-bold rounded-xl transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <><i className="fas fa-spinner animate-spin"></i> Enregistrement…</> : <><i className="fas fa-save"></i> Enregistrer</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
