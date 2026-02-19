'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, supabase, uploadImage, deleteImage } from '@/lib/supabase';
import type { Realisation, RealisationForm } from '@/lib/types';

const EMPTY_FORM: RealisationForm = {
  title: '', slug: '', description: '', long_description: '',
  image_url: '', tags: [], link: '', featured: false, display_order: 0,
};

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminRealisationsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<RealisationForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');

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
    const { data } = await supabase.from('realisations').select('*').order('display_order');
    setItems(data ?? []);
    setLoading(false);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (r: Realisation) => {
    setForm({
      title: r.title, slug: r.slug, description: r.description,
      long_description: r.long_description ?? '', image_url: r.image_url ?? '',
      tags: r.tags, link: r.link ?? '', featured: r.featured, display_order: r.display_order,
    });
    setEditId(r.id);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'realisations');
    if (url) setForm((f) => ({ ...f, image_url: url }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editId) {
      const { error } = await supabase.from('realisations').update(form).eq('id', editId);
      if (!error) { showToast('✅ Réalisation mise à jour !'); }
    } else {
      const { error } = await supabase.from('realisations').insert(form);
      if (!error) { showToast('✅ Réalisation ajoutée !'); }
    }

    setSaving(false);
    setShowForm(false);
    await fetchItems();
  };

  const handleDelete = async (r: Realisation) => {
    if (!confirm(`Supprimer "${r.title}" ?`)) return;
    if (r.image_url) await deleteImage(r.image_url);
    await supabase.from('realisations').delete().eq('id', r.id);
    showToast('🗑️ Supprimé');
    await fetchItems();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      {/* Toast */}
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
          <h1 className="text-base font-extrabold text-[#0F0F0F]">Réalisations</h1>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#FF4D29] text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-[#FF4D29]/20"
        >
          <i className="fas fa-plus text-xs"></i> Ajouter
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="fas fa-spinner animate-spin text-[#FF4D29] text-2xl"></i>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <i className="fas fa-briefcase text-4xl mb-4 block"></i>
            <p>Aucune réalisation. Ajoutez-en une !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {r.image_url && (
                  <div className="h-40 bg-[#F4F4F5] overflow-hidden">
                    <img src={r.image_url} alt={r.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-extrabold text-[#0F0F0F] text-base">{r.title}</h3>
                    {r.featured && (
                      <span className="px-2 py-0.5 bg-orange-50 text-[#FF4D29] text-xs font-bold rounded-full ml-2 shrink-0">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3 flex-1 line-clamp-2">{r.description}</p>
                  {r.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {r.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-100">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => openEdit(r)}
                      className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <i className="fas fa-pen text-xs"></i> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(r)}
                      className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-500 text-sm font-semibold rounded-xl transition-all"
                    >
                      <i className="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Modal Formulaire ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="font-extrabold text-[#0F0F0F]">
                {editId ? 'Modifier la réalisation' : 'Nouvelle réalisation'}
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] focus:ring-1 focus:ring-[#FF4D29]"
                  placeholder="Dashboard Analytics SaaS"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug (URL) *</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] font-mono"
                />
              </div>

              {/* Description courte */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description courte *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  required rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] resize-none"
                />
              </div>

              {/* Description longue */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description longue</label>
                <textarea
                  value={form.long_description ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, long_description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29] resize-none"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image</label>
                {form.image_url && (
                  <div className="mb-2 h-32 rounded-xl overflow-hidden bg-gray-50">
                    <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? 'border-[#FF4D29] bg-orange-50' : 'border-gray-200 hover:border-[#FF4D29]'}`}>
                  <i className={`fas ${uploading ? 'fa-spinner animate-spin text-[#FF4D29]' : 'fa-upload text-gray-400'}`}></i>
                  <span className="text-sm text-gray-500">{uploading ? 'Upload en cours…' : 'Choisir une image'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tags (séparés par virgule)</label>
                <input
                  value={form.tags.join(', ')}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]"
                  placeholder="Next.js, Supabase, TypeScript"
                />
              </div>

              {/* Lien + Ordre + Featured */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lien projet</label>
                  <input
                    value={form.link ?? ''}
                    onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]"
                    placeholder="https://…"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ordre d&apos;affichage</label>
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF4D29]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-[#FF4D29]' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5' : ''}`}></span>
                </div>
                <span className="text-sm font-semibold text-gray-700">Afficher sur la page d&apos;accueil (featured)</span>
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
