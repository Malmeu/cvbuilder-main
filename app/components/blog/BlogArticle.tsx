'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArticleContent } from './ArticleContent';

interface BlogArticleProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  coverImage?: string;
  category: string;
  readingTime: string;
  author: {
    name: string;
    image: string;
  };
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'CV': 'bg-violet-100 text-violet-800',
    'Visa': 'bg-blue-100 text-blue-800',
    'Immigration': 'bg-green-100 text-green-800',
    'Emploi': 'bg-orange-100 text-orange-800',
    'default': 'bg-gray-100 text-gray-800'
  };
  return colors[category] || colors.default;
};

export function BlogArticle({
  title,
  description,
  slug,
  date,
  coverImage,
  category,
  readingTime,
  author,
  content
}: BlogArticleProps & { content?: string }) {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy', { locale: fr });
  const categoryColor = getCategoryColor(category);

  return (
    <Link href={`/blog/${slug}`}>
      <article className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* En-tête de l'article */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
              {category}
            </span>
            <span className="text-sm text-gray-500">{readingTime}</span>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900">{author.name}</span>
                <time className="text-sm text-gray-500">{formattedDate}</time>
              </div>
            </div>
          </div>
        </div>

        {/* Image de couverture */}
        {coverImage && (
          <div className="relative w-full h-[400px] border-b border-gray-100">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Contenu de l'article */}
        <div className="p-6 lg:p-8">
          {content ? (
            <ArticleContent content={content} />
          ) : (
            <p className="text-gray-700 mb-4">{description}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
