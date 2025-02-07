'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface CV {
  id: string
  title: string
  type: string
  is_primary: boolean
  created_at: string
  data: any
}

export default function CVList() {
  const [cvs, setCvs] = useState<CV[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        if (session?.user) {
          setUser(session.user)
          loadCVs(session.user.id)
        }
      } catch (error: any) {
        console.error('Erreur de session:', error)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger vos CVs',
          variant: 'destructive',
        })
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        loadCVs(session.user.id)
      } else {
        setCvs([])
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadCVs = async (userId: string) => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('user_cvs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      console.log('CVs chargés:', data)
      setCvs(data || [])
    } catch (error: any) {
      console.error('Erreur lors du chargement des CVs:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos CVs',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const setPrimaryCV = async (cvId: string) => {
    if (!user) return

    try {
      // D'abord, mettre tous les CVs comme non-primaires
      const { error: updateError } = await supabase
        .from('user_cvs')
        .update({ is_primary: false })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      // Ensuite, définir le CV sélectionné comme primaire
      const { error: setPrimaryError } = await supabase
        .from('user_cvs')
        .update({ is_primary: true })
        .eq('id', cvId)
        .eq('user_id', user.id)

      if (setPrimaryError) throw setPrimaryError

      // Recharger les CVs
      await loadCVs(user.id)

      toast({
        title: 'Succès',
        description: 'CV principal mis à jour',
      })
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du CV principal:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le CV principal',
        variant: 'destructive',
      })
    }
  }

  const deleteCV = async (cvId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_cvs')
        .delete()
        .eq('id', cvId)
        .eq('user_id', user.id)

      if (error) throw error

      // Recharger les CVs
      await loadCVs(user.id)

      toast({
        title: 'Succès',
        description: 'CV supprimé',
      })
    } catch (error: any) {
      console.error('Erreur lors de la suppression du CV:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le CV',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return <div className="text-center py-4">Chargement de vos CVs...</div>
  }

  if (cvs.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="mb-4">Vous n'avez pas encore de CV</p>
        <Link 
          href="/builder"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Créer mon premier CV
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cvs.map((cv) => (
        <div 
          key={cv.id} 
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold mb-2">{cv.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Créé le {new Date(cv.created_at).toLocaleDateString('fr-FR')}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              cv.is_primary 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {cv.is_primary ? 'Principal' : 'Secondaire'}
            </span>
            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              {cv.type}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link
              href={`/builder?id=${cv.id}`}
              className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90"
            >
              Modifier
            </Link>
            {!cv.is_primary && (
              <button
                onClick={() => setPrimaryCV(cv.id)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Définir comme principal
              </button>
            )}
            <button
              onClick={() => deleteCV(cv.id)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
