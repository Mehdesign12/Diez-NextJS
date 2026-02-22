// ============================================================
// Client Supabase + helpers — Diez Agency
// ============================================================

import { createClient } from '@supabase/supabase-js';
import type { Realisation, Article, Contact, ContactInsert } from './types';

// Fallback hardcodé pour garantir le fonctionnement même si les env vars
// ne sont pas injectées au build time (Vercel cold build sans cache)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://qegewzvyjiijozioqsgq.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ2V3enZ5amlpam96aW9xc2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODExNTMsImV4cCI6MjA3OTc1NzE1M30.2Q84Q6aTfU--ShAa4VzRgEmzzkhdTFb6TZD73mqaar0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─────────────────────────────────────────
// RÉALISATIONS
// ─────────────────────────────────────────

export async function getRealisations(): Promise<Realisation[]> {
  const { data, error } = await supabase
    .from('realisations')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getRealisationsFeatured(): Promise<Realisation[]> {
  const { data, error } = await supabase
    .from('realisations')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getRealisationBySlug(slug: string): Promise<Realisation | null> {
  const { data, error } = await supabase
    .from('realisations')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

// ─────────────────────────────────────────
// ARTICLES
// ─────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('published', true);
  if (error) { console.error(error); return []; }
  return (data ?? []).map((a) => a.slug);
}

// ─────────────────────────────────────────
// STORAGE (upload images)
// ─────────────────────────────────────────

export async function uploadImage(file: File, folder: 'realisations' | 'articles'): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(filename, file, { upsert: true });

  if (error) { console.error(error); return null; }

  const { data } = supabase.storage.from('images').getPublicUrl(filename);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  // Extraire le path depuis l'URL publique
  const path = url.split('/storage/v1/object/public/images/')[1];
  if (!path) return;
  await supabase.storage.from('images').remove([path]);
}

// ─────────────────────────────────────────
// AUTH ADMIN
// ─────────────────────────────────────────

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ─────────────────────────────────────────
// CONTACTS
// ─────────────────────────────────────────

export async function saveContact(
  data: ContactInsert
): Promise<{ error: Error | null }> {
  // Utilise fetch direct vers l'API REST Supabase pour contourner
  // les problèmes de RLS avec le client JS côté browser
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('saveContact error:', err);
      return { error: new Error(err) };
    }
    return { error: null };
  } catch (e) {
    console.error('saveContact fetch error:', e);
    return { error: e as Error };
  }
}

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function updateContactStatus(
  id: number,
  status: Contact['status']
): Promise<void> {
  await supabase.from('contacts').update({ status }).eq('id', id);
}
