'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FileText, Briefcase, Star } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DashboardStats {
  totalCVs: number
  totalApplications: number
  totalFavorites: number
}

interface CV {
  id: number
  title: string
  type: string
  is_primary: boolean
  created_at: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCVs: 0,
    totalApplications: 0,
    totalFavorites: 0
  })
  const [loading, setLoading] = useState(true)
  const [cvs, setCvs] = useState<CV[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const [cvs, applications, favorites] = await Promise.all([
          supabase
            .from('user_cvs')
            .select('id', { count: 'exact' })
            .eq('user_id', user.id),
          supabase
            .from('job_applications')
            .select('id', { count: 'exact' })
            .eq('user_id', user.id),
          supabase
            .from('job_favorites')
            .select('id', { count: 'exact' })
            .eq('user_id', user.id)
        ])

        setStats({
          totalCVs: cvs.count || 0,
          totalApplications: applications.count || 0,
          totalFavorites: favorites.count || 0
        })
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchCvs = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('user_cvs')
          .select('id, title, type, is_primary, created_at')
          .eq('user_id', user.id)

        if (error) {
          console.error('Erreur lors du chargement des CV:', error)
        } else {
          setCvs(data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des CV:', error)
      }
    }

    fetchStats()
    fetchCvs()
  }, [supabase])

  const stats_cards = [
    {
      name: 'CV créés',
      value: stats.totalCVs,
      icon: FileText,
      href: '/dashboard/cvs',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      name: 'Candidatures',
      value: stats.totalApplications,
      icon: Briefcase,
      href: '/dashboard/applications',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      name: 'Offres sauvegardées',
      value: stats.totalFavorites,
      icon: Star,
      href: '/favoris',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    }
  ]

  const downloadCV = async (id: number) => {
    // Implement CV download logic here
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-base-200 rounded-xl"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats_cards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="block p-6 bg-base-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/60">
                  {card.name}
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {card.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">CV récents</h2>
          <Link 
            href="/dashboard/cvs" 
            className="text-sm text-primary hover:underline"
          >
            Voir tous les CV
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-base-200 rounded-xl animate-pulse h-40"
              />
            ))}
          </div>
        ) : cvs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cvs.slice(0, 3).map((cv) => (
              <motion.div
                key={cv.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-base-content mb-1">
                      {cv.title}
                    </h3>
                    <p className="text-sm text-base-content/60">
                      {cv.type}
                    </p>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs ${
                      cv.is_primary 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {cv.is_primary ? 'Principal' : 'Secondaire'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-base-content/60">
                    Créé le {new Date(cv.created_at).toLocaleDateString('fr-FR')}
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      href={`/builder?id=${cv.id}`}
                      className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => downloadCV(cv.id)}
                      className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Télécharger
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-base-200 rounded-xl p-6 text-center">
            <p className="text-base-content/60 mb-4">
              Vous n'avez pas encore créé de CV
            </p>
            <Link
              href="/builder"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Créer mon premier CV
            </Link>
          </div>
        )}
      </div>

      {/* Section des candidatures récentes */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Candidatures récentes</h2>
         <p>A venir ...</p>
        {/* Liste des candidatures à implémenter */}
      </div>
    </div>
  )
}
