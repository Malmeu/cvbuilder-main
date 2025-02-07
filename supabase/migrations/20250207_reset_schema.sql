-- Sauvegarder les données existantes
CREATE TABLE IF NOT EXISTS user_cvs_backup_20250207 AS 
SELECT * FROM user_cvs;

-- Supprimer les tables existantes (sauf articles)
DROP TABLE IF EXISTS user_cvs CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Créer la table des profils utilisateurs
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Créer la table des CVs
CREATE TABLE user_cvs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'classic',
    data JSONB NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_user_cvs_updated_at
    BEFORE UPDATE ON user_cvs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX idx_user_cvs_user_id ON user_cvs(user_id);
CREATE INDEX idx_user_cvs_type ON user_cvs(type);

-- Fonction pour gérer le CV principal
CREATE OR REPLACE FUNCTION manage_primary_cv()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_primary THEN
        UPDATE user_cvs
        SET is_primary = false
        WHERE user_id = NEW.user_id
        AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER manage_primary_cv_trigger
    BEFORE INSERT OR UPDATE OF is_primary ON user_cvs
    FOR EACH ROW
    WHEN (NEW.is_primary = true)
    EXECUTE FUNCTION manage_primary_cv();
