-- Supprimer TOUTES les politiques existantes de la table
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

-- Activer RLS
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;

-- Créer une nouvelle politique simple pour la lecture
CREATE POLICY "allow_read_all_authenticated"
ON user_cvs
FOR SELECT
USING (auth.role() = 'authenticated');

-- Créer une nouvelle politique pour l'insertion
CREATE POLICY "allow_insert_own"
ON user_cvs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Créer une nouvelle politique pour la mise à jour
CREATE POLICY "allow_update_own"
ON user_cvs
FOR UPDATE
USING (auth.uid() = user_id);

-- Créer une nouvelle politique pour la suppression
CREATE POLICY "allow_delete_own"
ON user_cvs
FOR DELETE
USING (auth.uid() = user_id);

-- Vérifier les politiques actuelles
SELECT * FROM pg_policies WHERE tablename = 'user_cvs';
