import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function getSupabaseImageUrl(bucket: string, path: string) {
  const supabase = createClientComponentClient()
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}

export async function uploadCompanyLogo(file: File) {
  const supabase = createClientComponentClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = fileName

  const { data, error } = await supabase.storage
    .from('company-logos')
    .upload(filePath, file)

  if (error) {
    console.error('Erreur upload:', error)
    return null
  }

  return filePath
}

export function formatCompanyLogoUrl(logoPath?: string | null) {
  if (!logoPath) return null
  
  // Vérifier si l'URL est déjà complète
  if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
    return logoPath
  }
  
  // Construire l'URL complète Supabase
  return `https://vcslmteyblvtxzrywvdm.supabase.co/storage/v1/object/public/company-logos/${logoPath}`
}

export function sanitizeImageUrl(url?: string | null) {
  if (!url) return null

  // Vérifier si l'URL est déjà absolue
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Vérifier si l'URL commence par un slash
  if (url.startsWith('/')) {
    return url
  }

  // Construire une URL absolue par défaut
  return `https://vcslmteyblvtxzrywvdm.supabase.co/storage/v1/object/public/company-logos/${url}`
}
