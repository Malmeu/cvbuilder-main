-- Créer un nouveau bucket pour les images d'annonces
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'job_images',  -- Identifiant unique du bucket
    'job_images',  -- Nom du bucket
    true,          -- Rendre le bucket public pour un accès facile aux images
    10 * 1024 * 1024,  -- Limite de taille de fichier à 10 Mo
    ARRAY[
        'image/jpeg',   -- Autoriser les fichiers JPEG
        'image/png',    -- Autoriser les fichiers PNG
        'image/gif',    -- Autoriser les fichiers GIF
        'image/webp'    -- Autoriser les fichiers WebP
    ]::text[]
);

-- Politique de sécurité pour l'insertion d'images
CREATE POLICY "Employeurs peuvent uploader leurs logos" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'job_images' AND 
    auth.uid() IS NOT NULL
);

-- Politique de sécurité pour la lecture des images
CREATE POLICY "Images accessibles publiquement" ON storage.objects
FOR SELECT USING (bucket_id = 'job_images');

-- Politique de sécurité pour la suppression des images
CREATE POLICY "Employeurs peuvent supprimer leurs logos" ON storage.objects
FOR DELETE USING (
    bucket_id = 'job_images' AND 
    auth.uid() IS NOT NULL
);

-- Commentaires explicatifs
COMMENT ON POLICY "Employeurs peuvent uploader leurs logos" ON storage.objects IS 
'Permet aux utilisateurs authentifiés de télécharger des images de logos pour leurs annonces';

COMMENT ON POLICY "Images accessibles publiquement" ON storage.objects IS 
'Rend toutes les images du bucket accessibles publiquement en lecture';

COMMENT ON POLICY "Employeurs peuvent supprimer leurs logos" ON storage.objects IS 
'Permet aux utilisateurs authentifiés de supprimer leurs propres images de logos';
