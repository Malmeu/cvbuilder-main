'use client'

import { Job } from '@/app/types/job'
import { Dialog, DialogContent } from '../components/ui/dialog'
import { Heart, MapPin, Building2, Briefcase, Mail, Phone, X } from 'lucide-react'
import Image from 'next/image'

interface JobDetailsModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export default function JobDetailsModal({
  job,
  isOpen,
  onClose,
}: JobDetailsModalProps) {
  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {/* Header avec gradient */}
        <div className="relative h-32 bg-gradient-to-r from-white-600 to-indigo-600">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Contenu principal */}
        <div className="px-6 -mt-16 pb-6">
          {/* Logo et titre */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-lg overflow-hidden flex-shrink-0 border-4 border-white">
              {job.company_logo ? (
                <Image
                  src={job.company_logo}
                  alt={job.company}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-violet-600" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pt-2">
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-gray-600 text-lg">{job.company}</p>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>

                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Briefcase className="w-4 h-4" />
                  {job.job_type}
                </div>

                {job.remote_type && (
                  <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-sm">
                    {job.remote_type}
                  </span>
                )}

                {job.is_urgent && (
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm">
                    Urgent
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description du poste</h3>
            <div className="prose prose-gray prose-sm max-w-none">
              {job.description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Exigences */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prérequis</h3>
            <div className="prose prose-gray prose-sm max-w-none">
              {job.requirements.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="grid sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
            <div className="space-y-3">
              {job.contact_email && (
                <a
                  href={`mailto:${job.contact_email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  {job.contact_email}
                </a>
              )}

              {job.contact_phone && (
                <a
                  href={`tel:${job.contact_phone}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  {job.contact_phone}
                </a>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Heart className="w-5 h-5" />
              Sauvegarder
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Fermer
              </button>
              <a
                href={`mailto:${job.contact_email}?subject=Candidature pour le poste : ${job.title}`}
                className="px-6 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
              >
                Postuler
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}