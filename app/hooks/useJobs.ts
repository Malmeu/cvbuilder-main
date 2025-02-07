import { useState, useEffect } from 'react'
import { Job, JobFilters } from '../types/job'

export const useJobs = (initialFilters?: Partial<JobFilters>) => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Partial<JobFilters>>(initialFilters || {})

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const queryParams = new URLSearchParams()
        
        // Ajout des filtres à l'URL
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value.toString())
        })

        const response = await fetch(`/api/jobs?${queryParams.toString()}`)
        if (!response.ok) throw new Error('Erreur lors du chargement des offres')
        
        const data = await response.json()
        setJobs(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters])

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  return {
    jobs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters
  }
}

// Liste des wilayas d'Algérie pour les filtres
export const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
  'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
  'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda',
  'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem',
  'MSila', 'Mascara', 'Ouargla', 'Oran'
]
