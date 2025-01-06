'use client';

import { useEffect, useRef } from 'react';

interface Props {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: Props) {
  const advertRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (advertRef.current && !isLoaded.current) {
      try {
        // @ts-expect-error - La variable adsbygoogle est injectée par le script Google
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (error) {
        console.error('Erreur lors du chargement de la publicité:', error);
      }
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} ref={advertRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4559991197605180"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
