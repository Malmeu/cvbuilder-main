-- Vérifier les sessions actives
SELECT 
    sessions.id,
    auth.users.id as user_id,
    auth.users.email,
    sessions.created_at,
    sessions.not_after
FROM auth.sessions 
JOIN auth.users ON sessions.user_id = auth.users.id
WHERE sessions.not_after > now();

-- Vérifier l'utilisateur actuel
SELECT * FROM auth.users WHERE id = '1f9e7766-74f4-4c90-ac33-910ef00e0adb';

-- Vérifier les CVs de l'utilisateur
SELECT * FROM user_cvs WHERE user_id = '1f9e7766-74f4-4c90-ac33-910ef00e0adb';

-- Supprimer toutes les politiques existantes
DO $$ 
DECLARE 
    pol record;
BEGIN 
    FOR pol IN SELECT policyname 
               FROM pg_policies 
               WHERE tablename = 'user_cvs' 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON user_cvs', pol.policyname);
    END LOOP;
END $$;

-- Créer une politique très permissive pour le débogage
CREATE POLICY "debug_policy"
ON user_cvs
FOR ALL
USING (true)
WITH CHECK (true);

-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'user_cvs';
