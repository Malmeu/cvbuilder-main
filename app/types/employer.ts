import { Job } from './job'

export type WorkType = 'remote' | 'on-site' | 'hybrid'

export interface Employer {
  id: string
  userId: string
  companyName: string
  companyLogo?: string
  companyDescription?: string
  wilaya: string
  industry: string
  website?: string
  contactEmail: string
  phoneNumber?: string
  createdAt: string
  updatedAt: string
}

export interface JobPost extends Job {
  employerId: string
  status: 'draft' | 'published' | 'closed'
  workType: WorkType
  wilaya: string
  contractType: string
  experienceLevel: string
  minSalary?: number
  maxSalary?: number
  benefits?: string[]
  skills?: string[]
  languages?: {
    [key: string]: 'basic' | 'intermediate' | 'fluent' | 'native'
  }
  deadline?: string
  createdAt: string
  updatedAt: string
}
