'use client'

import { Job } from '@/app/types/job'
import { Building2, MapPin } from 'lucide-react'
import Image from 'next/image'

interface JobCardProps {
  job: Job
  onViewDetails: () => void
}

export default function JobCard({ job, onViewDetails }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return ''
    if (!max) return `${min?.toLocaleString()} DZD`
    if (!min) return `${max.toLocaleString()} DZD`
    return `${min.toLocaleString()} - ${max.toLocaleString()} DZD`
  }

  return (
    <div className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-lg bg-base-200 overflow-hidden flex-shrink-0">
          {job.company_logo ? (
            <Image
              src={job.company_logo}
              alt={job.company}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 className="w-full h-full p-2" />
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg truncate">{job.title}</h3>
              <p className="text-base-content/70">{job.company}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onViewDetails}
                className="px-4 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm"
              >
                Voir les détails
              </button>
              <button
                onClick={onViewDetails}
                className="px-4 py-1.5 rounded-full bg-primary text-primary-content hover:opacity-90 transition-opacity text-sm"
              >
                Postuler
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
            <div className="flex items-center gap-1 text-sm text-base-content/70">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>

            {job.salary_min && job.salary_max && (
              <>
                <span className="text-base-content/30">•</span>
                <span className="text-sm text-base-content/70">
                  {formatSalary(job.salary_min, job.salary_max)}
                </span>
              </>
            )}

            {job.remote_type && (
              <>
                <span className="text-base-content/30">•</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  {job.remote_type}
                </span>
              </>
            )}

            {job.is_urgent && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-xs">
                Urgent
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
