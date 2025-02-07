'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Building2, Clock, Mail, ExternalLink, Briefcase, Heart } from 'lucide-react'
import { Job } from '../types/job'
import { useFavorites } from '../hooks/useFavorites'

interface JobDetailsModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export default function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  
  if (!job) return null

  const handleFavoriteClick = async () => {
    if (isFavorite(job.id)) {
      await removeFromFavorites(job.id)
    } else {
      await addToFavorites(job.id)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-[calc(100%-2rem)] sm:w-[90%] max-w-3xl max-h-[90vh] 
              bg-base-100 rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header avec image de fond floue */}
            <div className="relative h-48 bg-gradient-to-r from-primary/10 to-secondary/10 flex-shrink-0">
              {job.logo && (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full h-full object-cover opacity-10 blur-xl"
                  />
                </div>
              )}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleFavoriteClick}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite(job.id)
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-100/10 hover:bg-base-100/20'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(job.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-base-100/10 hover:bg-base-100/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-6 flex items-center gap-4">
                {job.logo && (
                  <div className="w-16 h-16 rounded-xl bg-base-100 p-2 shadow-lg">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold">{job.title}</h2>
                  <p className="text-base-content/70">{job.company}</p>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6 overflow-y-auto flex-grow">
              {/* Informations clés */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-base-200/50">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Localisation</span>
                  </div>
                  <p className="text-sm">{job.wilaya}</p>
                </div>

                {job.workType && (
                  <div className="p-4 rounded-xl bg-base-200/50">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Type de travail</span>
                    </div>
                    <p className="text-sm">
                      {job.workType === 'remote' ? 'À distance' :
                       job.workType === 'hybrid' ? 'Hybride' : 'Sur site'}
                    </p>
                  </div>
                )}

                {job.salary && (
                  <div className="p-4 rounded-xl bg-base-200/50">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm font-medium">Salaire</span>
                    </div>
                    <p className="text-sm">{job.salary}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Description du poste</h3>
                <p className="text-base-content/80 whitespace-pre-line">{job.description}</p>
              </div>

              {/* Prérequis */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Prérequis</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-base-content/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Informations supplémentaires */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-base-content/70">
                  <Calendar className="w-4 h-4" />
                  <span>Date limite de candidature : {job.deadline || 'Non spécifiée'}</span>
                </div>
                {job.languages && (
                  <div className="flex items-center gap-2 text-base-content/70">
                    <span className="font-medium">Langues requises :</span>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(job.languages).map(([lang, level]) => (
                        <span key={lang} className="px-2 py-1 text-xs rounded-full bg-base-200">
                          {lang} ({level})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer avec boutons d'action */}
            <div className="p-6 bg-base-100 border-t border-base-200 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${job.contactEmail}`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary 
                    hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Contacter par email
                </a>
                {job.applyUrl ? (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-content 
                      hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Postuler en ligne
                  </a>
                ) : (
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-content 
                      hover:opacity-90 transition-opacity"
                  >
                    Postuler maintenant
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}