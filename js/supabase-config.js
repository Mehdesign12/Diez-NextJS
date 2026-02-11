/**
 * Diez Agency - Supabase Configuration
 */

const SUPABASE_URL = 'https://tfisxtkfiowogmthshqg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmaXN4dGtmaW93b2dtdGhzaHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzIwMTksImV4cCI6MjA4NjQwODAxOX0._moBp0G0rxn7pCb6ZOXTKi_WJsF-JNE00SoUYOxcSbk';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other scripts
window.supabaseClient = supabase;
window.SUPABASE_URL = SUPABASE_URL;
