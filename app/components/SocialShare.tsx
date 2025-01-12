'use client';

import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function SocialShare({ url, title, description, className = '' }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        text: description,
        url,
      });
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  };

  const isWebShareSupported = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 transition-colors"
        aria-label="Partager sur Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-sky-500 transition-colors"
        aria-label="Partager sur Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-700 transition-colors"
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      {isWebShareSupported && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="text-gray-600 hover:text-violet-600"
          aria-label="Partager via..."
        >
          <Share2 className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
