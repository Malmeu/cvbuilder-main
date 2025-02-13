'use client';

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  categories: Category[];
}

export default function SearchBar({ onSearch, onCategoryChange, categories }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors"
        />
      </div>
      
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors bg-white"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
