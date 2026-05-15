-- ============================================================
-- UCMAS Summer Camp 2026 — Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===== LEADS TABLE =====
CREATE TABLE IF NOT EXISTS leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_name    TEXT NOT NULL,
  phone         TEXT NOT NULL,
  birth_year    INT NOT NULL,
  session       TEXT NOT NULL,
  address       TEXT DEFAULT '',
  notes         TEXT DEFAULT '',
  source        TEXT DEFAULT 'Landing - Trại hè 2026',
  utm           JSONB,
  user_agent    TEXT DEFAULT '',
  ip            TEXT DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'NEW'
                  CHECK (status IN ('NEW','CALLED','PENDING','CLOSED','LOST')),
  assigned_to   UUID,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS leads_phone_idx       ON leads(phone);
CREATE INDEX IF NOT EXISTS leads_status_idx      ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx  ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_session_idx     ON leads(session);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ===== FOLLOW-UPS TABLE =====
CREATE TABLE IF NOT EXISTS follow_ups (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id     UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id     TEXT NOT NULL DEFAULT '',
  type        TEXT NOT NULL DEFAULT 'note'
                CHECK (type IN ('call','zalo','fb','note')),
  note        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS follow_ups_lead_id_idx ON follow_ups(lead_id);

-- ===== SETTINGS TABLE (optional CMS) =====
CREATE TABLE IF NOT EXISTS settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  group_name  TEXT NOT NULL DEFAULT 'general',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value, group_name) VALUES
  ('contact.hotline',  '0967.868.623',          'contact'),
  ('contact.email',    'admin@ucmasvietnam.com', 'contact'),
  ('contact.address',  'Số 37 ngõ 80 Trung Kính, Yên Hòa, Hà Nội', 'contact'),
  ('promo.deadline',   '2026-03-15',             'promo'),
  ('promo.totalSeats', '50',                     'promo'),
  ('promo.discount',   '25',                     'promo')
ON CONFLICT (key) DO NOTHING;

-- ===== ROW LEVEL SECURITY =====
-- Enable RLS on all tables
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups   ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings     ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service_role full access (used by Next.js backend)
-- The service role key bypasses RLS by default.

-- Policy: Deny direct anon access to leads (only service role can insert/read)
CREATE POLICY "deny_anon_leads" ON leads
  FOR ALL TO anon USING (false);

CREATE POLICY "deny_anon_follow_ups" ON follow_ups
  FOR ALL TO anon USING (false);

-- Settings are readable publicly (for landing page content)
CREATE POLICY "settings_public_read" ON settings
  FOR SELECT TO anon USING (true);

-- ============================================================
-- SAMPLE DATA (optional — remove in production)
-- ============================================================
-- INSERT INTO leads (child_name, phone, birth_year, session, status) VALUES
--   ('Nguyễn Minh Anh', '0987654321', 2015, 'Kỳ 1 - Tháng 6', 'NEW'),
--   ('Trần Bảo Nam', '0976543210', 2014, 'Cả 2 kỳ', 'CALLED'),
--   ('Lê Khánh An', '0965432109', 2016, 'Kỳ 2 - Tháng 7', 'CLOSED');
