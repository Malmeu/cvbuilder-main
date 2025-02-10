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
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
        <div className="bg-primary/10 p-4 rounded-xl">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Fonctionnalité en développement
          </h3>
          <p className="text-base-content/70 mb-6">
            Le suivi de vos candidatures sera disponible très prochainement. 
            Nous travaillons actuellement à améliorer cette fonctionnalité pour 
            vous offrir la meilleure expérience possible.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Briefcase className="w-12 h-12 text-primary/50" />
          </div>
        </div>
        
        <div>
          <p className="text-base-content/60">
            En attendant, continuez à postuler et à explorer de nouvelles opportunités !
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center px-6 py-3 mt-4 rounded-xl text-sm font-medium 
              bg-primary text-primary-content hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Voir les offres d'emploi
          </Link>
        </div>
      </div>
    </div>
  )
}
