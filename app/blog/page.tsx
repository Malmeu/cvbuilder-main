'use client';

import { BlogContent } from './BlogContent';

const CATEGORIES = [
  { id: 'all', name: 'Tous' },
  { id: 'cv', name: 'CV' },
  { id: 'visa', name: 'Visa' },
  { id: 'immigration', name: 'Immigration' },
  { id: 'emploi', name: 'Emploi' }
];

export default function BlogPage() {
  return (
    <BlogContent 
      categories={CATEGORIES}
    />
  );
}
