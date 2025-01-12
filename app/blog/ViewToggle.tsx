'use client';

import { Grid2X2, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          view === 'grid'
            ? 'bg-violet-100 text-violet-700'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
        aria-label="Vue en grille"
      >
        <Grid2X2 className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-md transition-colors ${
          view === 'list'
            ? 'bg-violet-100 text-violet-700'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
        aria-label="Vue en liste"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
