'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Building2, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useToast } from '@/app/hooks/use-toast'
import { JOB_TYPE_TRANSLATIONS, REMOTE_TYPE_TRANSLATIONS } from '@/app/data/job-translations'

export default function EditJobPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string
  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const [job, setJob] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')

  useEffect(() => {
    const checkAuthAndLoadJob = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast({
          title: 'Erreur',
          description: 'Vous devez être connecté',
          variant: 'destructive'
        })
        router.push('/auth/signin')
        return
      }
      
      if (session.user.email !== 'admin@cvdiali.com') {
        toast({
          title: 'Erreur',
          description: 'Accès non autorisé',
          variant: 'destructive'
        })
        router.push('/')
        return
      }

      // Charger les détails du job
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single()

        if (error) throw error

        setJob(data)
        
        // Charger l'URL du logo s'il existe
        if (data.company_logo) {
          const { data: logoData } = await supabase.storage
            .from('company-logos')
            .getPublicUrl(data.company_logo)
          
          setLogoPreview(logoData.publicUrl)
        }
      } catch (error) {
        console.error('Erreur de chargement du job:', error)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les détails de l\'offre',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndLoadJob()
  }, [jobId, router, supabase, toast])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session || session.user.email !== 'admin@cvdiali.com') {
        throw new Error("Vous n'avez pas les droits d'administrateur")
      }

      if (!formRef.current) {
        throw new Error("Erreur lors de l'accès au formulaire")
      }

      const formData = new FormData(formRef.current)
      let logoUrl = job.company_logo

      // Télécharger un nouveau logo si sélectionné
      if (logo) {
        // Supprimer l'ancien logo s'il existe
        if (job.company_logo) {
          await supabase.storage
            .from('company-logos')
            .remove([job.company_logo])
        }

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('company-logos')
          .upload(`${Date.now()}-${logo.name}`, logo)

        if (uploadError) throw uploadError
        logoUrl = uploadData.path
      }

      const jobData = {
        title: formData.get('title'),
        company: formData.get('company'),
        location: formData.get('location'),
        description: formData.get('description'),
        requirements: formData.get('requirements'),
        job_type: formData.get('job_type'),
        remote_type: formData.get('remote_type'),
        salary: Number(formData.get('salary')),
        contact_email: formData.get('contact_email'),
        contact_phone: formData.get('contact_phone'),
        company_logo: logoUrl,
        is_urgent: formData.get('is_urgent') === 'on',
      }

      const { error } = await supabase
        .from('jobs')
        .update(jobData)
        .eq('id', jobId)

      if (error) throw error

      toast({
        title: 'Succès',
        description: 'Offre mise à jour avec succès',
      })

      router.push('/admin/jobs')
      router.refresh()
    } catch (error: any) {
      console.error('Erreur de mise à jour:', error)
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de mettre à jour l\'offre',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-base-200 rounded w-1/4"></div>
          <div className="h-12 bg-base-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container py-8">
        <p>Offre d&apos;emploi non trouvée</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Modifier l&apos;offre d&apos;emploi</h1>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block mb-2">Titre du poste</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              defaultValue={job.title}
              required 
              className="input input-bordered w-full" 
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block mb-2">Entreprise</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              defaultValue={job.company}
              required 
              className="input input-bordered w-full" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block mb-2">Localisation</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              <input 
                type="text" 
                id="location" 
                name="location" 
                defaultValue={job.location}
                required 
                className="input input-bordered w-full pl-10" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="company_logo" className="block mb-2">Logo de l&apos;entreprise</label>
            <input 
              type="file" 
              id="company_logo" 
              name="company_logo" 
              accept="image/*"
              onChange={handleLogoChange}
              className="file-input file-input-bordered w-full" 
            />
            {logoPreview && (
              <div className="mt-2">
                <Image 
                  src={logoPreview} 
                  alt="Logo de l'entreprise" 
                  width={100} 
                  height={100} 
                  className="rounded-lg" 
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">Description du poste</label>
          <textarea 
            id="description" 
            name="description" 
            defaultValue={job.description}
            required 
            className="textarea textarea-bordered w-full h-32" 
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block mb-2">Exigences</label>
          <textarea 
            id="requirements" 
            name="requirements" 
            defaultValue={job.requirements}
            required 
            className="textarea textarea-bordered w-full h-32" 
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="job_type" className="block mb-2">Type de poste</label>
            <select 
              id="job_type" 
              name="job_type" 
              defaultValue={job.job_type}
              required 
              className="select select-bordered w-full"
            >
              {Object.entries(JOB_TYPE_TRANSLATIONS).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="remote_type" className="block mb-2">Type de travail</label>
            <select 
              id="remote_type" 
              name="remote_type" 
              defaultValue={job.remote_type}
              required 
              className="select select-bordered w-full"
            >
              {Object.entries(REMOTE_TYPE_TRANSLATIONS).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="salary" className="block mb-2">Salaire</label>
            <input 
              type="number" 
              id="salary" 
              name="salary" 
              defaultValue={job.salary}
              required 
              className="input input-bordered w-full" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact_email" className="block mb-2">Email de contact</label>
            <input 
              type="email" 
              id="contact_email" 
              name="contact_email" 
              defaultValue={job.contact_email}
              className="input input-bordered w-full" 
            />
          </div>

          <div>
            <label htmlFor="contact_phone" className="block mb-2">Téléphone de contact</label>
            <input 
              type="tel" 
              id="contact_phone" 
              name="contact_phone" 
              defaultValue={job.contact_phone}
              className="input input-bordered w-full" 
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Offre urgente</span>
            <input 
              type="checkbox" 
              name="is_urgent" 
              defaultChecked={job.is_urgent}
              className="checkbox checkbox-primary" 
            />
          </label>
        </div>

        <div className="mt-8">
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Mise à jour en cours...' : 'Mettre à jour l\'offre'}
          </button>
        </div>
      </form>
    </div>
  )
}
