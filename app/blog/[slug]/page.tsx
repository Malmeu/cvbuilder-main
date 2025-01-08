import { use } from 'react'
import Navbar from '../../components/Navbar'
import ArticleContent from './ArticleContent'

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
        <ArticleContent slug={resolvedParams.slug} />
      </main>
    </>
  )
}