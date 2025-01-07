'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 backdrop-blur-xl" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              L&apos;importance d&apos;un CV bien structuré
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Première impression décisive
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Votre CV est la première image que les recruteurs ont de vous. En moyenne, ils passent moins de 30 secondes à examiner chaque candidature. Un CV professionnel, clair et bien structuré augmente significativement vos chances d&apos;obtenir un entretien.
                </p>
              </motion.div>
              <motion.div 
                className="relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Adapté à votre marché cible
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Que vous postuliez en France ou au Canada, notre créateur de CV s&apos;adapte aux spécificités locales. Formats, rubriques, terminologie : tout est optimisé pour maximiser l&apos;impact de votre candidature selon votre marché cible.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Premier emplacement publicitaire */}
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-gray-50 rounded-xl p-4 min-h-[90px] flex items-center justify-center">
            <div id="accueil-banner-1" className="text-center text-gray-400">
              Emplacement publicitaire
            </div>
          </div>
        </div>

        {/* Section Importance du CV */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 backdrop-blur-xl" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              L&apos;importance d&apos;un CV bien structuré
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Première impression décisive
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Votre CV est la première image que les recruteurs ont de vous. En moyenne, ils passent moins de 30 secondes à examiner chaque candidature. Un CV professionnel, clair et bien structuré augmente significativement vos chances d&apos;obtenir un entretien.
                </p>
              </motion.div>
              <motion.div 
                className="relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Adapté à votre marché cible
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Que vous postuliez en France ou au Canada, notre créateur de CV s&apos;adapte aux spécificités locales. Formats, rubriques, terminologie : tout est optimisé pour maximiser l&apos;impact de votre candidature selon votre marché cible.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Modèles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Choisissez votre modèle
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  {/* Image du CV classique */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">CV Classique</h3>
                  <p className="text-gray-600 mb-4">Un modèle professionnel et polyvalent, parfait pour la plupart des secteurs.</p>
                  <Link 
                    href="/builder"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Commencer
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  {/* Image du CV canadien */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">CV Canadien</h3>
                  <p className="text-gray-600 mb-4">Optimisé pour le marché canadien, avec les spécificités locales.</p>
                  <Link 
                    href="/canadian-builder"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Commencer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deuxième emplacement publicitaire */}
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-gray-50 rounded-xl p-4 min-h-[250px] flex items-center justify-center">
            <div id="accueil-rectangle-1" className="text-center text-gray-400">
              Emplacement publicitaire
            </div>
          </div>
        </div>

        {/* Section Avantages */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Pourquoi utiliser notre créateur de CV
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gain de temps</h3>
                <p className="text-gray-600">Créez votre CV professionnel en moins de 15 minutes grâce à nos modèles optimisés</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Formats optimisés</h3>
                <p className="text-gray-600">Export PDF haute qualité, compatible avec tous les systèmes de recrutement ATS</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Gratuit</h3>
                <p className="text-gray-600">Accès gratuit à toutes les fonctionnalités, sans limitation ni frais cachés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Conseils CV */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-xl" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Conseils pour un CV parfait
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Structure efficace
                </h3>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-start text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full" />
                    Commencez par un résumé professionnel percutant
                  </motion.li>
                  <motion.li 
                    className="flex items-start text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full" />
                    Mettez en avant vos réalisations plutôt que vos responsabilités
                  </motion.li>
                  <motion.li 
                    className="flex items-start text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full" />
                    Utilisez des mots-clés pertinents pour votre secteur
                  </motion.li>
                </ul>
              </motion.div>
              <motion.div 
                className="relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Erreurs à éviter
                </h3>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-start text-gray-600"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full" />
                    Ne surchargez pas votre CV avec trop d&apos;informations
                  </motion.li>
                  <motion.li 
                    className="flex items-start text-gray-600"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full" />
                    Évitez les fautes d&apos;orthographe et de grammaire
                  </motion.li>
                  <motion.li 
                    className="flex items-start text-gray-600"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full" />
                    Ne mentionnez pas d&apos;informations personnelles sensibles
                  </motion.li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Troisième emplacement publicitaire */}
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-gray-50 rounded-xl p-4 min-h-[90px] flex items-center justify-center">
            <div id="accueil-banner-2" className="text-center text-gray-400">
              Emplacement publicitaire
            </div>
          </div>
        </div>

        {/* Section CTA finale */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à créer votre CV ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Commencez gratuitement et obtenez un CV professionnel en quelques minutes
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/builder"
                className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Créer mon CV classique
              </Link>
              <Link 
                href="/canadian-builder"
                className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Créer mon CV canadien
              </Link>
            </div>
          </div>
        </section>

        {/* Script AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4559991197605180"
          crossOrigin="anonymous"
        />
      </main>

      {/* Footer minimaliste style Apple */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-4">Créateur de CV</h4>
              <ul className="space-y-2">
                <li><Link href="/builder" className="text-sm text-gray-600 hover:text-gray-900">CV Classique</Link></li>
                <li><Link href="/canadian-builder" className="text-sm text-gray-600 hover:text-gray-900">CV Canadien</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">Conseils CV</Link></li>
                <li><Link href="/examples" className="text-sm text-gray-600 hover:text-gray-900">Exemples de CV</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Confidentialité</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Conditions d&apos;utilisation</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              &copy; {new Date().getFullYear()} CV Builder. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
