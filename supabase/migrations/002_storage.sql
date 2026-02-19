-- ============================================================
-- Migration 002 : Supabase Storage — bucket "images"
-- ============================================================

-- Créer le bucket public "images"
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- Policies Storage
-- ─────────────────────────────────────────

-- Lecture publique (tout le monde peut voir les images)
CREATE POLICY "images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- Upload : authentifiés uniquement
CREATE POLICY "images_auth_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );

-- Suppression : authentifiés uniquement
CREATE POLICY "images_auth_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );

-- Mise à jour : authentifiés uniquement
CREATE POLICY "images_auth_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );
