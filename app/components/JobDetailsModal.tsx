'use client'

import { Job } from '@/app/types/job'
import { 
  Building2, 
  MapPin, 
  Clock, 
  Briefcase, 
  Mail, 
  Phone, 
  ExternalLink,
  X 
} from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { formatCompanyLogoUrl, sanitizeImageUrl } from '@/lib/supabase-helpers'
import { toast } from 'sonner'

interface JobDetailsModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export default function JobDetailsModal({ 
  job, 
  isOpen, 
  onClose 
}: JobDetailsModalProps) {
  if (!job) return null

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr,
    })
  }

  const companyLogoUrl = sanitizeImageUrl(job.company_logo)

  const handleApply = () => {
    if (job.contact_email) {
      const subject = encodeURIComponent(`Candidature pour le poste : ${job.title}`)
      const body = encodeURIComponent(`
Bonjour,

Je suis très intéressé par le poste de ${job.title} chez ${job.company}.

Je serais ravi de discuter de ma candidature et de mes compétences.

Cordialement,
[Votre Nom]
      `)
      window.open(`mailto:${job.contact_email}?subject=${subject}&body=${body}`, '_blank')
    } else {
      toast.error('Aucun email de contact disponible', {
        description: 'Veuillez contacter le recruteur par téléphone.'
      })
    }
  }

  // Fonction pour formater le texte en paragraphes
  const formatTextToParagraphs = (text: string) => {
    return text.split('\n').filter(p => p.trim() !== '')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col">
        <DialogHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 p-6 rounded-t-xl flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              {companyLogoUrl ? (
                <Image
                  src={companyLogoUrl}
                  alt={job.company}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50">
                  <Building2 className="w-10 h-10 text-violet-400" />
                </div>
              )}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-1">
                {job.title}
              </DialogTitle>
              <p className="text-gray-600 flex items-center gap-2">
                <span>{job.company}</span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Contenu défilable */}
        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-violet-300">
          {/* Détails du poste */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="p-1.5 rounded-lg bg-violet-50 text-violet-500">
                <Briefcase className="w-4 h-4" />
              </div>
              Type de poste : {job.job_type}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="p-1.5 rounded-lg bg-violet-50 text-violet-500">
                <Clock className="w-4 h-4" />
              </div>
              Publié {formatDate(job.created_at)}
            </div>

            {job.remote_type && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-500">
                  <MapPin className="w-4 h-4" />
                </div>
                Type de travail : {job.remote_type}
              </div>
            )}

            {job.is_urgent && (
              <div className="flex items-center gap-2 text-sm text-rose-600">
                <div className="p-1.5 rounded-lg bg-rose-50 text-rose-500">
                  <Clock className="w-4 h-4" />
                </div>
                Poste urgent
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Description du poste</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {formatTextToParagraphs(job.description).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Exigences */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Exigences</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {formatTextToParagraphs(job.requirements).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact</h3>
            <div className="flex flex-col gap-2">
              {job.contact_email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-violet-500" />
                  {job.contact_email}
                </div>
              )}
              {job.contact_phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-violet-500" />
                  {job.contact_phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bouton de postulation */}
        <div className="p-6 border-t flex justify-between items-center flex-shrink-0">
          <p className="text-sm text-gray-500">
            Vous êtes intéressé par cette offre ?
          </p>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              className="text-gray-600 hover:bg-gray-100"
              onClick={onClose}
            >
              <X className="w-4 h-4 mr-2" />
              Fermer
            </Button>
            <Button 
              variant="default" 
              className="bg-violet-600 hover:bg-violet-700"
              onClick={handleApply}
            >
              Postuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}