'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => {
    const { Editor } = mod;
    return function EditorWithNoSSR(props: any) {
      return <Editor {...props} />;
    };
  }),
  { ssr: false }
)

interface Article {
  id: string
  title: string
  description: string
  slug: string
  meta_description: string
  image_url: string
  author: string
  content: string
  created_at: string
  category: string
  tags: string[]
}

const articleSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  description: z.string().min(1, 'La description est requise'),
  meta_description: z.string().min(1, 'La meta description est requise'),
  image_url: z.string().url('URL d\'image invalide'),
  author: z.string().min(1, 'L\'auteur est requis'),
  category: z.string().min(1, 'La catégorie est requise'),
  tags: z.string().transform(str => str.split(',').map(tag => tag.trim()).filter(Boolean))
})

type ArticleFormData = z.infer<typeof articleSchema>

export default function AdminBlog() {
  const [content, setContent] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema)
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setArticles(data)
  }

  async function onSubmit(data: ArticleFormData) {
    const articleData = {
      ...data,
      content,
    }

    if (isEditing) {
      await supabase
        .from('articles')
        .update(articleData)
        .eq('id', currentArticleId)
    } else {
      await supabase
        .from('articles')
        .insert([articleData])
    }

    reset()
    setContent('')
    setIsEditing(false)
    setCurrentArticleId(null)
    fetchArticles()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Administration du Blog
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="bg-base-200/50 backdrop-blur-xl p-6 rounded-2xl border border-base-300">
            <h2 className="text-2xl font-semibold mb-6">
              {isEditing ? 'Modifier l&apos;article' : 'Nouvel article'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="label">Titre</label>
                <input
                  {...register('title')}
                  className="input input-bordered w-full"
                  placeholder="Titre de l&apos;article"
                />
                {errors.title && (
                  <span className="text-error text-sm">{errors.title.message}</span>
                )}
              </div>

              <div>
                <label className="label">Slug</label>
                <input
                  {...register('slug')}
                  className="input input-bordered w-full"
                  placeholder="mon-article"
                />
                {errors.slug && (
                  <span className="text-error text-sm">{errors.slug.message}</span>
                )}
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  {...register('description')}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
                {errors.description && (
                  <span className="text-error text-sm">{errors.description.message}</span>
                )}
              </div>

              <div>
                <label className="label">Meta Description (SEO)</label>
                <textarea
                  {...register('meta_description')}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
                {errors.meta_description && (
                  <span className="text-error text-sm">{errors.meta_description.message}</span>
                )}
              </div>

              <div>
                <label className="label">L&apos;URL de l&apos;image</label>
                <input
                  {...register('image_url')}
                  className="input input-bordered w-full"
                  placeholder="https://..."
                />
                {errors.image_url && (
                  <span className="text-error text-sm">{errors.image_url.message}</span>
                )}
              </div>

              <div>
                <label className="label">L&apos;auteur</label>
                <input
                  {...register('author')}
                  className="input input-bordered w-full"
                  placeholder="Nom de l&apos;auteur"
                />
                {errors.author && (
                  <span className="text-error text-sm">{errors.author.message}</span>
                )}
              </div>

              <div>
                <label className="label">Catégorie</label>
                <input
                  {...register('category')}
                  className="input input-bordered w-full"
                  placeholder="Ex: Conseils CV"
                />
                {errors.category && (
                  <span className="text-error text-sm">{errors.category.message}</span>
                )}
              </div>

              <div>
                <label className="label">Tags (séparés par des virgules)</label>
                <input
                  {...register('tags')}
                  className="input input-bordered w-full"
                  placeholder="cv, emploi, carrière"
                />
                {errors.tags && (
                  <span className="text-error text-sm">{errors.tags.message}</span>
                )}
              </div>

              <div>
                <label className="label">Contenu</label>
                <Editor
                  apiKey="s7lvizn9waqfyn4fabavdbftotdss1ih9bmu1a4lt18e9033"
                  value={content}
                  onEditorChange={(content: string) => setContent(content)}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    language: 'fr_FR',
                    skin: 'oxide-dark',
                    content_css: 'dark'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                {isEditing ? 'Mettre à jour' : 'Publier'}
              </button>
            </form>
          </div>

          {/* Liste des articles */}
          <div className="bg-base-200/50 backdrop-blur-xl p-6 rounded-2xl border border-base-300">
            <h2 className="text-2xl font-semibold mb-6">Articles publiés</h2>
            <div className="space-y-4">
              {articles.map((article: Article) => (
                <div
                  key={article.id}
                  className="p-4 bg-base-100 rounded-xl border border-base-300"
                >
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-sm text-base-content/70 mt-1">{article.description}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setCurrentArticleId(article.id)
                        reset(article)
                        setContent(article.content)
                      }}
                      className="btn btn-sm btn-outline"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                          await supabase
                            .from('articles')
                            .delete()
                            .eq('id', article.id)
                          fetchArticles()
                        }
                      }}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
