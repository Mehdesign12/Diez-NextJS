-- ============================================================
-- Migration: Job Opportunities Hub + Preferences
-- Freelance opportunity aggregation with AI matching
-- ============================================================

-- Table principale des opportunites freelance
CREATE TABLE job_opportunities (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,                -- 'upwork', 'malt', 'freelancer', 'linkedin', 'indeed', 'manual'
  source_url TEXT,                     -- lien direct vers l'offre
  source_id TEXT,                      -- ID unique sur la plateforme source
  title TEXT NOT NULL,
  description TEXT,
  client_name TEXT,
  budget_min NUMERIC,
  budget_max NUMERIC,
  budget_type TEXT,                    -- 'fixed', 'hourly'
  currency TEXT DEFAULT 'USD',
  skills TEXT[] DEFAULT '{}',          -- ['product-management', 'agile', 'scrum']
  duration TEXT,                       -- 'less-than-1-month', '1-3-months', '3-6-months', '6-months-plus'
  experience_level TEXT,               -- 'entry', 'intermediate', 'expert'
  location TEXT,                       -- 'remote', 'paris', etc.
  match_score INTEGER DEFAULT 0,      -- score IA de pertinence (0-100)
  match_reason TEXT,                   -- justification IA du score
  status TEXT DEFAULT 'new'
    CHECK (status IN ('new','interested','applied','interview','rejected','expired')),
  notes TEXT,
  metadata JSONB DEFAULT '{}',         -- donnees brutes supplementaires de la source
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source, source_id)            -- eviter les doublons par source
);

-- Table des preferences / profil utilisateur pour le matching IA
CREATE TABLE job_preferences (
  id SERIAL PRIMARY KEY,
  skills TEXT[] DEFAULT '{}',          -- competences recherchees
  keywords TEXT[] DEFAULT '{}',        -- mots-cles positifs
  exclude_keywords TEXT[] DEFAULT '{}',-- mots-cles a exclure
  min_budget NUMERIC,
  preferred_budget_type TEXT,          -- 'fixed', 'hourly', 'both'
  preferred_duration TEXT[] DEFAULT '{}',
  preferred_experience TEXT[] DEFAULT '{}',
  preferred_sources TEXT[] DEFAULT '{}',
  bio TEXT,                            -- description du profil/CV pour le matching IA
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Index pour les requetes frequentes ──
CREATE INDEX idx_job_opp_status ON job_opportunities(status);
CREATE INDEX idx_job_opp_source ON job_opportunities(source);
CREATE INDEX idx_job_opp_score ON job_opportunities(match_score DESC);
CREATE INDEX idx_job_opp_created ON job_opportunities(created_at DESC);
CREATE INDEX idx_job_opp_dedup ON job_opportunities(source, source_id);

-- ── Row Level Security ──
ALTER TABLE job_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for authenticated" ON job_opportunities
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON job_preferences
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Trigger updated_at automatique ──
CREATE TRIGGER job_opportunities_updated_at
  BEFORE UPDATE ON job_opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER job_preferences_updated_at
  BEFORE UPDATE ON job_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Preferences par defaut (Product Manager) ──
INSERT INTO job_preferences (
  skills, keywords, exclude_keywords,
  min_budget, preferred_budget_type, preferred_sources, bio
) VALUES (
  ARRAY['product-management', 'agile', 'scrum', 'roadmap', 'user-research', 'data-analysis'],
  ARRAY['product manager', 'product owner', 'chef de produit', 'PM', 'scrum master'],
  ARRAY['senior developer', 'full-stack developer', 'graphic designer'],
  500,
  'both',
  ARRAY['upwork', 'freelancer', 'malt', 'linkedin', 'indeed'],
  'Product Manager freelance avec experience en gestion de produit digital, methodologies agiles, et strategie produit.'
);
