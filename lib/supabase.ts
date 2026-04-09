// ============================================================
// Client Supabase + helpers — Diez Agency
// ============================================================

import { createClient } from '@supabase/supabase-js';
import type { Realisation, Article, Contact, ContactInsert, Application, ApplicationInsert, PseoCity, PseoSector, PseoPage, PseoPageWithRelations, Project, ProjectContact, ProjectContactNote, JobOpportunity, JobPreferences } from './types';

// Fallback hardcodé pour garantir le fonctionnement même si les env vars
// ne sont pas injectées au build time (Vercel cold build sans cache)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://bcwpqblpovhbgzkipqgn.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjd3BxYmxwb3ZoYmd6a2lwcWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTYxNzgsImV4cCI6MjA4OTA3MjE3OH0.5uXrIJtENQ-0xfn-BKjAfCIyow-0XIkyaGYKeaWqTTU';

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

// ─────────────────────────────────────────
// CANDIDATURES (APPLICATIONS)
// ─────────────────────────────────────────

export async function uploadCV(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const filename = `cvs/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(filename, file, { upsert: true, contentType: 'application/pdf' });

  if (error) { console.error(error); return null; }

  const { data } = supabase.storage.from('images').getPublicUrl(filename);
  return data.publicUrl;
}

export async function saveApplication(
  data: ApplicationInsert
): Promise<{ error: Error | null }> {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/applications`, {
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
      console.error('saveApplication error:', err);
      return { error: new Error(err) };
    }
    return { error: null };
  } catch (e) {
    console.error('saveApplication fetch error:', e);
    return { error: e as Error };
  }
}

export async function getApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function updateApplicationStatus(
  id: number,
  status: Application['status']
): Promise<void> {
  await supabase.from('applications').update({ status }).eq('id', id);
}

// ─────────────────────────────────────────
// PSEO — Programmatic SEO
// ─────────────────────────────────────────

