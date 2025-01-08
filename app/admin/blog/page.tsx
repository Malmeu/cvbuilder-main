'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Article {
  id: string
  title: string
  slug: string
  description: string
  created_at: string
  published: boolean
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  async function handlePublishToggle(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !currentStatus })
        .eq('id', id)

      if (error) throw error
      fetchArticles()
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchArticles()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Gestion des Articles
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/blog/new')}
              className="btn btn-primary"
            >
              Nouvel Article
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-base-100 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-base-content/70 mb-4">{article.description}</p>
                  <div className="flex gap-2 items-center">
                    <span className={`badge ${article.published ? 'badge-success' : 'badge-warning'}`}>
                      {article.published ? 'Publié' : 'Brouillon'}
                    </span>
                    <span className="text-sm text-base-content/50">
                      {new Date(article.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/blog/edit/${article.id}`)}
                    className="btn btn-sm btn-primary"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handlePublishToggle(article.id, article.published)}
                    className={`btn btn-sm ${article.published ? 'btn-warning' : 'btn-success'}`}
                  >
                    {article.published ? 'Dépublier' : 'Publier'}
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="btn btn-sm btn-error"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-base-content/70">Aucun article trouvé</p>
              <button
                onClick={() => router.push('/admin/blog/new')}
                className="btn btn-primary mt-4"
              >
                Créer votre premier article
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
