-- ============================================================
-- Migration 001 : Tables principales Diez Agency
-- ============================================================

-- ─────────────────────────────────────────
-- 1. TABLE : realisations
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS realisations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT NOT NULL,
  long_description TEXT,
  image_url     TEXT,
  tags          TEXT[]          DEFAULT '{}',
  link          TEXT,
  featured      BOOLEAN         DEFAULT false,
  display_order INTEGER         DEFAULT 0,
  created_at    TIMESTAMPTZ     DEFAULT NOW(),
  updated_at    TIMESTAMPTZ     DEFAULT NOW()
);

-- Index pour les requêtes courantes
CREATE INDEX IF NOT EXISTS idx_realisations_slug     ON realisations(slug);
CREATE INDEX IF NOT EXISTS idx_realisations_featured ON realisations(featured);
CREATE INDEX IF NOT EXISTS idx_realisations_order    ON realisations(display_order);

-- ─────────────────────────────────────────
-- 2. TABLE : articles
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  excerpt       TEXT NOT NULL,
  content       TEXT NOT NULL,        -- Markdown
  cover_url     TEXT,
  category      TEXT NOT NULL DEFAULT 'Général',
  published     BOOLEAN         DEFAULT false,
  created_at    TIMESTAMPTZ     DEFAULT NOW(),
  updated_at    TIMESTAMPTZ     DEFAULT NOW()
);

-- Index pour les requêtes courantes
CREATE INDEX IF NOT EXISTS idx_articles_slug      ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_category  ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created   ON articles(created_at DESC);

-- ─────────────────────────────────────────
-- 3. FONCTION : updated_at automatique
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER realisations_updated_at
  BEFORE UPDATE ON realisations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────
-- 4. RLS (Row Level Security)
-- ─────────────────────────────────────────

-- Realisations : lecture publique, écriture auth uniquement
ALTER TABLE realisations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "realisations_public_read"
  ON realisations FOR SELECT
  USING (true);

CREATE POLICY "realisations_auth_write"
  ON realisations FOR ALL
  USING (auth.role() = 'authenticated');

-- Articles : lecture publique si published=true, écriture auth uniquement
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "articles_public_read"
  ON articles FOR SELECT
  USING (published = true);

CREATE POLICY "articles_auth_all"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');
