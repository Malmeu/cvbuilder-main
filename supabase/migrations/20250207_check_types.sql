-- Vérifier le type de la colonne user_id
SELECT column_name, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'user_cvs' AND column_name = 'user_id';

-- Vérifier les valeurs actuelles
SELECT id, user_id, 
       pg_typeof(user_id) as user_id_type,
       title, type
FROM user_cvs;
