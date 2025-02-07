-- Rafraîchir le cache du schéma
NOTIFY pgrst, 'reload schema';

-- Vérifier la structure de la table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_cvs';
