'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { Search, MapPin, Building2 } from 'lucide-react'
import { Job } from '../types/job'
import JobDetailsModal from '../components/JobDetailsModal'
import { useToast } from '../hooks/use-toast'
import { translateJobType, translateRemoteType } from '@/app/data/job-translations'
import Image from 'next/image'
import { sanitizeImageUrl } from '@/lib/supabase-helpers'

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    loadJobs()
    loadFavorites()
  }, [])

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setJobs(data || [])
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les offres',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadFavorites = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from('job_favorites')
        .select('job_id')
        .eq('user_id', session.user.id)

      if (error) throw error

      setFavorites(data?.map(f => f.job_id) || [])
    } catch (error) {
      console.error('Erreur favoris:', error)
    }
  }

  const toggleFavorite = async (jobId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: 'Connexion requise',
          description: 'Veuillez vous connecter pour ajouter aux favoris',
          variant: 'destructive',
        })
        return
      }

      if (favorites.includes(jobId)) {
        // Supprimer des favoris
        const { error } = await supabase
          .from('job_favorites')
          .delete()
          .match({ user_id: session.user.id, job_id: jobId })

        if (error) throw error
        setFavorites(prev => prev.filter(id => id !== jobId))
      } else {
        // Ajouter aux favoris
        const { error } = await supabase
          .from('job_favorites')
          .insert({ user_id: session.user.id, job_id: jobId })

        if (error) throw error
        setFavorites(prev => [...prev, jobId])
      }
    } catch (error) {
      console.error('Erreur favoris:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour les favoris',
        variant: 'destructive',
      })
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredJobs = jobs.filter(job => {
    if (!searchQuery) return true

    const searchTerms = searchQuery.toLowerCase().split(' ')
    const jobText = `${job.title} ${job.company} ${job.location} ${job.description}`.toLowerCase()

    return searchTerms.every(term => jobText.includes(term))
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Trouvez votre emploi en Algérie
              </span>
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
              Des milliers d&apos;opportunités professionnelles à travers toute l&apos;Algérie
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Rechercher par titre, entreprise ou lieu..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-center text-base-content">
              Vous souhaitez publier gratuitement votre annonce ? 
              <a 
                href="mailto:contact@cvdiali.com" 
                className="ml-2 text-primary hover:underline"
              >
                Contactez-nous !
              </a>
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-base-200 animate-pulse"
                >
                  <div className="h-6 bg-base-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-base-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredJobs.map((job) => (
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
                      <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
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
                            onClick={() => toggleFavorite(job.id)}
                            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                              favorites.includes(job.id) 
                                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {favorites.includes(job.id) ? '❤️' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
          }

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 text-base-content/70">
              {searchQuery ? (
                <>
                  Aucune offre ne correspond à votre recherche
                  <p className="mt-2 text-sm">
                    Essayez avec d&apos;autres mots-clés ou supprimez des filtres
                  </p>
                </>
              ) : (
                'Aucune offre d&apos;emploi pour le moment'
              )}
            </div>
          )}
        </div>
      </section>

      <JobDetailsModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </main>
  )
}
