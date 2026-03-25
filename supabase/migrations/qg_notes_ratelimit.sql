-- ============================================================
-- QG — Notes internes sur les leads + rate limiting
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- Table des notes internes sur les leads
CREATE TABLE IF NOT EXISTS project_contact_notes (
  id serial PRIMARY KEY,
  contact_id integer NOT NULL REFERENCES project_contacts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_contact_notes_contact_id ON project_contact_notes(contact_id);

-- RLS
ALTER TABLE project_contact_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated all on project_contact_notes"
  ON project_contact_notes FOR ALL
  USING (auth.role() = 'authenticated');

-- Table de rate limiting
CREATE TABLE IF NOT EXISTS api_rate_limits (
  id serial PRIMARY KEY,
  api_key text NOT NULL,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  request_count integer NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_api_rate_limits_key_window ON api_rate_limits(api_key, window_start);

-- RLS : permettre insertion/lecture anonyme (le rate limiter tourne côté API route)
ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on api_rate_limits"
  ON api_rate_limits FOR ALL
  USING (true);
