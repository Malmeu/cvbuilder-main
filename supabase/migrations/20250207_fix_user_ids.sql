-- Sauvegarder les données actuelles
CREATE TABLE IF NOT EXISTS user_cvs_backup AS 
SELECT * FROM user_cvs;

-- Mettre à jour l'ID utilisateur dans la table user_cvs
UPDATE user_cvs 
SET user_id = '1f9e7766-74f4-4c90-ac33-910ef00e0adb'
WHERE user_id = '4c309030-9b5e-4c21-8a6a-e340dfe56fbd';

-- Vérifier la mise à jour
SELECT id, user_id, title, created_at 
FROM user_cvs 
WHERE user_id = '1f9e7766-74f4-4c90-ac33-910ef00e0adb';

-- Vérifier qu'il n'y a plus de CVs avec l'ancien ID
SELECT count(*) 
FROM user_cvs 
WHERE user_id = '4c309030-9b5e-4c21-8a6a-e340dfe56fbd';
