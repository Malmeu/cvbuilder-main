import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CVDiali - Créateur de CV Professionnel",
  description: "Créez votre CV professionnel en quelques minutes avec CVDiali. Outils gratuits pour la création de CV, lettres de motivation et préparation aux entretiens.",
  keywords: "cv, création cv, lettre motivation, entretien, emploi, recrutement, carrière",
  metadataBase: new URL('https://cvdiali.com'),
  authors: [{ name: "CV Diali" }],
  verification: {
    google: 'VOTRE_CODE_DE_VERIFICATION'
  },
  robots: {
    index: true,
    follow: true
  },
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "CV Diali - Créez votre CV professionnel",
    description: "Créez votre CV professionnel en quelques clics. Découvrez nos conseils et astuces pour réussir votre recherche d'emploi sur notre blog.",
    type: "website",
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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4559991197605180"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
