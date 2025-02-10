'use client'

import { Job } from '@/app/types/job'
import { Building2, MapPin, Clock, Briefcase, Heart } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useState } from 'react'
import { formatCompanyLogoUrl, sanitizeImageUrl } from '@/lib/supabase-helpers'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useToast } from '@/app/hooks/use-toast'

interface JobCardProps {
  job: Job
  onViewDetails?: () => void
  onToggleFavorite?: () => void
  isFavorite?: boolean
}

export default function JobCard({ 
  job, 
  onViewDetails,
  onToggleFavorite,
  isFavorite = false 
}: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { toast } = useToast()

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr,
    })
  }

  const handleToggleFavorite = async () => {
    // Vérifier si l'utilisateur est connecté
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Rediriger vers la page de connexion
      toast({
        title: 'Connexion requise',
        description: 'Veuillez vous connecter pour ajouter aux favoris',
        variant: 'default'
      })
      router.push('/auth/signin')
      return
    }

    // Appeler la fonction de toggle des favoris si l'utilisateur est connecté
    if (onToggleFavorite) {
      onToggleFavorite()
    }
  }

  const companyLogoUrl = sanitizeImageUrl(job.company_logo)

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-100 hover:border-violet-200 transition-all duration-300 
                 shadow-sm hover:shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-violet-50/0 to-violet-50/20 opacity-0 
                    transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
      />

      {/* Content */}
      <div className="relative p-6">
        <div className="flex gap-4">
          {/* Logo */}
          <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 
                        border-2 border-gray-100 group-hover:border-violet-100 transition-colors">
            {companyLogoUrl ? (
              <Image
                src={companyLogoUrl}
                alt={job.company}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50">
                <Building2 className="w-8 h-8 text-violet-400" />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-violet-700 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
              </div>

              {/* Favorite Button */}
              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleFavorite()
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite 
                      ? 'text-rose-600 bg-rose-50 hover:bg-rose-100' 
                      : 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>

            {/* Job Details */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-500">
                  <MapPin className="w-4 h-4" />
                </div>
                {job.location}
              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-500">
                  <Briefcase className="w-4 h-4" />
                </div>
                {job.job_type}
              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-500">
                  <Clock className="w-4 h-4" />
                </div>
                {formatDate(job.created_at)}
              </div>

              {job.remote_type && (
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-sm font-medium">
                  {job.remote_type}
                </span>
              )}

              {job.is_urgent && (
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium">
                  Urgent
                </span>
              )}
            </div>

            {/* Action */}
            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={onViewDetails}
                className="px-6 py-2.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 
                         transition-colors transform hover:translate-x-1 duration-200"
              >
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
