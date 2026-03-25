-- ============================================================
-- QG Multi-Projets — Tables pour la gestion des sous-projets
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- Table des projets enregistrés dans le QG
CREATE TABLE IF NOT EXISTS projects (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  url text,
  api_key text NOT NULL UNIQUE,
  description text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Table des contacts reçus depuis les sous-projets
CREATE TABLE IF NOT EXISTS project_contacts (
  id serial PRIMARY KEY,
  project_id integer NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  budget text,
  interests text[],
  message text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_project_contacts_project_id ON project_contacts(project_id);
CREATE INDEX IF NOT EXISTS idx_project_contacts_status ON project_contacts(status);
CREATE INDEX IF NOT EXISTS idx_projects_api_key ON projects(api_key);

-- RLS : autoriser les insertions anonymes sur project_contacts (via API key validation dans le code)
ALTER TABLE project_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous insert on project_contacts"
  ON project_contacts FOR INSERT
  WITH CHECK (true);

-- RLS : lecture uniquement pour les utilisateurs authentifiés
CREATE POLICY "Allow authenticated read on project_contacts"
  ON project_contacts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on project_contacts"
  ON project_contacts FOR UPDATE
  USING (auth.role() = 'authenticated');

-- RLS pour projects : lecture/écriture pour authentifiés uniquement
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated all on projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Permettre la lecture de l'api_key pour la validation (via REST API avec anon key)
CREATE POLICY "Allow anon read api_key on projects"
  ON projects FOR SELECT
  USING (true);
