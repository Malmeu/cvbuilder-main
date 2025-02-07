'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useToast } from '@/app/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session:', session)
      
      if (!session) {
        console.log('Pas de session')
        toast({
          title: 'Erreur',
          description: 'Vous devez être connecté',
          variant: 'destructive',
        })
        router.push('/')
        return
      }

      console.log('Email:', session.user.email)
      if (session.user.email !== 'admin@cvdiali.com') {
        console.log('Pas admin')
        toast({
          title: 'Erreur',
          description: 'Accès non autorisé',
          variant: 'destructive',
        })
        router.push('/')
        return
      }

      loadJobs()
    }

    init()
  }, [])

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setJobs(data || [])
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les offres',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)

      if (error) throw error

      setJobs(jobs.filter(job => job.id !== id))
      toast({
        title: 'Succès',
        description: 'Offre supprimée avec succès',
      })
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'offre',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-base-200 rounded w-1/4"></div>
          <div className="h-12 bg-base-200 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-base-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des offres d&apos;emploi</h1>
        <Link
          href="/admin/jobs/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-content hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Nouvelle offre
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map(job => (
          <div
            key={job.id}
            className="p-6 rounded-xl border border-base-200 hover:border-base-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>
                    {job.remote_type === 'remote' ? 'À distance' :
                     job.remote_type === 'hybrid' ? 'Hybride' : 'Sur site'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/jobs/${job.id}`}
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Voir l'offre"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <Link
                  href={`/admin/jobs/${job.id}/edit`}
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Modifier"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors text-error"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-12 text-base-content/70">
            Aucune offre d&apos;emploi pour le moment
          </div>
        )}
      </div>
    </div>
  )
}
