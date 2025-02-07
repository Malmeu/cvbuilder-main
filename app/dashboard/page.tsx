'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FileText, Briefcase, Star } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalCVs: number
  totalApplications: number
  totalFavorites: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCVs: 0,
    totalApplications: 0,
    totalFavorites: 0
  })
  const [loading, setLoading] = useState(true)
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

    fetchStats()
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
      href: '/dashboard/favorites',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    }
  ]

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

      {/* Section des CV récents */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">CV récents</h2>
        {/* Liste des CV à implémenter */}
      </div>

      {/* Section des candidatures récentes */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Candidatures récentes</h2>
        {/* Liste des candidatures à implémenter */}
      </div>
    </div>
  )
}
