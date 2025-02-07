-- Vérifier les politiques actuelles
SELECT * FROM pg_policies WHERE tablename = 'user_cvs';

-- Supprimer et recréer la politique d'insertion
DROP POLICY IF EXISTS "allow_insert_own" ON user_cvs;

CREATE POLICY "allow_insert_own"
ON user_cvs
FOR INSERT
WITH CHECK (true);  -- Temporairement permettre toutes les insertions pour déboguer

-- Vérifier à nouveau les politiques
SELECT * FROM pg_policies WHERE tablename = 'user_cvs';
