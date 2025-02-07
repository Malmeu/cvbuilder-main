'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from '@/app/hooks/useToast'
import CVBuilder from '@/app/components/builder/CVBuilder'

export default function BuilderPage() {
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleSave = async (cvData: any) => {
    try {
      setSaving(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: 'Erreur',
          description: 'Vous devez être connecté pour sauvegarder un CV',
          variant: 'destructive',
        })
        return
      }

      const { data, error } = await supabase
        .from('user_cvs')
        .insert({
          user_id: user.id,
          title: cvData.title || 'Mon CV',
          content: cvData,
          type: 'classic'
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: 'Succès',
        description: 'Votre CV a été sauvegardé',
      })

      // Rediriger vers le tableau de bord
      router.push('/dashboard/cvs')
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: "Impossible de sauvegarder le CV",
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  return <CVBuilder onSave={handleSave} saving={saving} />
}
