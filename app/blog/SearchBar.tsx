'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  categories: string[]
}

export default function SearchBar({ onSearch, onCategoryChange, categories }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Rechercher un article..."
          className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            onSearch(e.target.value)
          }}
        />
      </div>
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="h-9 px-3 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer bg-white"
        defaultValue=""
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
