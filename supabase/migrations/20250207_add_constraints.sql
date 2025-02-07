-- Supprimer la contrainte si elle existe déjà
ALTER TABLE user_cvs 
DROP CONSTRAINT IF EXISTS user_cvs_user_id_key;

-- Ajouter une contrainte unique sur user_id
ALTER TABLE user_cvs 
ADD CONSTRAINT user_cvs_user_id_key UNIQUE (user_id);

-- Vérifier les contraintes
SELECT
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name
FROM 
    information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
WHERE 
    tc.table_name = 'user_cvs';
