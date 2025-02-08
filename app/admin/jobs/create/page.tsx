'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Building2, MapPin } from 'lucide-react'
import Image from 'next/image'
import { JOB_TYPE_TRANSLATIONS, REMOTE_TYPE_TRANSLATIONS } from '@/app/data/job-translations'

export default function CreateJobPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/signin')
        return
      }
      
      // Vérifier si l'utilisateur est admin
      if (session.user.email !== 'admin@cvdiali.com') {
        alert("Vous n'avez pas les droits d'administrateur nécessaires.")
        router.push('/')
      }
    }
    checkAuth()
  }, [router])

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
      if (!session) {
        throw new Error('Vous devez être connecté pour créer une annonce')
      }

      // Vérifier si l'utilisateur est admin
      if (session.user.email !== 'admin@cvdiali.com') {
        throw new Error("Vous n'avez pas les droits d'administrateur nécessaires.")
      }

      if (!formRef.current) {
        throw new Error("Erreur lors de l'accès au formulaire")
      }

      const formData = new FormData(formRef.current)
      let logoUrl = ''

      if (logo) {
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
        company_logo: logoUrl || null,
        is_urgent: formData.get('is_urgent') === 'on',
        user_id: session.user.id // Ajout de l'ID de l'utilisateur
      }

      const { error } = await supabase
        .from('jobs')
        .insert([jobData])

      if (error) throw error

      router.push('/admin/jobs')
      router.refresh()
    } catch (error: any) {
      console.error('Erreur:', error)
      alert(error.message || "Une erreur s'est produite lors de la création de l'annonce.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-2xl font-bold mb-8">Créer une nouvelle annonce</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Logo de l'entreprise */}
        <div>
          <label className="block font-medium mb-2">
            Logo de l'entreprise
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-base-200 overflow-hidden">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Logo preview"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-full h-full p-4" />
              )}
            </div>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block font-medium mb-2">
              Titre du poste *
            </label>
            <input
              type="text"
              name="title"
              required
              className="input input-bordered w-full"
              placeholder="ex: Développeur Full Stack"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Entreprise *
            </label>
            <input
              type="text"
              name="company"
              required
              className="input input-bordered w-full"
              placeholder="ex: Tech Solutions"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Localisation *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
              <input
                type="text"
                name="location"
                required
                className="input input-bordered w-full pl-10"
                placeholder="ex: Alger, Algérie"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Salaire *
            </label>
            <input
              type="number"
              name="salary"
              
              className="input input-bordered w-full"
              placeholder="ex: 150000"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Type de contrat *
            </label>
            <select name="job_type" required className="select select-bordered w-full">
              {Object.entries(JOB_TYPE_TRANSLATIONS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Type de travail *
            </label>
            <select name="remote_type" required className="select select-bordered w-full">
              {Object.entries(REMOTE_TYPE_TRANSLATIONS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Email de contact *
            </label>
            <input
              type="email"
              name="contact_email"
              required
              className="input input-bordered w-full"
              placeholder="ex: contact@entreprise.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Téléphone de contact
            </label>
            <input
              type="tel"
              name="contact_phone"
              className="input input-bordered w-full"
              placeholder="ex: +213 555 123 456"
            />
          </div>
        </div>

        {/* Description et exigences */}
        <div>
          <label className="block font-medium mb-2">
            Description du poste *
          </label>
          <textarea
            name="description"
            required
            rows={5}
            className="textarea textarea-bordered w-full"
            placeholder="Décrivez le poste, les responsabilités..."
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Exigences *
          </label>
          <textarea
            name="requirements"
            required
            rows={5}
            className="textarea textarea-bordered w-full"
            placeholder="Listez les compétences requises, l'expérience nécessaire..."
          />
        </div>

        {/* Options supplémentaires */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_urgent"
            className="checkbox"
          />
          <label className="font-medium">
            Marquer comme urgent
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-ghost"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? 'Création...' : 'Créer l\'annonce'}
          </button>
        </div>
      </form>
    </div>
  )
}
