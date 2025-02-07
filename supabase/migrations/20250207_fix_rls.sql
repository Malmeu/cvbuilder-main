-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Users can view own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can create own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can update own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can delete own CVs" ON user_cvs;

-- Activer RLS
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;

-- Créer les nouvelles politiques
CREATE POLICY "Users can view own CVs"
ON user_cvs FOR SELECT
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can create own CVs"
ON user_cvs FOR INSERT
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can update own CVs"
ON user_cvs FOR UPDATE
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can delete own CVs"
ON user_cvs FOR DELETE
USING (
    auth.uid() = user_id
);

-- Vérifier les politiques
SELECT *
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'user_cvs';
