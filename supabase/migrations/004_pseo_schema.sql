-- ============================================================
-- Migration 004 : Tables PSEO (Programmatic SEO)
-- pseo_cities, pseo_sectors, pseo_pages
-- ============================================================

-- ─────────────────────────────────────────
-- 1. TABLE : pseo_cities
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pseo_cities (
  id              SERIAL PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  name_fr         TEXT NOT NULL,
  name_en         TEXT NOT NULL,
  region          TEXT,
  population      INTEGER,
  description_fr  TEXT,
  description_en  TEXT,
  lat             DOUBLE PRECISION,
  lng             DOUBLE PRECISION,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pseo_cities_slug ON pseo_cities(slug);

-- ─────────────────────────────────────────
-- 2. TABLE : pseo_sectors
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pseo_sectors (
  id              SERIAL PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  name_fr         TEXT NOT NULL,
  name_en         TEXT NOT NULL,
  icon            TEXT,
  description_fr  TEXT,
  description_en  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pseo_sectors_slug ON pseo_sectors(slug);

-- ─────────────────────────────────────────
-- 3. TABLE : pseo_pages
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pseo_pages (
  id                  SERIAL PRIMARY KEY,
  city_id             INTEGER NOT NULL REFERENCES pseo_cities(id) ON DELETE CASCADE,
  service_slug        TEXT,                  -- NULL = pas de service
  sector_id           INTEGER REFERENCES pseo_sectors(id) ON DELETE CASCADE,  -- NULL = pas de secteur
  title_fr            TEXT NOT NULL,
  title_en            TEXT NOT NULL,
  meta_title_fr       TEXT,
  meta_title_en       TEXT,
  meta_description_fr TEXT,
  meta_description_en TEXT,
  content_fr          TEXT,
  content_en          TEXT,
  faq_fr              JSONB DEFAULT '[]'::jsonb,
  faq_en              JSONB DEFAULT '[]'::jsonb,
  published           BOOLEAN DEFAULT false,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes PSEO courantes
CREATE INDEX IF NOT EXISTS idx_pseo_pages_city        ON pseo_pages(city_id);
CREATE INDEX IF NOT EXISTS idx_pseo_pages_service     ON pseo_pages(service_slug);
CREATE INDEX IF NOT EXISTS idx_pseo_pages_sector      ON pseo_pages(sector_id);
CREATE INDEX IF NOT EXISTS idx_pseo_pages_published   ON pseo_pages(published);

-- Contrainte d'unicité : une seule page par combinaison city + service + sector
CREATE UNIQUE INDEX IF NOT EXISTS idx_pseo_pages_unique_combo
  ON pseo_pages(city_id, COALESCE(service_slug, ''), COALESCE(sector_id, 0));

-- Trigger updated_at automatique
CREATE TRIGGER pseo_pages_updated_at
  BEFORE UPDATE ON pseo_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────
-- 4. RLS
-- ─────────────────────────────────────────
ALTER TABLE pseo_cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pseo_cities_public_read" ON pseo_cities FOR SELECT USING (true);
CREATE POLICY "pseo_cities_auth_write" ON pseo_cities FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE pseo_sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pseo_sectors_public_read" ON pseo_sectors FOR SELECT USING (true);
CREATE POLICY "pseo_sectors_auth_write" ON pseo_sectors FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE pseo_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pseo_pages_public_read" ON pseo_pages FOR SELECT USING (published = true);
CREATE POLICY "pseo_pages_auth_all" ON pseo_pages FOR ALL USING (auth.role() = 'authenticated');
