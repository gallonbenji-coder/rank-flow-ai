-- AI Visibility Checks table
-- Run this in Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

CREATE TABLE IF NOT EXISTS ai_visibility_checks (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brand      TEXT        NOT NULL,
  service    TEXT,
  score      INTEGER     NOT NULL,
  result     JSONB       NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast usage count per user per month
CREATE INDEX IF NOT EXISTS idx_ai_visibility_checks_user_created
  ON ai_visibility_checks (user_id, created_at DESC);

-- Row Level Security
ALTER TABLE ai_visibility_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own checks"
  ON ai_visibility_checks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own checks"
  ON ai_visibility_checks FOR INSERT
  WITH CHECK (auth.uid() = user_id);
