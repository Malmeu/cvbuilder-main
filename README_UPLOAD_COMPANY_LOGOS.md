# Upload de logos d'entreprises dans Supabase

## Configuration du bucket

Un bucket nommé `company-logos` a été créé pour stocker les logos des entreprises.

## Politiques de sécurité

- Seuls les utilisateurs authentifiés peuvent uploader des logos
- Les logos sont publiquement accessibles en lecture
- Chaque utilisateur peut supprimer ses propres logos

## Exemple de code pour l'upload

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

async function uploadCompanyLogo(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('company-logos')
    .upload(filePath, file)

  if (error) {
    console.error('Erreur upload:', error)
    return null
  }

  // Récupérer l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('company-logos')
    .getPublicUrl(filePath)

  return publicUrl
}
```

## Limitations

- Taille maximale de fichier : 5 Mo
- Types de fichiers autorisés : 
  - JPEG
  - PNG
  - GIF
  - WebP
  - SVG

## Bonnes pratiques

1. Compressez vos logos avant upload
2. Utilisez des noms de fichiers uniques
3. Gérez les erreurs d'upload
4. Préférez des images carrées ou avec un ratio proche de 1:1
5. Utilisez des logos avec un fond transparent si possible