/** Get all cities */
export async function getPseoCities(): Promise<PseoCity[]> {
  const { data, error } = await supabase
    .from('pseo_cities')
    .select('*')
    .order('population', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

/** Get a single city by slug */
export async function getPseoCityBySlug(slug: string): Promise<PseoCity | null> {
  const { data, error } = await supabase
    .from('pseo_cities')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

/** Get all city slugs (for generateStaticParams) */
export async function getAllPseoCitySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('pseo_cities')
    .select('slug');
  if (error) { console.error(error); return []; }
  return (data ?? []).map((c) => c.slug);
}

/** Get all sectors */
export async function getPseoSectors(): Promise<PseoSector[]> {
  const { data, error } = await supabase
    .from('pseo_sectors')
    .select('*')
    .order('name_fr', { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

/** Get a single sector by slug */
export async function getPseoSectorBySlug(slug: string): Promise<PseoSector | null> {
  const { data, error } = await supabase
    .from('pseo_sectors')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

/** Get a PSEO page for a city (no service, no sector) */
export async function getPseoPageByCity(cityId: number): Promise<PseoPage | null> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('city_id', cityId)
    .is('service_slug', null)
    .is('sector_id', null)
    .eq('published', true)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

/** Get a PSEO page for a city + service */
export async function getPseoPageByCityAndService(
  cityId: number,
  serviceSlug: string
): Promise<PseoPage | null> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('city_id', cityId)
    .eq('service_slug', serviceSlug)
    .is('sector_id', null)
    .eq('published', true)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

/** Get a PSEO page for a city + sector */
export async function getPseoPageByCityAndSector(
  cityId: number,
  sectorId: number
): Promise<PseoPage | null> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('city_id', cityId)
    .is('service_slug', null)
    .eq('sector_id', sectorId)
    .eq('published', true)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

/** Get all published PSEO pages with relations (for sitemap) */
export async function getAllPseoPages(): Promise<PseoPageWithRelations[]> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*, city:pseo_cities(*), sector:pseo_sectors(*)')
    .eq('published', true);
  if (error) { console.error(error); return []; }
  return (data ?? []) as unknown as PseoPageWithRelations[];
}

/** Get all published PSEO pages for a given city (for internal linking) */
export async function getPseoPagesByCity(cityId: number): Promise<PseoPage[]> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('city_id', cityId)
    .eq('published', true);
  if (error) { console.error(error); return []; }
  return data ?? [];
}

/** Get all unique city+service combinations (for generateStaticParams) */
export async function getAllPseoCityServiceParams(): Promise<{ city: string; service: string }[]> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('service_slug, city:pseo_cities(slug)')
    .eq('published', true)
    .not('service_slug', 'is', null)
    .is('sector_id', null);
  if (error) { console.error(error); return []; }
  return (data ?? [])
    .filter((r: Record<string, unknown>) => r.service_slug && r.city)
    .map((r: Record<string, unknown>) => ({
      city: (r.city as { slug: string }).slug,
      service: r.service_slug as string,
    }));
}

/** Get all unique city+sector combinations (for generateStaticParams) */
export async function getAllPseoCitySectorParams(): Promise<{ city: string; sector: string }[]> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('sector:pseo_sectors(slug), city:pseo_cities(slug)')
    .eq('published', true)
    .is('service_slug', null)
    .not('sector_id', 'is', null);
  if (error) { console.error(error); return []; }
  return (data ?? [])
    .filter((r: Record<string, unknown>) => r.sector && r.city)
    .map((r: Record<string, unknown>) => ({
      city: (r.city as { slug: string }).slug,
      sector: (r.sector as { slug: string }).slug,
    }));
}

/** Get a PSEO page for city + service + sector (triple combo) */
export async function getPseoPageByCityServiceAndSector(
  cityId: number,
  serviceSlug: string,
  sectorId: number
): Promise<PseoPage | null> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('city_id', cityId)
    .eq('service_slug', serviceSlug)
    .eq('sector_id', sectorId)
    .eq('published', true)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

/** Get all unique city+service+sector combinations (for generateStaticParams) */
export async function getAllPseoCityServiceSectorParams(): Promise<{ city: string; service: string; sector: string }[]> {
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('service_slug, city:pseo_cities(slug), sector:pseo_sectors(slug)')
    .eq('published', true)
    .not('service_slug', 'is', null)
    .not('sector_id', 'is', null);
  if (error) { console.error(error); return []; }
  return (data ?? [])
    .filter((r: Record<string, unknown>) => r.service_slug && r.city && r.sector)
    .map((r: Record<string, unknown>) => ({
      city: (r.city as { slug: string }).slug,
      service: r.service_slug as string,
      sector: (r.sector as { slug: string }).slug,
    }));
}

/** Get all sector slugs (for generateStaticParams) */
export async function getAllPseoSectorSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('pseo_sectors')
    .select('slug');
  if (error) { console.error(error); return []; }
  return (data ?? []).map((s) => s.slug);
}

// ─────────────────────────────────────────
// QG — PROJETS
// ─────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getProjectByApiKey(apiKey: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('api_key', apiKey)
    .eq('status', 'active')
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

// ─────────────────────────────────────────
// QG — CONTACTS PROJETS
// ─────────────────────────────────────────

export async function getProjectContacts(projectId?: number): Promise<ProjectContact[]> {
  let query = supabase
    .from('project_contacts')
    .select('*')
    .order('created_at', { ascending: false });
  if (projectId) query = query.eq('project_id', projectId);
  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function saveProjectContact(
  data: { project_id: number; name: string; email: string; phone?: string; budget?: string; interests?: string[]; message?: string; metadata?: Record<string, unknown> }
): Promise<{ error: Error | null }> {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/project_contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('saveProjectContact error:', err);
      return { error: new Error(err) };
    }
    return { error: null };
  } catch (e) {
    console.error('saveProjectContact fetch error:', e);
    return { error: e as Error };
  }
}

export async function updateProjectContactStatus(
  id: number,
  status: ProjectContact['status']
): Promise<void> {
  await supabase.from('project_contacts').update({ status }).eq('id', id);
}

