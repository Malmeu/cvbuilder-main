'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  delay?: number; // Délai en millisecondes avant l'initialisation
}

export const AdUnit = ({ 
  slot, 
  format = 'auto', 
  className = '',
  delay = 0
}: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;

    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (err) {
        console.error('Error loading AdSense:', err);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAdStyle = () => {
    switch (format) {
      case 'rectangle':
        return {
          display: 'inline-block',
          width: '300px',
          height: '250px',
        };
      case 'horizontal':
        return {
          display: 'inline-block',
          width: '728px',
          height: '90px',
        };
      case 'fluid':
        return {
          display: 'block',
          width: '100%',
        };
      default:
        return {
          display: 'block',
          width: '100%',
          height: 'auto',
        };
    }
  };

  return (
    <div ref={adRef} className={`ad-container my-6 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-4559991197605180"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
