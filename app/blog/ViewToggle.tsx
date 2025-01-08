'use client'

import { Grid, LayoutList } from 'lucide-react'

interface ViewToggleProps {
  view: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-base-200/50 backdrop-blur-xl p-1 rounded-lg">
      <button
        type="button"
        onClick={() => onViewChange('grid')}
        className={`p-1.5 rounded-md transition-colors ${
          view === 'grid'
            ? 'bg-primary text-primary-content'
            : 'text-base-content/70 hover:bg-base-300'
        }`}
        title="Vue en grille"
      >
        <Grid size={18} />
      </button>
      <button
        type="button"
        onClick={() => onViewChange('list')}
        className={`p-1.5 rounded-md transition-colors ${
          view === 'list'
            ? 'bg-primary text-primary-content'
            : 'text-base-content/70 hover:bg-base-300'
        }`}
        title="Vue en liste"
      >
        <LayoutList size={18} />
      </button>
    </div>
  )
}
