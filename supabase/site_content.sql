-- ============================================================
-- UCMAS Summer Camp 2026 — Site Content CMS Table
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Table to store editable landing page content per section
CREATE TABLE IF NOT EXISTS site_content (
  section     TEXT PRIMARY KEY,
  content     JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS site_content_updated_at ON site_content;
CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public can read (landing page needs this)
CREATE POLICY "site_content_public_read" ON site_content
  FOR SELECT TO anon USING (true);

-- Service role has full access (bypasses RLS by default)
