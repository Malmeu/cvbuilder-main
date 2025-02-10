'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Building2, 
  Star as StarIcon, 
  Eye, 
  X 
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { sanitizeImageUrl } from '@/lib/supabase-helpers'


interface Job {
  id: number
  title: string
  company: string
  company_logo: string
  location: string
  job_type: string
  remote_type: string
  description: string
  requirements: string
  salary?: number
  is_urgent: boolean
  created_at: string
  contact_email?: string
  contact_phone?: string
}

export default function FavoritesPage() {
  const [favoris, setFavoris] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const supabaseClient = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (!user) return

      const { data: favorisData, error: favorisError } = await supabaseClient
        .from('job_favorites')
        .select(`
          job:jobs(
            id, 
            title, 
            company, 
            company_logo, 
            location, 
            job_type, 
            remote_type, 
            description, 
            requirements, 
            salary, 
            is_urgent, 
            created_at,
            contact_email,
            contact_phone
          ),
          contact_email:jobs(contact_email),
          contact_phone:jobs(contact_phone)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (favorisError) throw favorisError

      // Transform the data to extract jobs
      const favoriteJobs = favorisData.map((item: any) => item.job)
      setFavoris(favoriteJobs)
    } catch (error: any) {
      console.error('Erreur lors de la récupération des favoris:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos favoris',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removeFavorite = async (jobId: string) => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (!user) return

      const { error } = await supabaseClient
        .from('job_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('job_id', jobId)

      if (error) throw error

      setFavoris(favoris.filter(job => job.id.toString() !== jobId))
      toast({
        title: 'Succès',
        description: 'Offre retirée des favoris'
      })
    } catch (error: any) {
      console.error('Erreur lors de la suppression des favoris:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de retirer des favoris',
        variant: 'destructive'
      })
    }
  }

  const translateRemoteType = (type: string) => {
    const translations: { [key: string]: string } = {
      'full_remote': 'Télétravail',
      'hybrid': 'Hybride',
      'on_site': 'Sur site'
    }
    return translations[type] || type
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-base-200 rounded-xl animate-pulse h-40"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <StarIcon className="w-8 h-8 mr-3 text-amber-500" />
          Offres sauvegardées
        </h1>
      </div>

      {favoris.length === 0 ? (
        <div className="text-center py-12">
          <StarIcon className="w-12 h-12 mx-auto text-base-content/30" />
          <h3 className="mt-4 text-lg font-medium">Aucune offre favorite</h3>
          <p className="mt-2 text-base-content/60">
            Commencez à sauvegarder des offres d'emploi
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoris.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
            >
              <div className="p-6 relative">
                {job.is_urgent && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold uppercase tracking-wider">
                      Urgent
                    </span>
                  </div>
                )}
                
                <div className="flex items-center mb-4 space-x-4">
                  <div className="w-16 h-16 rounded-xl mr-4 bg-gray-50 border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
                    {job.company_logo ? (
                      <Image 
                        src={sanitizeImageUrl(job.company_logo) || ''} 
                        alt={`${job.company} logo`} 
                        width={64} 
                        height={64} 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1 line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="line-clamp-1">{job.location}</span>
                    </div>
                    
                    {job.salary && job.salary > 0 && (
                      <div className="text-sm font-semibold text-gray-800">
                        {job.salary.toLocaleString()} DZD
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {translateRemoteType(job.remote_type)}
                    </span>

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                      >
                        Détails
                      </button>
                      <button
                        onClick={() => removeFavorite(job.id.toString())}
                        className="text-xs px-3 py-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de détails */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl mr-4 bg-gray-50 border border-gray-100 flex items-center justify-center p-2">
                  {selectedJob.company_logo ? (
                    <Image 
                      src={sanitizeImageUrl(selectedJob.company_logo) || ''} 
                      alt={`${selectedJob.company} logo`} 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {translateRemoteType(selectedJob.remote_type)}
                  </span>
                  {selectedJob.is_urgent && (
                    <span className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>

                {selectedJob.salary && selectedJob.salary > 0 && (
                  <div className="text-lg font-semibold text-gray-800">
                    {selectedJob.salary.toLocaleString()} DZD
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Exigences</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.requirements}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Coordonnées</h3>
                  {selectedJob.contact_email && (
                    <p className="text-gray-700">{selectedJob.contact_email}</p>
                  )}
                  {selectedJob.contact_phone && (
                    <p className="text-gray-700">{selectedJob.contact_phone}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
