import { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import ArticleContent from './ArticleContent'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: {
    slug: string
  }
}

async function getArticle(slug: string) {
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()
  
  return article
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Article non trouvé - CV Diali Blog',
      description: "L'article que vous recherchez n'existe pas",
    }
  }
  
  return {
    title: `${article.title} - CV Diali Blog`,
    description: article.meta_description || article.description || article.content.substring(0, 160),
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug)
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
        <ArticleContent article={article} />
      </main>
    </>
  )
}