// ─────────────────────────────────────────
// QG — NOTES SUR LES LEADS
// ─────────────────────────────────────────

export async function getContactNotes(contactId: number): Promise<ProjectContactNote[]> {
  const { data, error } = await supabase
    .from('project_contact_notes')
    .select('*')
    .eq('contact_id', contactId)
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function addContactNote(contactId: number, content: string): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from('project_contact_notes')
    .insert({ contact_id: contactId, content });
  if (error) { console.error(error); return { error }; }
  return { error: null };
}

// ─────────────────────────────────────────
// QG — RATE LIMITING
// ─────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per API key

export async function checkRateLimit(apiKey: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  // Count requests in current window
  const { count, error } = await supabase
    .from('api_rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('api_key', apiKey)
    .gte('window_start', windowStart);

  if (error) { console.error(error); return true; } // fail open

  if ((count ?? 0) >= RATE_LIMIT_MAX) return false; // rate limited

  // Record this request
  await supabase.from('api_rate_limits').insert({ api_key: apiKey, window_start: new Date().toISOString() });

  return true; // allowed
}

// ─────────────────────────────────────────
// OPPORTUNITES FREELANCE
// ─────────────────────────────────────────

export async function getJobOpportunities(filters?: {
  source?: string;
  status?: string;
  minScore?: number;
  search?: string;
}): Promise<JobOpportunity[]> {
  let query = supabase
    .from('job_opportunities')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.source) query = query.eq('source', filters.source);
  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.minScore) query = query.gte('match_score', filters.minScore);
  if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function saveJobOpportunity(
  data: Record<string, unknown>
): Promise<{ data: JobOpportunity | null; error: Error | null }> {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/job_opportunities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      // Handle duplicate (409 or unique violation)
      if (res.status === 409 || err.includes('duplicate') || err.includes('unique')) {
        return { data: null, error: new Error('duplicate') };
      }
      console.error('saveJobOpportunity error:', err);
      return { data: null, error: new Error(err) };
    }
    const rows = await res.json();
    return { data: Array.isArray(rows) ? rows[0] : rows, error: null };
  } catch (e) {
    console.error('saveJobOpportunity fetch error:', e);
    return { data: null, error: e as Error };
  }
}

export async function upsertJobOpportunity(
  data: Record<string, unknown>
): Promise<{ data: JobOpportunity | null; error: Error | null }> {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/job_opportunities?on_conflict=source,source_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'return=representation,resolution=merge-duplicates',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('upsertJobOpportunity error:', err);
      return { data: null, error: new Error(err) };
    }
    const rows = await res.json();
    return { data: Array.isArray(rows) ? rows[0] : rows, error: null };
  } catch (e) {
    console.error('upsertJobOpportunity fetch error:', e);
    return { data: null, error: e as Error };
  }
}

export async function updateJobOpportunityStatus(
  id: number,
  status: JobOpportunity['status']
): Promise<void> {
  await supabase.from('job_opportunities').update({ status }).eq('id', id);
}

export async function updateJobOpportunityNotes(
  id: number,
  notes: string
): Promise<void> {
  await supabase.from('job_opportunities').update({ notes }).eq('id', id);
}

export async function updateJobOpportunityScore(
  id: number,
  match_score: number,
  match_reason: string
): Promise<void> {
  await supabase.from('job_opportunities').update({ match_score, match_reason }).eq('id', id);
}

// ─────────────────────────────────────────
// PREFERENCES FREELANCE
// ─────────────────────────────────────────

export async function getJobPreferences(): Promise<JobPreferences | null> {
  const { data, error } = await supabase
    .from('job_preferences')
    .select('*')
    .order('id', { ascending: true })
    .limit(1)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function updateJobPreferences(
  id: number,
  prefs: Partial<Omit<JobPreferences, 'id' | 'updated_at'>>
): Promise<void> {
  await supabase.from('job_preferences').update(prefs).eq('id', id);
}
