import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cvdiali.com'
  
  // Routes principales
  const mainRoutes = [
    '',
    '/outils',
    '/blog',
    '/immigration',
    '/confidentialite',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Routes des outils
  const toolRoutes = [
    '/outils/analyseur-cv',
    '/outils/lettre-motivation',
    '/outils/entretien',
    '/outils/tcf',
    '/outils/visa-interview',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...mainRoutes, ...toolRoutes]
}
