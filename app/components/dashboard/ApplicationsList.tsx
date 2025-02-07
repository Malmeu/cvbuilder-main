'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Briefcase, FileText, Eye, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '../../hooks/useToast'

interface Application {
  id: string
  job: {
    id: string
    title: string
    company: string
  }
  cv: {
    id: string
    title: string
  } | null
  status: 'draft' | 'applied' | 'interviewing' | 'accepted' | 'rejected'
  notes: string | null
  applied_at: string
  created_at: string
  updated_at: string
}

const statusColors = {
  draft: 'bg-base-200 text-base-content',
  applied: 'bg-blue-500/10 text-blue-500',
  interviewing: 'bg-amber-500/10 text-amber-500',
  accepted: 'bg-green-500/10 text-green-500',
  rejected: 'bg-red-500/10 text-red-500'
}

const statusLabels = {
  draft: 'Brouillon',
  applied: 'Postulé',
  interviewing: 'Entretien',
  accepted: 'Accepté',
  rejected: 'Refusé'
}

export default function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:jobs(id, title, company),
          cv:user_cvs(id, title)
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error

      setApplications(data)
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: "Impossible de charger vos candidatures",
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)

      if (error) throw error

      setApplications(applications.filter(app => app.id !== id))
      toast({
        title: 'Succès',
        description: 'Candidature supprimée avec succès',
      })
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: "Impossible de supprimer la candidature",
        variant: 'destructive',
      })
    }
  }

  const handleStatusChange = async (id: string, newStatus: Application['status']) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ))
      
      toast({
        title: 'Succès',
        description: 'Statut mis à jour avec succès',
      })
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: "Impossible de mettre à jour le statut",
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-base-200 h-32 rounded-xl"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mes candidatures</h2>
        <Link
          href="/jobs"
          className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium 
            bg-primary text-primary-content hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle candidature
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 mx-auto text-base-content/30" />
          <h3 className="mt-4 text-lg font-medium">Aucune candidature</h3>
          <p className="mt-2 text-base-content/60">
            Commencez à postuler aux offres d'emploi
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center px-4 py-2 mt-4 rounded-xl text-sm font-medium 
              bg-primary text-primary-content hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Voir les offres
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-base-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{application.job.title}</h3>
                  <p className="text-sm text-base-content/60 mt-1">
                    {application.job.company}
                  </p>
                  {application.cv && (
                    <p className="text-sm text-base-content/60 mt-1 flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      CV utilisé : {application.cv.title}
                    </p>
                  )}
                  <div className="flex items-center mt-4 space-x-4">
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusChange(application.id, e.target.value as Application['status'])}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColors[application.status]}`}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-base-content/60">
                      Postulé le {new Date(application.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/jobs/${application.job.id}`}
                    className="p-2 rounded-lg hover:bg-base-200 text-base-content/60 
                      hover:text-primary transition-colors"
                    title="Voir l'offre"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(application.id)}
                    className="p-2 rounded-lg hover:bg-base-200 text-base-content/60 
                      hover:text-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {application.notes && (
                <p className="mt-4 text-sm text-base-content/80 bg-base-200 p-4 rounded-lg">
                  {application.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
