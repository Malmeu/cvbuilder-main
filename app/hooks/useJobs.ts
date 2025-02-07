import { useState, useEffect } from 'react'
import { Job } from '@/app/types/job'
import { supabase } from '@/lib/supabase'

interface UseJobsFilters {
  category?: string
  wilaya?: string
  workType?: string
  salary?: number
  skills?: string[]
}

export function useJobs(filters: UseJobsFilters = {}) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setError(null)

        let query = supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false })

        // Appliquer les filtres
        if (filters.category) {
          query = query.eq('category', filters.category)
        }

        if (filters.wilaya) {
          query = query.eq('wilaya', filters.wilaya)
        }

        if (filters.workType) {
          query = query.eq('work_type', filters.workType)
        }

        if (filters.salary) {
          query = query.gte('salary', filters.salary)
        }

        const { data, error } = await query

        if (error) throw error

        // Filtrer par compétences si nécessaire (côté client car plus complexe)
        let filteredJobs = data as Job[]
        if (filters.skills?.length) {
          filteredJobs = filteredJobs.filter(job =>
            filters.skills!.some(skill =>
              job.requirements.toLowerCase().includes(skill.toLowerCase())
            )
          )
        }

        setJobs(filteredJobs)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError("Une erreur s'est produite lors de la récupération des offres d'emploi")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [filters])

  return { jobs, isLoading, error }
}

// Liste des wilayas d'Algérie pour les filtres
export const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
  'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
  'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda',
  'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem',
  'MSila', 'Mascara', 'Ouargla', 'Oran'
]
