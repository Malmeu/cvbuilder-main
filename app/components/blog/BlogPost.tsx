'use client';

import { OptimizedImage } from '../OptimizedImage';
import { formatDate } from '@/lib/utils';
import { SocialShare } from '../SocialShare';

interface BlogPostProps {
  title: string;
  content: string;
  date: string;
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  coverImage?: string;
  category: string;
  readingTime: string;
  slug: string;
}

export function BlogPost({
  title,
  content,
  date,
  author,
  coverImage,
  category,
  readingTime,
  slug,
}: BlogPostProps) {
  const articleUrl = `https://cvdiali.com/blog/${slug}`;

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {coverImage && (
        <div className="relative h-[400px] overflow-hidden">
          <OptimizedImage
            src={coverImage}
            alt={title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
      )}
      
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
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

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h1>

        <div className="flex items-center justify-between py-4 border-y border-gray-200 mb-8">
          <div className="flex items-center gap-3">
            {author.image && (
              <OptimizedImage
                src={author.image}
                alt={author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <span className="block text-gray-900 font-medium">
                {author.name}
              </span>
              {author.bio && (
                <span className="text-sm text-gray-600">
                  {author.bio}
                </span>
              )}
            </div>
          </div>

          <SocialShare
            url={articleUrl}
            title={title}
            description="Découvrez cet article intéressant sur CV Diali"
            className="ml-4"
          />
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Partagez cet article</h2>
          <SocialShare
            url={articleUrl}
            title={title}
            description="Découvrez cet article intéressant sur CV Diali"
          />
        </div>
      </div>
    </article>
  );
}
