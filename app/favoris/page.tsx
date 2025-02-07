'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Building2, Briefcase } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'
import JobDetailsModal from '../components/JobDetailsModal'
import { Job } from '../types/job'

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mes Offres Sauvegardées</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Aucune offre sauvegardée</h2>
          <p className="text-base-content/70">
            Les offres que vous sauvegardez apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {favorites.map(({ job }) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group p-6 rounded-xl backdrop-blur-sm border transition-all duration-300
                bg-white/5 border-white/10 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    {job.logo && (
                      <div className="w-12 h-12 rounded-lg bg-white/10 p-2">
                        <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-base-content/70">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <MapPin className="w-4 h-4" />
                      {job.wilaya}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <span className="font-medium">{job.salary}</span>
                      </div>
                    )}
                    {job.workType && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                          {job.workType === 'remote' ? 'À distance' :
                           job.workType === 'hybrid' ? 'Hybride' : 'Sur site'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setSelectedJob(job as Job)}
                    className="px-6 py-2 rounded-xl bg-primary text-primary-content 
                      hover:opacity-90 transition-opacity duration-300"
                  >
                    Voir les détails
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <JobDetailsModal
        job={selectedJob}
        isOpen={selectedJob !== null}
        onClose={() => setSelectedJob(null)}
      />
    </main>
  )
}
