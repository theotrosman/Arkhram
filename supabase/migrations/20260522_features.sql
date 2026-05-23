-- ============================================================
-- ARKHRAM — Feature migrations (run once in Supabase SQL editor)
-- ============================================================

-- ── 1. CHAT SESSIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_sessions (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL DEFAULT 'Nueva conversación',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_sessions_owner" ON chat_sessions
  FOR ALL USING (auth.uid() = user_id);

-- ── 2. CHAT MESSAGES ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id  UUID        NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT        NOT NULL CHECK (role IN ('user','assistant')),
  content     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_messages_owner" ON chat_messages
  FOR ALL USING (auth.uid() = user_id);

-- ── 3. USER SKILLS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_skills (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT        NOT NULL,
  prompt     TEXT        NOT NULL,
  icon       TEXT        DEFAULT '⚡',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_skills_owner" ON user_skills
  FOR ALL USING (auth.uid() = user_id);

-- ── 4. USER INTEGRATIONS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_integrations (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service      TEXT        NOT NULL,
  display_name TEXT,
  status       TEXT        DEFAULT 'active' CHECK (status IN ('active','inactive','error')),
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, service)
);

ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_integrations_owner" ON user_integrations
  FOR ALL USING (auth.uid() = user_id);

-- ── 5. AUTOMATION TEMPLATES ──────────────────────────────────
CREATE TABLE IF NOT EXISTS automation_templates (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  category     TEXT        NOT NULL,
  trigger_type TEXT        NOT NULL,
  config       JSONB       NOT NULL,
  tags         TEXT[]      DEFAULT '{}',
  difficulty   TEXT        DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
  use_count    INTEGER     DEFAULT 0,
  is_featured  BOOLEAN     DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE automation_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "templates_public_read" ON automation_templates
  FOR SELECT USING (TRUE);

-- ── 6. INDEX for performance ──────────────────────────────────
CREATE INDEX IF NOT EXISTS chat_sessions_user_idx   ON chat_sessions(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS chat_messages_session_idx ON chat_messages(session_id, created_at ASC);
CREATE INDEX IF NOT EXISTS user_skills_user_idx      ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS templates_category_idx    ON automation_templates(category);
