'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  content: string
  description: string
  created_at: string
  image_url: string
  meta_description: string
  author: string
  category: string
  tags: string[]
}

export default function ArticleContent({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    fetchArticle()
  }, [slug])

  async function fetchArticle() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single()

    if (data) setArticle(data)
  }

  if (!article) return null

  return (
    <article className="relative py-16 px-4 sm:px-6 lg:px-8">
      {/* Effets de fond style Apple */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-3xl mx-auto">
        {/* En-tête de l'article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-sm">
              {article.category}
            </span>
            <time className="text-base-content/70 text-sm">
              {format(new Date(article.created_at), 'dd MMMM yyyy', { locale: fr })}
            </time>
            <span className="text-base-content/70 text-sm">•</span>
            <span className="text-base-content/70 text-sm">{article.author}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-base-content/70 mb-4">
            {article.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <span 
                key={tag}
                className="bg-base-200 text-base-content/70 px-2 py-0.5 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Image principale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </motion.div>

        {/* Espace pub en haut */}
        <div className="w-full h-24 bg-base-200 rounded-lg mb-8 flex items-center justify-center border border-base-300">
          <span className="text-base-content/50 text-sm">Espace Publicitaire</span>
        </div>

        {/* Contenu de l'article */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-base max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-a:text-primary mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Espace pub en bas */}
        <div className="w-full h-24 bg-base-200 rounded-lg mt-8 flex items-center justify-center border border-base-300">
          <span className="text-base-content/50 text-sm">Espace Publicitaire</span>
        </div>
      </div>
    </article>
  )
}
