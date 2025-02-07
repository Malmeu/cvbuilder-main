-- Récupérer tous les utilisateurs de auth.users qui n'ont pas de profil
INSERT INTO user_profiles (id, email)
SELECT au.id, au.email
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE up.id IS NULL;

-- Vérifier les profils créés
SELECT 
    au.id as auth_id,
    au.email as auth_email,
    up.id as profile_id,
    up.email as profile_email
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
ORDER BY au.created_at DESC;
