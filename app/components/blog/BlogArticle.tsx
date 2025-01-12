'use client';

import { OptimizedImage } from '../OptimizedImage';
import Link from 'next/link';
import Script from 'next/script';
import { formatDate } from '@/lib/utils';

interface BlogArticleProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: {
    name: string;
    image?: string;
  };
  coverImage?: string;
  category: string;
  readingTime: string;
}

export function BlogArticle({
  title,
  description,
  slug,
  date,
  author,
  coverImage,
  category,
  readingTime,
}: BlogArticleProps) {
  const articleUrl = `https://cvdiali.com/blog/${slug}`;
  
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: coverImage ? `https://cvdiali.com${coverImage}` : undefined,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author.name,
      image: author.image ? `https://cvdiali.com${author.image}` : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CV Diali',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cvdiali.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    articleSection: category,
    timeRequired: readingTime,
    url: articleUrl
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Script
        id={`article-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <Link href={`/blog/${slug}`} className="block">
        {coverImage && (
          <div className="relative h-48 overflow-hidden">
            <OptimizedImage
              src={coverImage}
              alt={title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              priority={false}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-violet-100 text-violet-700 text-sm font-medium px-2.5 py-0.5 rounded">
              {category}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(date)}
            </span>
            <span className="text-gray-500 text-sm">
              • {readingTime}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-violet-600 transition-colors">
            {title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center gap-3">
            {author.image && (
              <OptimizedImage
                src={author.image}
                alt={author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-sm text-gray-700 font-medium">
              {author.name}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
