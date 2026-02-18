// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tfisxtkfiowogmthshqg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmaXN4dGtmaW93b2dtdGhzaHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzIwMTksImV4cCI6MjA4NjQwODAxOX0._moBp0G0rxn7pCb6ZOXTKi_WJsF-JNE00SoUYOxcSbk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Realisation {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  client: string;
  annee: string;
  technologies: string[];
  images: string[];
  videos: string[];
  lien: string;
  couleur_fond: string;
  couleur_texte: string;
  icone: string;
  afficher_accueil: boolean;
  ordre: number;
}

export function normalizeRealisation(r: Realisation) {
  return {
    id: r.id,
    nom: r.nom,
    description: r.description,
    categorie: r.categorie,
    client: r.client,
    annee: r.annee,
    technologies: r.technologies || [],
    images: r.images || [],
    videos: r.videos || [],
    lien: r.lien,
    couleurFond: r.couleur_fond || '#1f2937',
    couleurTexte: r.couleur_texte || 'white',
    icone: r.icone || 'fa-chart-line',
    afficherAccueil: r.afficher_accueil,
    ordre: r.ordre,
  };
}

export async function getRealisationsAccueil(): Promise<Realisation[]> {
  try {
    const { data, error } = await supabase
      .from('realisations')
      .select('*')
      .eq('afficher_accueil', true)
      .order('ordre', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function getAllRealisations(): Promise<Realisation[]> {
  try {
    const { data, error } = await supabase
      .from('realisations')
      .select('*')
      .order('ordre', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}
