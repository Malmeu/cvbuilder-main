-- Créer la table pour les résultats des outils
CREATE TABLE tool_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    tool_name TEXT NOT NULL,
    result_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Politique de sécurité pour n'autoriser que l'utilisateur à voir ses propres résultats
CREATE POLICY "Users can view their own tool results" 
ON tool_results FOR SELECT 
USING (auth.uid() = user_id);

-- Politique de sécurité pour n'autoriser que l'utilisateur à insérer ses propres résultats
CREATE POLICY "Users can insert their own tool results" 
ON tool_results FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Trigger pour mettre à jour le timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tool_results_modtime
BEFORE UPDATE ON tool_results
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
