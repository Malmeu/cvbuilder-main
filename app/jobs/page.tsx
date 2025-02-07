'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { Search, MapPin, Building2 } from 'lucide-react'
import { Job } from '../types/job'
import JobDetailsModal from '../components/JobDetailsModal'
import { useToast } from '../hooks/use-toast'

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    loadJobs()
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

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredJobs = jobs.filter(job => {
    if (!searchQuery) return true

    const searchTerms = searchQuery.toLowerCase().split(' ')
    const jobText = `${job.title} ${job.company} ${job.location} ${job.description}`.toLowerCase()

    return searchTerms.every(term => jobText.includes(term))
  })

  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'Temps plein'
      case 'part_time':
        return 'Temps partiel'
      case 'contract':
        return 'Freelance'
      case 'internship':
        return 'Stage'
      default:
        return type
    }
  }

  const getRemoteTypeLabel = (type: string) => {
    switch (type) {
      case 'onsite':
        return 'Sur site'
      case 'hybrid':
        return 'Hybride'
      case 'remote':
        return 'À distance'
      default:
        return type
    }
  }

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
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="p-6 rounded-xl border border-base-200 hover:border-base-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <span>•</span>
                        <span>{getJobTypeLabel(job.job_type)}</span>
                        <span>•</span>
                        <span>{getRemoteTypeLabel(job.remote_type)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

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
