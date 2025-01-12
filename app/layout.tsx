import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";
import Navbar from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import { Footer } from './components/Footer';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cvdiali.com'),
  title: {
    default: 'CV Diali | Créateur de CV Professionnel et Simulateur Visa',
    template: '%s | CV Diali'
  },
  description: 'Créez votre CV professionnel format canadien et préparez votre entretien visa avec notre simulateur IA. Conseils d\'experts et outils gratuits pour réussir.',
  keywords: ['cv canadien', 'créateur cv', 'simulateur visa', 'entretien visa', 'cv professionnel', 'immigration canada', 'préparation visa'],
  authors: [{ name: 'CV Diali' }],
  creator: 'CV Diali',
  publisher: 'CV Diali',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://cvdiali.com',
    siteName: 'CV Diali',
    title: 'CV Diali - Votre Partenaire pour l\'Immigration au Canada',
    description: 'Créez votre CV format canadien et préparez votre entretien visa. Outils professionnels et conseils d\'experts gratuits.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CV Diali - Créateur de CV et Simulateur Visa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Diali - Créateur de CV et Simulateur Visa',
    description: 'Créez votre CV format canadien et préparez votre entretien visa. Outils professionnels gratuits.',
    images: ['/images/og-image.jpg'],
    creator: '@cvdiali',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://cvdiali.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Préchargement des ressources critiques */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/your-main-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* AddThis Social Sharing */}
        <script 
          type="text/javascript" 
          src="//s7.addthis.com/js/300/addthis_widget.js#pubid=your-addthis-id"
          async
        />

        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CV Diali',
              url: 'https://cvdiali.com',
              logo: 'https://cvdiali.com/logo.png',
              sameAs: [
                'https://facebook.com/cvdiali',
                'https://twitter.com/cvdiali',
                'https://linkedin.com/company/cvdiali',
                'https://instagram.com/cvdiali'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-xxx-xxx-xxxx',
                contactType: 'customer service',
                availableLanguage: ['French', 'English']
              }
            })
          }}
        />
      </head>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen flex flex-col bg-gray-50`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsent language="fr" />
        <Analytics />
      </body>
    </html>
  );
}
