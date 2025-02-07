export interface JobFavorite {
  id: string
  user_id: string
  job_id: string
  created_at: string
}

export interface SavedJob extends JobFavorite {
  job: {
    id: string
    title: string
    company: string
    logo?: string
    wilaya: string
    workType?: string
    salary?: string
  }
}
