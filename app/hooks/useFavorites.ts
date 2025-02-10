'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { JobFavorite, SavedJob } from '../types/favorites'
import { useToast } from './useToast'

export function useFavorites() {
  const [favorites, setFavorites] = useState<SavedJob[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Charger les favoris
  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      
      console.log('Données de session complètes:', data)
      console.log('Erreur de session:', error)

      const user = data?.session?.user

      console.log('Utilisateur connecté:', user)

      if (!user) {
        console.warn('Aucun utilisateur connecté')
        setLoading(false)
        return
      }

      console.log('ID utilisateur:', user.id)

      const { data: favoriteData, error: favoriteError } = await supabase
        .from('job_favorites')
        .select(`
          *,
          job:jobs (
            id,
            title,
            company,
            logo,
            wilaya,
            workType,
            salary
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      console.log('Données favoris brutes:', favoriteData)
      console.log('Erreur favoris:', favoriteError)

      if (favoriteError) throw favoriteError

      setFavorites(favoriteData || [])
      console.log('Favoris mis à jour:', favoriteData || [])
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos favoris',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Ajouter aux favoris
  const addToFavorites = async (jobId: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: 'Non connecté',
          description: 'Veuillez vous connecter pour sauvegarder des offres',
          variant: 'destructive',
        })
        return
      }

      const { error } = await supabase.from('job_favorites').insert({
        user_id: user.id,
        job_id: jobId,
      })

      if (error) throw error

      toast({
        title: 'Succès',
        description: 'Offre ajoutée aux favoris',
      })

      loadFavorites()
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter aux favoris',
        variant: 'destructive',
      })
    }
  }

  // Retirer des favoris
  const removeFromFavorites = async (jobId: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase
        .from('job_favorites')
        .delete()
        .match({ user_id: user.id, job_id: jobId })

      if (error) throw error

      toast({
        title: 'Succès',
        description: 'Offre retirée des favoris',
      })

      setFavorites(favorites.filter(fav => fav.job_id !== jobId))
    } catch (error) {
      console.error('Erreur lors de la suppression des favoris:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de retirer des favoris',
        variant: 'destructive',
      })
    }
  }

  // Vérifier si une offre est dans les favoris
  const isFavorite = (jobId: string) => {
    return favorites.some(fav => fav.job_id === jobId)
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refresh: loadFavorites,
  }
}
