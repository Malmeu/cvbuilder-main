'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Briefcase, Filter, X, Building2, Clock } from 'lucide-react'
import { useJobs, wilayas } from '../hooks/useJobs'
import { JobCategory, WorkType, Job } from '../types/job'
import JobDetailsModal from '../components/JobDetailsModal'

const categories = [
  { value: 'normal', label: 'Emplois CDI/CDD', icon: <Briefcase className="w-5 h-5" /> },
  { value: 'seasonal', label: 'Emplois Saisonniers', icon: <Calendar className="w-5 h-5" /> },
  { value: 'internship', label: 'Stages', icon: <Building2 className="w-5 h-5" /> },
  { value: 'remote', label: 'Télétravail', icon: <Clock className="w-5 h-5" /> },
]

const workTypes: { value: WorkType; label: string }[] = [
  { value: 'on-site', label: 'Sur site' },
  { value: 'remote', label: 'À distance' },
  { value: 'hybrid', label: 'Hybride' },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const {
    jobs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters
  } = useJobs()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    updateFilters({ searchQuery: query })
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
              Des milliers d'opportunités professionnelles à travers toute l'Algérie
            </p>

            {/* Barre de recherche */}
            <div className="max-w-3xl mx-auto flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un emploi..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 
                      focus:border-primary/30 focus:ring-2 focus:ring-primary/20 focus:outline-none
                      placeholder:text-base-content/50"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-base-content/50" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 rounded-xl bg-primary/10 text-primary border border-primary/20 
                  hover:bg-primary/20 transition-colors duration-300 flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filtres</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filtres avancés */}
      {showFilters && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-base-200/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sélection de la wilaya */}
              <div>
                <label className="block text-sm font-medium mb-2">Wilaya</label>
                <select
                  value={filters.wilaya || ''}
                  onChange={(e) => updateFilters({ wilaya: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/30"
                >
                  <option value="">Toutes les wilayas</option>
                  {wilayas.map((wilaya) => (
                    <option key={wilaya} value={wilaya}>{wilaya}</option>
                  ))}
                </select>
              </div>

              {/* Type de travail */}
              <div>
                <label className="block text-sm font-medium mb-2">Type de travail</label>
                <select
                  value={filters.workType || ''}
                  onChange={(e) => updateFilters({ workType: e.target.value as WorkType })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/30"
                >
                  <option value="">Tous les types</option>
                  {workTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Niveau d'expérience */}
              <div>
                <label className="block text-sm font-medium mb-2">Niveau d'expérience</label>
                <select
                  value={filters.experienceLevel || ''}
                  onChange={(e) => updateFilters({ experienceLevel: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/30"
                >
                  <option value="">Tous les niveaux</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Intermédiaire</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-base-content/70 hover:text-base-content"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Section Catégories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => updateFilters({ 
                  category: filters.category === category.value ? undefined : category.value as JobCategory 
                })}
                className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300
                  ${filters.category === category.value
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
              >
                <div className="flex items-center gap-3">
                  {category.icon}
                  <span className="font-medium">{category.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Liste des emplois */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-error">
              {error}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-base-content/70">
              Aucune offre d'emploi ne correspond à vos critères
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`group p-6 rounded-xl backdrop-blur-sm border transition-all duration-300
                    ${job.isPromoted ? 'bg-primary/5 border-primary/20' : 'bg-white/5 border-white/10'}
                    hover:border-primary/30 hover:shadow-lg`}
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
                              {workTypes.find(t => t.value === job.workType)?.label}
                            </span>
                          </div>
                        )}
                        {job.isUrgent && (
                          <span className="px-2 py-1 text-xs font-medium bg-error/10 text-error rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="px-6 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 
                          hover:bg-primary/20 transition-colors duration-300"
                      >
                        Voir les détails
                      </button>
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="px-6 py-2 rounded-xl bg-primary text-primary-content 
                          hover:opacity-90 transition-opacity duration-300"
                      >
                        Postuler
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal des détails d'emploi */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={selectedJob !== null}
        onClose={() => setSelectedJob(null)}
      />
    </main>
  )
}
