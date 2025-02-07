import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Job } from '@/app/types/job'

interface ExtendedJob extends Omit<Job, 'salary'> {
  category?: string
  wilaya?: string
  workType?: string
  salary: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  let filteredJobs = await prisma.job.findMany({
    where: {
      is_active: true
    },
    orderBy: {
      created_at: 'desc'
    }
  }) as ExtendedJob[]

  // Filtrage par catégorie
  const category = searchParams.get('category')
  if (category) {
    filteredJobs = filteredJobs.filter(job => job.category === category)
  }

  // Filtrage par wilaya
  const wilaya = searchParams.get('wilaya')
  if (wilaya) {
    filteredJobs = filteredJobs.filter(job => job.wilaya === wilaya)
  }

  // Filtrage par type de travail
  const workType = searchParams.get('workType')
  if (workType) {
    filteredJobs = filteredJobs.filter(job => job.workType === workType)
  }

  // Filtrage par salaire
  const salaryParam = searchParams.get('salary')
  if (salaryParam) {
    const minSalary = Number(salaryParam)
    filteredJobs = filteredJobs.filter(job => {
      if (!job.salary) return false
      const jobSalary = Number(job.salary.replace(/[^0-9]/g, ''))
      return jobSalary >= minSalary
    })
  }

  // Filtrage par compétences
  const skillsParam = searchParams.get('skills')
  if (skillsParam) {
    const skills = skillsParam.split(',')
    filteredJobs = filteredJobs.filter(job => {
      if (!job.requirements) return false
      return skills.some(skill => 
        job.requirements.toLowerCase().includes(skill.toLowerCase())
      )
    })
  }

  return NextResponse.json(filteredJobs)
}
