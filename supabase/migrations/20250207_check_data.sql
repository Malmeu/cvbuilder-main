-- Vérifier les données en détail
SELECT 
    id,
    user_id,
    length(user_id::text) as user_id_length,
    title,
    type,
    created_at
FROM user_cvs
ORDER BY created_at DESC;

-- Comparer avec un ID spécifique
SELECT count(*) 
FROM user_cvs 
WHERE user_id = '1f9e7766-74f4-4c90-ac33-910ef00e0adb';
