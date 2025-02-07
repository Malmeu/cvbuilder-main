-- Désactiver temporairement RLS pour le débogage
ALTER TABLE user_cvs DISABLE ROW LEVEL SECURITY;

-- Vérifier les données existantes
SELECT * FROM user_cvs;

-- Vérifier l'utilisateur actuel
SELECT auth.uid();

-- Vérifier les politiques existantes
SELECT * FROM pg_policies WHERE tablename = 'user_cvs';

-- Créer une politique plus permissive
DROP POLICY IF EXISTS "Enable read access for all users" ON user_cvs;
CREATE POLICY "Enable read access for all users" 
ON user_cvs 
FOR SELECT 
USING (true);

-- Réactiver RLS
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;
