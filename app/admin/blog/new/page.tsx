'use client'

import { useState } from 'react'
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
  tags: z.string()
})

type FormData = z.infer<typeof articleSchema>

interface ArticleFormData extends Omit<FormData, 'tags'> {
  tags: string[];
  content: string;
  published: boolean;
  created_at: string;
}

export default function NewArticlePage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      author: 'CV Diali',
      category: 'Conseils CV',
      tags: 'cv, emploi, carrière'
    }
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    setError('')
    
    try {
      // Vérifier si le slug existe déjà
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', data.slug)
        .single()

      if (existingArticle) {
        setError('Un article avec ce slug existe déjà')
        return
      }

      const tags = data.tags.split(',').map(tag => tag.trim()).filter(Boolean)

      const articleData: ArticleFormData = {
        title: data.title,
        slug: data.slug.toLowerCase().replace(/\s+/g, '-'),
        description: data.description,
        meta_description: data.meta_description,
        image_url: data.image_url,
        author: data.author,
        category: data.category,
        tags: tags,
        content: content,
        published: false,
        created_at: new Date().toISOString()
      }

      const { error: insertError } = await supabase
        .from('articles')
        .insert([articleData])

      if (insertError) {
        throw insertError
      }

      router.push('/admin/blog')
    } catch (err: any) {
      console.error('Erreur lors de la création:', err)
      setError(err.message || 'Une erreur est survenue lors de la création de l\'article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nouvel Article
          </h1>
          <button
            onClick={() => router.push('/admin/blog')}
            className="btn btn-outline"
          >
            Retour
          </button>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

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
                {loading ? 'Création...' : 'Créer l\'article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
