export type JobCategory = 'normal' | 'seasonal' | 'internship' | 'remote'

export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship'
export type RemoteType = 'onsite' | 'hybrid' | 'remote'
export type WorkType = 'remote' | 'on-site' | 'hybrid'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string
  salary: number
  job_type: string
  remote_type: string
  contact_email: string
  contact_phone: string
  company_logo?: string
  is_urgent?: boolean
  created_at: string
  updated_at: string
}

export interface JobApplication {
  id: string
  created_at: string
  user_id: string
  job_id: string
  status: 'pending' | 'accepted' | 'rejected'
  resume_url?: string
  cover_letter?: string
}

export interface JobFavorite {
  id: string
  created_at: string
  user_id: string
  job_id: string
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
