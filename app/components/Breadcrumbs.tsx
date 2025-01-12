'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import Script from 'next/script';

interface BreadcrumbItem {
  href: string;
  label: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Ignorer la page d'accueil
  if (pathname === '/') return null;

  // Convertir le chemin en items de breadcrumb
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = formatLabel(segment);
    return { href, label };
  });

  // Ajouter la page d'accueil au début
  breadcrumbItems.unshift({ href: '/', label: 'Accueil' });

  // Générer les données structurées pour le SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `https://cvdiali.com${item.href}`,
        name: item.label,
      },
    })),
  };

  return (
    <>
      <Script
        id="breadcrumbs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Fil d'Ariane" className="bg-gray-50 mt-16 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index === 0 ? (
                  <Link
                    href={item.href}
                    className="flex items-center hover:text-violet-600 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" aria-hidden="true" />
                    {index === breadcrumbItems.length - 1 ? (
                      <span className="font-medium text-gray-900" aria-current="page">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="hover:text-violet-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}

// Fonction pour formater les labels
function formatLabel(segment: string): string {
  const labels: { [key: string]: string } = {
    'outils': 'Outils',
    'blog': 'Blog',
    'immigration': 'Immigration',
    'confidentialite': 'Confidentialité',
    'tcf': 'TCF Canada',
    'visa-interview': 'Entretien Visa',
    'analyseur-cv': 'Analyseur de CV',
    'lettre-motivation': 'Lettre de Motivation',
    'entretien': 'Simulation d\'Entretien',
  };

  return labels[segment] || segment.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());
}
