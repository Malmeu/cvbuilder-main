-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Users can view own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can insert own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can update own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can delete own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Enable read access for all users" ON user_cvs;

-- Activer RLS
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;

-- Créer une politique simple pour la lecture
CREATE POLICY "Authenticated users can read all CVs"
ON user_cvs
FOR SELECT
USING (auth.role() = 'authenticated');

-- Créer une politique pour l'insertion
CREATE POLICY "Users can insert their own CVs"
ON user_cvs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Créer une politique pour la mise à jour
CREATE POLICY "Users can update their own CVs"
ON user_cvs
FOR UPDATE
USING (auth.uid() = user_id);

-- Créer une politique pour la suppression
CREATE POLICY "Users can delete their own CVs"
ON user_cvs
FOR DELETE
USING (auth.uid() = user_id);

-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'user_cvs';
