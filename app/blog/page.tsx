import { Metadata } from 'next';
import { BlogContent } from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog CV Diali | Conseils Emploi, Immigration et Développement de Carrière',
  description: 'Découvrez nos articles sur la création de CV, la recherche d\'emploi, l\'immigration au Canada et le développement professionnel. Conseils d\'experts et guides pratiques.',
  keywords: 'blog emploi, conseils cv, immigration canada, carrière, développement professionnel, lettre motivation, entretien embauche',
  openGraph: {
    title: 'Blog CV Diali | Conseils Carrière et Immigration',
    description: 'Articles et guides pratiques pour votre carrière et vos projets d\'immigration',
    images: [
      {
        url: '/images/blog-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog CV Diali',
      },
    ],
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
