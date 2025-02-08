# Upload d'images dans Supabase

## Configuration du bucket

Un bucket nommé `job_images` a été créé pour stocker les logos des entreprises et les images des annonces.

## Politiques de sécurité

- Seuls les utilisateurs authentifiés peuvent uploader des images
- Les images sont publiquement accessibles en lecture
- Chaque utilisateur peut supprimer ses propres images

## Exemple de code pour l'upload

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

async function uploadJobImage(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('job_images')
    .upload(filePath, file)

  if (error) {
    console.error('Erreur upload:', error)
    return null
  }

  // Récupérer l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('job_images')
    .getPublicUrl(filePath)

  return publicUrl
}
```

## Limitations

- Taille maximale de fichier : 10 Mo
- Types de fichiers autorisés : 
  - JPEG
  - PNG
  - GIF
  - WebP

## Bonnes pratiques

1. Compressez vos images avant upload
2. Utilisez des noms de fichiers uniques
3. Gérez les erreurs d'upload
