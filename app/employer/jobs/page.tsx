'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { JobPost } from '@/app/types/employer'
import { useToast } from '@/app/hooks/use-toast'

export default function EmployerJobsPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const [jobs, setJobs] = useState<JobPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth/signin?from=/employer/jobs')
        return
      }

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('employerId', session.user.id)
        .order('createdAt', { ascending: false })

      if (error) throw error

      setJobs(data)
    } catch (error) {
      console.error('Erreur lors du chargement des offres:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos offres d\'emploi',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (jobId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)

      if (error) throw error

      setJobs(jobs.filter(job => job.id !== jobId))
      toast({
        title: 'Offre supprimée',
        description: 'L\'offre d\'emploi a été supprimée avec succès',
      })
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
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
        <h1 className="text-3xl font-bold">Mes offres d&apos;emploi</h1>
        <Link
          href="/employer/jobs/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-content hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Nouvelle offre
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-base-content/70 mb-4">Vous n&apos;avez pas encore publié d&apos;offres d&apos;emploi</p>
          <Link
            href="/employer/jobs/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-content hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Publier votre première offre
          </Link>
        </div>
      ) : (
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
                    <span>{job.wilaya}</span>
                    <span>•</span>
                    <span>
                      {job.workType === 'remote' ? 'À distance' :
                       job.workType === 'hybrid' ? 'Hybride' : 'Sur site'}
                    </span>
                    {job.contractType && (
                      <>
                        <span>•</span>
                        <span>{job.contractType}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/jobs/${job.id}`)}
                    className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                    title="Voir l'offre"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => router.push(`/employer/jobs/${job.id}/edit`)}
                    className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 rounded-lg hover:bg-base-200 transition-colors text-error"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.status === 'draft' && (
                  <span className="px-2 py-1 text-sm rounded-full bg-base-200">
                    Brouillon
                  </span>
                )}
                {job.status === 'closed' && (
                  <span className="px-2 py-1 text-sm rounded-full bg-error/10 text-error">
                    Fermée
                  </span>
                )}
                {job.deadline && new Date(job.deadline) > new Date() && (
                  <span className="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary">
                    Date limite : {new Date(job.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
