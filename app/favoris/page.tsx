'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Job } from '@/app/types/job'
import { Building2, MapPin } from 'lucide-react'
import Image from 'next/image'
import JobDetailsModal from '../components/JobDetailsModal'
import { sanitizeImageUrl } from '@/lib/supabase-helpers'

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        console.log('Session utilisateur:', session)
        
        if (!session) {
          console.warn('Aucune session utilisateur')
          return
        }

        console.log('ID utilisateur:', session.user.id)

        // Récupérer d'abord les favoris
        const { data: favorisData, error: favorisError } = await supabase
          .from('job_favorites')
          .select('job_id')
          .eq('user_id', session.user.id)

        console.log('Données favoris:', favorisData)
        console.log('Erreur favoris:', favorisError)

        if (favorisError) throw favorisError

        if (favorisData && favorisData.length > 0) {
          // Récupérer les détails des jobs favoris
          const jobIds = favorisData.map(f => f.job_id)
          console.log('IDs des jobs favoris:', jobIds)

          const { data: jobsData, error: jobsError } = await supabase
            .from('jobs')
            .select('*')
            .in('id', jobIds)

          console.log('Données des jobs favoris:', jobsData)
          console.log('Erreur jobs:', jobsError)

          if (jobsError) throw jobsError

          // Sanitize company logos
          const sanitizedJobs = jobsData?.map(job => ({
            ...job,
            company_logo: sanitizeImageUrl(job.company_logo)
          })) || []

          setFavoris(sanitizedJobs)
        } else {
          console.warn('Aucun favori trouvé pour cet utilisateur')
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavoris()
  }, [])

  const removeFavorite = async (jobId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { error } = await supabase
        .from('job_favorites')
        .delete()
        .match({ user_id: session.user.id, job_id: jobId })

      if (error) throw error

      setFavoris(prev => prev.filter(job => job.id !== jobId))
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Mes Favoris</h1>
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Mes Favoris</h1>

      {favoris.length === 0 ? (
        <p>Vous n'avez pas encore de favoris.</p>
      ) : (
        <div className="grid gap-4">
          {favoris.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                  {job.company_logo ? (
                    <Image
                      src={job.company_logo}
                      alt={job.company}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        {job.salary ? `${job.salary.toLocaleString()} DZD` : 'Non spécifié'}
                      </p>
                      <p className="text-sm text-gray-500">{job.job_type}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>

                    {job.remote_type && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 text-sm">
                        {job.remote_type}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-6 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                    >
                      Voir les détails
                    </button>
                    <button
                      onClick={() => removeFavorite(job.id)}
                      className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Retirer des favoris
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <JobDetailsModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  )
}
