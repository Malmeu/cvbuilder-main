-- Vérifier si RLS est activé
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'user_cvs';

-- Activer RLS si ce n'est pas déjà fait
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes pour repartir de zéro
DROP POLICY IF EXISTS "Users can view own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can insert own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can update own CVs" ON user_cvs;
DROP POLICY IF EXISTS "Users can delete own CVs" ON user_cvs;

-- Créer une politique pour permettre aux utilisateurs de voir leurs propres CVs
CREATE POLICY "Users can view own CVs" 
ON user_cvs 
FOR SELECT 
USING (auth.uid() = user_id);

-- Créer une politique pour permettre aux utilisateurs d'insérer leurs propres CVs
CREATE POLICY "Users can insert own CVs" 
ON user_cvs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Créer une politique pour permettre aux utilisateurs de mettre à jour leurs propres CVs
CREATE POLICY "Users can update own CVs" 
ON user_cvs 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Créer une politique pour permettre aux utilisateurs de supprimer leurs propres CVs
CREATE POLICY "Users can delete own CVs" 
ON user_cvs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Vérifier les politiques après création
SELECT * FROM pg_policies WHERE tablename = 'user_cvs';
