'use client';

import { Grid2X2, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-colors ${
          view === 'grid' ? 'bg-primary text-white' : 'bg-base-200 hover:bg-base-300'
        }`}
        aria-label="Vue grille"
      >
        <Grid2X2 className="h-5 w-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-colors ${
          view === 'list' ? 'bg-primary text-white' : 'bg-base-200 hover:bg-base-300'
        }`}
        aria-label="Vue liste"
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  );
}
