-- Créer un nouveau bucket pour les logos d'entreprises
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'company-logos',  -- Identifiant unique du bucket
    'company-logos',  -- Nom du bucket
    true,             -- Rendre le bucket public pour un accès facile aux logos
    5 * 1024 * 1024,  -- Limite de taille de fichier à 5 Mo
    ARRAY[
        'image/jpeg',   -- Autoriser les fichiers JPEG
        'image/png',    -- Autoriser les fichiers PNG
        'image/gif',    -- Autoriser les fichiers GIF
        'image/webp',   -- Autoriser les fichiers WebP
        'image/svg+xml' -- Autoriser les fichiers SVG
    ]::text[]
);

-- Politique de sécurité pour l'insertion de logos
CREATE POLICY "Employeurs peuvent uploader leurs logos" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'company-logos' AND 
    auth.uid() IS NOT NULL
);

-- Politique de sécurité pour la lecture des logos
CREATE POLICY "Logos accessibles publiquement" ON storage.objects
FOR SELECT USING (bucket_id = 'company-logos');

-- Politique de sécurité pour la suppression des logos
CREATE POLICY "Employeurs peuvent supprimer leurs logos" ON storage.objects
FOR DELETE USING (
    bucket_id = 'company-logos' AND 
    auth.uid() IS NOT NULL
);

-- Commentaires explicatifs
COMMENT ON POLICY "Employeurs peuvent uploader leurs logos" ON storage.objects IS 
'Permet aux utilisateurs authentifiés de télécharger des logos pour leurs entreprises';

COMMENT ON POLICY "Logos accessibles publiquement" ON storage.objects IS 
'Rend tous les logos du bucket accessibles publiquement en lecture';

COMMENT ON POLICY "Employeurs peuvent supprimer leurs logos" ON storage.objects IS 
'Permet aux utilisateurs authentifiés de supprimer leurs propres logos';
