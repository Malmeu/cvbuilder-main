'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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
  author
}: BlogArticleProps) {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy', { locale: fr });
  const categoryColor = getCategoryColor(category);

  return (
    <Link href={`/blog/${slug}`}>
      <article className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {coverImage && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
              {category}
            </span>
            <span className="text-sm text-gray-500">{readingTime}</span>
          </div>

          <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2">
            {title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">{author.name}</span>
            </div>
            <time className="text-sm text-gray-500">{formattedDate}</time>
          </div>

          <div className="mt-4 flex items-center text-violet-600 text-sm font-medium">
            Lire l'article
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
