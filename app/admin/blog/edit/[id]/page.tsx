'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => {
    const { Editor } = mod
    return function EditorWithNoSSR(props: any) {
      return <Editor {...props} />
    }
  }),
  { ssr: false }
)

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

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema)
  })

  useEffect(() => {
    if (params.id !== 'new') {
      fetchArticle()
    } else {
      setLoading(false)
    }
  }, [params.id])

  async function fetchArticle() {
    try {
      const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      if (article) {
        reset({
          ...article,
          tags: article.tags.join(', ')
        })
        setContent(article.content)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error)
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(data: ArticleFormData) {
    setLoading(true)
    try {
      const articleData = {
        ...data,
        content,
        published: false
      }

      if (params.id === 'new') {
        await supabase
          .from('articles')
          .insert([articleData])
      } else {
        await supabase
          .from('articles')
          .update(articleData)
          .eq('id', params.id)
      }

      router.push('/admin/blog')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setLoading(false)
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {params.id === 'new' ? 'Nouvel Article' : 'Modifier l\'Article'}
          </h1>
          <button
            onClick={() => router.push('/admin/blog')}
            className="btn btn-outline"
          >
            Retour
          </button>
        </div>

        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Titre</label>
                <input
                  {...register('title')}
                  className="input input-bordered w-full"
                  placeholder="Titre de l'article"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">URL de l'image</label>
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
                <label className="label">Auteur</label>
                <input
                  {...register('author')}
                  className="input input-bordered w-full"
                  placeholder="Nom de l'auteur"
                />
                {errors.author && (
                  <span className="text-error text-sm">{errors.author.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/blog')}
                className="btn btn-outline"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
