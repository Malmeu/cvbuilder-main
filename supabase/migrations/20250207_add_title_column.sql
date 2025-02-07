-- Ajouter la colonne title à la table user_cvs
ALTER TABLE user_cvs ADD COLUMN IF NOT EXISTS title TEXT NOT NULL;

-- Vérifier la structure mise à jour
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_cvs';
