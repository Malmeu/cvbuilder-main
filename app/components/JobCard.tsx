'use client'

import { Job } from '@/app/types/job'
import { Building2, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface JobCardProps {
  job: Job
  onViewDetails: () => void
}

export default function JobCard({ job, onViewDetails }: JobCardProps) {
  const formatSalary = (salary?: number) => {
    if (!salary) return 'Non spécifié'
    return `${salary.toLocaleString()} DZD`
  }

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr,
    })
  }

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-violet-500 transition-colors cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="flex gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
          {job.company_logo ? (
            <Image
              src={job.company_logo}
              alt={job.company}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {job.title}
              </h3>
              <p className="text-gray-600">{job.company}</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-medium text-gray-900">
                {formatSalary(job.salary)}
              </p>
              <p className="text-sm text-gray-500">{job.job_type}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatDate(job.created_at)}
            </div>

            {job.remote_type && (
              <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 text-sm">
                {job.remote_type}
              </span>
            )}

            {job.is_urgent && (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-sm">
                Urgent
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
