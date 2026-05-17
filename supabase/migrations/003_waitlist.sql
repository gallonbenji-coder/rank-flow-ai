-- Waitlist table
-- Run this in Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

CREATE TABLE IF NOT EXISTS waitlist (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast email lookup (unique constraint already creates one, but explicit)
CREATE INDEX IF NOT EXISTS idx_waitlist_email
  ON waitlist (email);

CREATE INDEX IF NOT EXISTS idx_waitlist_created_at
  ON waitlist (created_at DESC);

-- Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public signup — server validates via service role)
-- No SELECT policy for anon: count is served server-side via service_role key
