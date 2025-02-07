export type JobCategory = 'normal' | 'seasonal' | 'internship' | 'remote'

export type WorkType = 'remote' | 'on-site' | 'hybrid'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  category: JobCategory
  description: string
  requirements: string[]
  postedAt: string
  deadline?: string
  logo?: string
  isUrgent?: boolean
  isPromoted?: boolean
  contactEmail: string
  applyUrl?: string
  // Champs spécifiques pour l'Algérie
  wilaya: string
  workType: WorkType
  season?: 'summer' | 'winter' | 'ramadan' // Pour les emplois saisonniers
  experienceLevel?: 'junior' | 'mid' | 'senior'
  contractType?: 'cdd' | 'cdi' | 'stage' | 'freelance'
  languages?: {
    arabic?: 'required' | 'preferred'
    french?: 'required' | 'preferred'
    english?: 'required' | 'preferred'
  }
}

export type JobFilters = {
  category?: JobCategory
  wilaya?: string
  workType?: WorkType
  searchQuery?: string
  experienceLevel?: string
  contractType?: string
  minSalary?: number
  maxSalary?: number
  isUrgent?: boolean
  season?: string
}
