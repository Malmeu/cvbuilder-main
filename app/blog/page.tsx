'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import SearchBar from './SearchBar'
import ViewToggle from './ViewToggle'

interface Article {
  id: string
  title: string
  description: string
  slug: string
  created_at: string
  image_url: string
  category: string
  tags: string[]
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setArticles(data)
      setFilteredArticles(data)
      // Extraire les catégories uniques
      const uniqueCategories = Array.from(new Set(data.map(article => article.category)))
      setCategories(uniqueCategories.filter(Boolean) as string[])
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterArticles(query, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterArticles(searchQuery, category)
  }

  const filterArticles = (query: string, category: string) => {
    let filtered = articles
    
    if (query) {
      const searchLower = query.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    if (category) {
      filtered = filtered.filter(article => article.category === category)
    }

    setFilteredArticles(filtered)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
        <section className="relative py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
              Blog
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
              <div className="flex-1">
                <SearchBar 
                  onSearch={handleSearch}
                  onCategoryChange={handleCategoryChange}
                  categories={categories}
                />
              </div>
              <ViewToggle view={view} onViewChange={setView} />
            </div>

            {/* Featured Article */}
            {filteredArticles[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <Link href={`/blog/${filteredArticles[0].slug}`}>
                  <div className="group relative h-[400px] rounded-xl overflow-hidden">
                    <img
                      src={filteredArticles[0].image_url}
                      alt={filteredArticles[0].title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-sm backdrop-blur-xl">
                          {filteredArticles[0].category}
                        </span>
                        <time className="text-white/70 text-sm">
                          {format(new Date(filteredArticles[0].created_at), 'dd MMMM yyyy', { locale: fr })}
                        </time>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {filteredArticles[0].title}
                      </h2>
                      <p className="text-white/80 line-clamp-2 text-sm">
                        {filteredArticles[0].description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Articles List/Grid */}
            <div className={view === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link href={`/blog/${article.slug}`}>
                    <article className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-all duration-300 ${
                      view === 'list' ? 'flex' : ''
                    }`}>
                      <div className={`relative overflow-hidden ${
                        view === 'list' ? 'w-32 shrink-0' : 'aspect-[3/2]'
                      }`}>
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className={`p-3 flex flex-col ${
                        view === 'list' ? 'flex-1' : ''
                      }`}>
                        <time className="text-xs text-gray-500 mb-1">
                          {format(new Date(article.created_at), 'dd MMM yyyy', { locale: fr })}
                        </time>
                        <h2 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 text-xs line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination si nécessaire */}
            {filteredArticles.length > 12 && (
              <div className="mt-8 flex justify-center">
                <div className="join">
                  <button className="join-item btn btn-sm">«</button>
                  <button className="join-item btn btn-sm">1</button>
                  <button className="join-item btn btn-sm btn-active">2</button>
                  <button className="join-item btn btn-sm">3</button>
                  <button className="join-item btn btn-sm">»</button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
