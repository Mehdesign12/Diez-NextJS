// ============================================================
// Types TypeScript partagés — Diez Agency
// ============================================================

export interface Realisation {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  image_url: string | null;
  tags: string[];
  link: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  cover_url: string | null;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Formulaires (sans id/timestamps)
export type RealisationForm = Omit<Realisation, 'id' | 'created_at' | 'updated_at'>;
export type ArticleForm = Omit<Article, 'id' | 'created_at' | 'updated_at'>;

export interface Contact {
  id: number;
  first_name: string;
  need: string;
  description: string;
  budget: string;
  timeline: string;
  email: string;
  phone: string | null;
  lang: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export type ContactInsert = Omit<Contact, 'id' | 'status' | 'created_at'>;

export interface Application {
  id: number;
  first_name: string;
  last_name: string;
  motivation: string;
  cv_url: string;
  email: string;
  phone: string | null;
  lang: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export type ApplicationInsert = Omit<Application, 'id' | 'status' | 'created_at'>;

// ============================================================
// PSEO — Programmatic SEO
// ============================================================

export interface PseoCity {
  id: number;
  slug: string;
  name_fr: string;
  name_en: string;
  region: string | null;
  population: number | null;
  description_fr: string | null;
  description_en: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
}

export interface PseoSector {
  id: number;
  slug: string;
  name_fr: string;
  name_en: string;
  icon: string | null;
  description_fr: string | null;
  description_en: string | null;
  created_at: string;
}

export interface PseoFaqItem {
  question: string;
  answer: string;
}

export interface PseoPage {
  id: number;
  city_id: number;
  service_slug: string | null;
  sector_id: number | null;
  title_fr: string;
  title_en: string;
  meta_title_fr: string | null;
  meta_title_en: string | null;
  meta_description_fr: string | null;
  meta_description_en: string | null;
  content_fr: string | null;
  content_en: string | null;
  faq_fr: PseoFaqItem[];
  faq_en: PseoFaqItem[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

/** PseoPage with joined city and sector data (used in page rendering) */
export interface PseoPageWithRelations extends PseoPage {
  city: PseoCity;
  sector: PseoSector | null;
}

// ============================================================
// QG — Multi-Projets
// ============================================================

export interface Project {
  id: number;
  name: string;
  slug: string;
  url: string | null;
  api_key: string;
  description: string | null;
  status: 'active' | 'paused' | 'archived';
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

export interface ProjectContact {
  id: number;
  project_id: number;
  name: string;
  email: string;
  phone: string | null;
  budget: string | null;
  interests: string[] | null;
  message: string | null;
  status: 'new' | 'read' | 'replied';
  metadata: Record<string, unknown>;
  created_at: string;
}

export type ProjectContactInsert = Omit<ProjectContact, 'id' | 'status' | 'created_at'>;
