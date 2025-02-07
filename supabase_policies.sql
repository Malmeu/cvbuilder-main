
-- Activer RLS pour la table jobs
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion aux utilisateurs authentifiés
CREATE POLICY "Users can insert their own jobs" ON jobs
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre la lecture à tous
CREATE POLICY "Everyone can view jobs" ON jobs
    FOR SELECT
    USING (true);

-- Politique pour permettre la mise à jour aux propriétaires
CREATE POLICY "Users can update their own jobs" ON jobs
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Politique pour permettre la suppression aux propriétaires
CREATE POLICY "Users can delete their own jobs" ON jobs
    FOR DELETE
    USING (auth.uid() = user_id);

