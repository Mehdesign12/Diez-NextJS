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
