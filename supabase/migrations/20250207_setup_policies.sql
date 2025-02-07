-- Activer RLS sur toutes les tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;

-- Politiques pour user_profiles
CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON user_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Politiques pour user_cvs
CREATE POLICY "Users can view own CVs"
ON user_cvs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own CVs"
ON user_cvs FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
ON user_cvs FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
ON user_cvs FOR DELETE
USING (auth.uid() = user_id);
