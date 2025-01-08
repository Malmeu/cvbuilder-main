import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CV Diali - Créez votre CV professionnel",
  description: "Créez votre CV professionnel gratuitement avec CV Diali. Choisissez parmi nos modèles modernes et personnalisables.",
  metadataBase: new URL('https://cvdiali.com'),
  keywords: "cv, curriculum vitae, création cv, modèle cv, cv professionnel, cv en ligne, cv canadien, conseils cv, blog emploi",
  authors: [{ name: "CV Diali" }],
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
    <html lang="fr" data-theme="light">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4559991197605180"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
