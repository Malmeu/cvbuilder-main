import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar'
import CookieConsent from './components/CookieConsent'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "CVDiali - Créateur de CV Professionnel",
    template: "%s | CVDiali"
  },
  description: "Créez votre CV professionnel en quelques minutes avec CVDiali. Outils gratuits pour la création de CV, lettres de motivation et préparation aux entretiens.",
  keywords: "cv, création cv, lettre motivation, entretien, emploi, recrutement, carrière, visa étudiant, immigration canada, tcf canada",
  metadataBase: new URL('https://cvdiali.com'),
  authors: [{ name: "CV Diali" }],
  creator: "CV Diali",
  publisher: "CV Diali",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'VOTRE_CODE_DE_VERIFICATION'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://cvdiali.com",
    title: "CV Diali - Créez votre CV professionnel",
    description: "Créez votre CV professionnel en quelques clics. Découvrez nos conseils et astuces pour réussir votre recherche d'emploi.",
    siteName: "CV Diali",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "CV Diali - Créateur de CV Professionnel",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Diali - Créateur de CV Professionnel',
    description: 'Créez votre CV professionnel en quelques clics avec CVDiali',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cvdiali.com',
    languages: {
      'fr-FR': 'https://cvdiali.com',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CV Diali',
              description: 'Créateur de CV professionnel et outils de recherche d\'emploi',
              url: 'https://cvdiali.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://cvdiali.com/blog/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              },
              sameAs: [
                'https://twitter.com/cvdiali',
                'https://linkedin.com/company/cvdiali'
              ]
            })
          }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <CookieConsent language="fr" />
        <Analytics />
      </body>
    </html>
  );
}
