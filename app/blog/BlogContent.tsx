'use client';

import { BlogArticle } from '../components/blog/BlogArticle';
import SearchBar from './SearchBar';
import ViewToggle from './ViewToggle';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  image_url: string;
  category: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
}

interface BlogArticleProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  coverImage: string;
  category: string;
  readingTime: string;
  author: {
    name: string;
    image: string;
  };
}

interface BlogContentProps {
  categories?: Category[];
}

export function BlogContent({ categories: predefinedCategories = [] }: BlogContentProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>(predefinedCategories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      return;
    }

    if (data) {
      setArticles(data);
      setFilteredArticles(data);
      const uniqueCategories = Array.from(new Set(data.map(article => article.category)))
        .filter(Boolean)
        .map(category => ({
          id: category,
          name: category
        }));
      setCategories([...predefinedCategories, ...uniqueCategories]);
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterArticles(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterArticles(searchQuery, category);
  };

  const filterArticles = (query: string, category: string) => {
    let filtered = articles;
    
    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (category) {
      filtered = filtered.filter(article => article.category === category);
    }

    setFilteredArticles(filtered);
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog CV Diali',
    description: 'Articles et conseils sur l\'emploi, l\'immigration et le développement de carrière',
    url: 'https://cvdiali.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'CV Diali',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cvdiali.com/logo.png'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      
      <Breadcrumbs />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Blog CV Diali
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Découvrez nos articles sur la création de CV, la recherche d'emploi,
          l'immigration et le développement professionnel.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <SearchBar onSearch={handleSearch} onCategoryChange={handleCategoryChange} categories={categories} />
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        <div className={view === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredArticles.map((article: Article) => (
            <BlogArticle 
              key={article.id}
              title={article.title}
              description={article.description}
              slug={article.slug}
              date={article.created_at}
              coverImage={article.image_url}
              category={article.category}
              readingTime="5 min de lecture"
              author={{
                name: "CV Diali",
                image: "/images/logo.png"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
