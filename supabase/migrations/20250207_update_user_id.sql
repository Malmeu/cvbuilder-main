-- Mettre à jour le user_id de tous les CVs existants
UPDATE user_cvs 
SET user_id = '1f9e7766-74f4-4c90-ac33-910ef00e0adb'
WHERE user_id = '4c309030-9b5e-4c21-8a6a-e340dfe56fbd';

-- Vérifier la mise à jour
SELECT id, user_id, title, type 
FROM user_cvs 
WHERE user_id = '1f9e7766-74f4-4c90-ac33-910ef00e0adb';
