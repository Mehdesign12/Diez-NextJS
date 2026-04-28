-- ============================================================
-- Business Mapping — Cartographie des structures
-- ============================================================

CREATE TABLE IF NOT EXISTS business_entities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'company',
  -- type: 'person' | 'holding' | 'company' | 'sci' | 'association' | 'other'
  owner       TEXT NOT NULL DEFAULT 'diezagency',
  -- owner: 'diezagency' | 'mehdi' | 'both'
  status      TEXT NOT NULL DEFAULT 'active',
  -- status: 'active' | 'inactive' | 'in_development'
  description TEXT,
  website     TEXT,
  sector      TEXT,
  employees   INTEGER,
  revenue_est TEXT,
  color       TEXT,
  size        INTEGER DEFAULT 20,
  -- position in the graph (persisted so layout is stable)
  pos_x       FLOAT,
  pos_y       FLOAT,
  is_root     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_edges (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id    UUID NOT NULL REFERENCES business_entities(id) ON DELETE CASCADE,
  target_id    UUID NOT NULL REFERENCES business_entities(id) ON DELETE CASCADE,
  label        TEXT,
  strength     FLOAT DEFAULT 1.0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE business_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_edges     ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read/write
CREATE POLICY "auth_all_entities" ON business_entities
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "auth_all_edges" ON business_edges
  FOR ALL USING (auth.role() = 'authenticated');

-- ── Seed: root nodes ─────────────────────────────────────────
INSERT INTO business_entities (id, name, type, owner, status, description, color, size, is_root, pos_x, pos_y)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Diez Agency', 'company', 'diezagency', 'active', 'Agence digitale — design, dev, stratégie', '#FF4D29', 40, TRUE, 300, 300),
  ('00000000-0000-0000-0000-000000000002', 'Mehdi Hajji', 'person', 'mehdi', 'active', 'Fondateur & Directeur', '#1a1a2e', 36, TRUE, 700, 300)
ON CONFLICT (id) DO NOTHING;
