'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from '@/app/hooks/use-toast'
import { v4 as uuidv4 } from 'uuid'

export default function CreateJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast({
          title: 'Connexion requise',
          description: 'Vous devez être connecté pour publier une offre',
          variant: 'destructive',
        })
        router.push('/auth/signin?from=/employer/jobs/create')
        return
      }

      const formData = new FormData(e.currentTarget)
      const jobData = {
        id: uuidv4(),
        title: formData.get('title'),
        company: formData.get('company'),
        location: formData.get('location'),
        description: formData.get('description'),
        requirements: (formData.get('requirements') as string).split('\n').filter(Boolean),
        job_type: formData.get('job_type'),
        remote_type: formData.get('remote_type'),
        employerId: session.user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'published',
      }

      const { error } = await supabase
        .from('jobs')
        .insert([jobData])

      if (error) throw error

      toast({
        title: 'Offre publiée',
        description: 'Votre offre d\'emploi a été publiée avec succès',
      })
      
      router.push('/employer/jobs')
    } catch (error) {
      console.error('Erreur lors de la publication:', error)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la publication',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-3xl font-bold mb-8">Publier une offre d&apos;emploi</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Informations de base</h2>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Titre du poste *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full rounded-lg border border-base-300 px-4 py-2"
              placeholder="ex: Développeur Full Stack"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Nom de l&apos;entreprise *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              className="w-full rounded-lg border border-base-300 px-4 py-2"
              placeholder="ex: Tech Solutions"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Localisation *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="w-full rounded-lg border border-base-300 px-4 py-2"
                placeholder="ex: Alger"
              />
            </div>

            <div>
              <label htmlFor="remote_type" className="block text-sm font-medium mb-1">
                Type de travail *
              </label>
              <select
                id="remote_type"
                name="remote_type"
                required
                className="w-full rounded-lg border border-base-300 px-4 py-2"
              >
                <option value="">Sélectionner un type</option>
                <option value="on-site">Sur site</option>
                <option value="remote">À distance</option>
                <option value="hybrid">Hybride</option>
              </select>
            </div>
          </div>
        </div>

        {/* Type de poste */}
        <div>
          <label htmlFor="job_type" className="block text-sm font-medium mb-1">
            Type de poste *
          </label>
          <select
            id="job_type"
            name="job_type"
            required
            className="w-full rounded-lg border border-base-300 px-4 py-2"
          >
            <option value="">Sélectionner un type</option>
            <option value="full-time">Temps plein</option>
            <option value="part-time">Temps partiel</option>
            <option value="internship">Stage</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        {/* Description et prérequis */}
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description du poste *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              className="w-full rounded-lg border border-base-300 px-4 py-2"
              placeholder="Décrivez le poste, les responsabilités, etc."
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium mb-1">
              Prérequis *
            </label>
            <textarea
              id="requirements"
              name="requirements"
              required
              rows={4}
              className="w-full rounded-lg border border-base-300 px-4 py-2"
              placeholder="Un prérequis par ligne"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 rounded-lg bg-primary text-primary-content hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Publication...' : 'Publier l\'offre'}
          </button>
        </div>
      </form>
    </div>
  )
}
