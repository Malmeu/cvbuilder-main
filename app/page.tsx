'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, Wand2, Download, Check } from 'lucide-react'
import Image from 'next/image'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
        {/* Hero Section avec effet de verre */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Cercles décoratifs style Apple */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Créez votre CV
                  <span className="block text-base-content mt-2">comme jamais avant</span>
                </h1>
                <p className="mt-8 text-xl leading-relaxed text-base-content/80 font-light">
                  Une expérience unique et intuitive pour créer votre CV professionnel. 
                  Design moderne, animations fluides, et une touche de magie.
                </p>

                <div className="mt-12 flex flex-wrap gap-4">
                  <Link href="/builder" 
                    className="relative group px-8 py-4 bg-primary text-primary-content rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <span className="relative z-10 flex items-center gap-2 text-lg">
                      Créer mon CV
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <Link href="/canadian-builder"
                    className="relative group px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white/20">
                    <span className="relative z-10 flex items-center gap-2 text-lg">
                      Format Canadien
                      <MapPin className="w-5 h-5" />
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Image avec effet de flottement amélioré */}
              <div className="relative w-full h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl" />
                <div className="animate-float-slow transform-gpu">
                  <div className="relative w-full h-[600px] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10">
                    <Image
                      src="/cv1.png"
                      alt="Modèle de CV"
                      fill
                      className="object-contain p-8"
                      priority
                    />
                    {/* Reflets style Apple */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </div>
              </div>
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

        {/* Section Importance du CV avec design amélioré */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-primary/5" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              L&apos;importance d&apos;un CV bien structuré
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="group relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-white/20 shadow-xl hover:shadow-primary/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Première impression décisive
                </h3>
                <p className="text-base-content/80 leading-relaxed relative z-10">
                  Votre CV est la première image que les recruteurs ont de vous. En moyenne, ils passent moins de 30 secondes à examiner chaque candidature. Un CV professionnel, clair et bien structuré augmente significativement vos chances d&apos;obtenir un entretien.
                </p>
              </motion.div>
              <motion.div 
                className="group relative p-8 backdrop-blur-md bg-white/80 rounded-3xl border border-secondary/20 shadow-xl hover:shadow-secondary/20 transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                  Adapté à votre marché cible
                </h3>
                <p className="text-base-content/80 leading-relaxed relative z-10">
                  Que vous postuliez en France ou au Canada, notre créateur de CV s&apos;adapte aux spécificités locales. Formats, rubriques, terminologie : tout est optimisé pour maximiser l&apos;impact de votre candidature selon votre marché cible.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Modèles avec design amélioré */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-base-200 to-base-100" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Choisissez votre modèle
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div 
                className="group relative bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="aspect-w-4 aspect-h-3 bg-base-200">
                  <Image
                    src="/cv1.png"
                    alt="CV Classique"
                    fill
                    className="object-cover p-4"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    CV Classique
                  </h3>
                  <p className="text-base-content/80 mb-6">
                    Un modèle professionnel et polyvalent, parfait pour la plupart des secteurs. Design moderne et efficace.
                  </p>
                  <Link 
                    href="/builder"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-content rounded-xl hover:opacity-90 transition-opacity group"
                  >
                    <span className="flex items-center gap-2">
                      Commencer
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                className="group relative bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="aspect-w-4 aspect-h-3 bg-base-200">
                  <Image
                    src="/cv2.png"
                    alt="CV Canadien"
                    fill
                    className="object-cover p-4"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                    CV Canadien
                  </h3>
                  <p className="text-base-content/80 mb-6">
                    Optimisé pour le marché canadien, avec les spécificités locales. Format adapté aux attentes nord-américaines.
                  </p>
                  <Link 
                    href="/canadian-builder"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-secondary text-secondary-content rounded-xl hover:opacity-90 transition-opacity group"
                  >
                    <span className="flex items-center gap-2">
                      Commencer
                      <MapPin className="w-5 h-5" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Avantages avec design amélioré */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-base-200/50 to-base-100/50" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Pourquoi utiliser notre créateur de CV
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div 
                className="group relative p-8 bg-base-100 rounded-3xl shadow-xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Gain de temps</h3>
                <p className="text-base-content/80 text-center">
                  Créez votre CV en quelques minutes grâce à notre interface intuitive et nos modèles préconçus.
                </p>
              </motion.div>

              <motion.div 
                className="group relative p-8 bg-base-100 rounded-3xl shadow-xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wand2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Design professionnel</h3>
                <p className="text-base-content/80 text-center">
                  Des modèles élégants et modernes, conçus pour maximiser vos chances d&apos;obtenir un entretien.
                </p>
              </motion.div>

              <motion.div 
                className="group relative p-8 bg-base-100 rounded-3xl shadow-xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Export facile</h3>
                <p className="text-base-content/80 text-center">
                  Téléchargez votre CV en PDF haute qualité, prêt à être envoyé aux recruteurs.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Conseils */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-base-200 to-base-100" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Conseils pour un CV parfait
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src="/tips.png"
                  alt="Conseils CV"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-xl"
                />
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Soyez concis</h3>
                    <p className="text-base-content/80">
                      Un CV efficace doit tenir sur 1-2 pages maximum. Privilégiez les informations pertinentes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personnalisez</h3>
                    <p className="text-base-content/80">
                      Adaptez votre CV en fonction du poste visé. Mettez en avant les compétences pertinentes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Utilisez des mots-clés</h3>
                    <p className="text-base-content/80">
                      Intégrez les mots-clés de l&apos;offre d&apos;emploi pour passer les filtres ATS.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Outils IA */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-primary/5 to-secondary/5" />
          <div className="max-w-7xl mx-auto relative">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nos Outils Intelligents
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Analyseur de CV */}
              <motion.div 
                className="group relative p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/20 shadow-xl hover:shadow-primary/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Analyseur de CV
                </h3>
                <p className="text-base-content/80 leading-relaxed mb-6 relative z-10">
                  Notre IA analyse votre CV et fournit des recommandations personnalisées pour l&apos;améliorer. Optimisez votre CV pour les ATS et augmentez vos chances de succès.
                </p>
                <Link 
                  href="/outils/analyseur-cv"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors relative z-10"
                >
                  Analyser mon CV
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>

              {/* Préparation d'Entretien */}
              <motion.div 
                className="group relative p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/20 shadow-xl hover:shadow-secondary/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                  Préparation d&apos;Entretien
                </h3>
                <p className="text-base-content/80 leading-relaxed mb-6 relative z-10">
                  Obtenez des questions personnalisées et des conseils sur mesure pour votre prochain entretien. Notre IA s&apos;adapte au poste et à l&apos;entreprise visés.
                </p>
                <Link 
                  href="/outils/entretien"
                  className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors relative z-10"
                >
                  Préparer mon entretien
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>

              {/* Simulateur de Lettre de Motivation */}
              <motion.div 
                className="group relative p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/20 shadow-xl hover:shadow-accent/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  Lettre de Motivation
                </h3>
                <p className="text-base-content/80 leading-relaxed mb-6 relative z-10">
                  Générez une lettre de motivation percutante adaptée à votre profil et au poste visé. Notre IA personnalise le contenu pour maximiser votre impact.
                </p>
                <Link 
                  href="/outils/lettre-motivation"
                  className="inline-flex items-center text-accent hover:text-accent/80 transition-colors relative z-10"
                >
                  Créer ma lettre
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Call-to-Action */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
          <div className="max-w-4xl mx-auto relative">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Prêt à créer votre CV ?
              </h2>
              <p className="text-xl text-base-content/80 mb-12">
                Commencez dès maintenant et décrochez le job de vos rêves
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-content rounded-full hover:opacity-90 transition-opacity group"
              >
                <span className="flex items-center gap-2 text-lg">
                  Créer mon CV gratuitement
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">CV Diali</h3>
                <p className="text-base-content/70">
                  Créez votre CV professionnel en quelques minutes
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/builder" className="text-base-content/70 hover:text-primary transition-colors">
                      Créer un CV
                    </Link>
                  </li>
                  <li>
                    <Link href="/canadian-builder" className="text-base-content/70 hover:text-primary transition-colors">
                      CV Canadien
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base-content/70 hover:text-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Légal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/confidentialite" className="text-base-content/70 hover:text-primary transition-colors">
                      Confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link href="/conditions" className="text-base-content/70 hover:text-primary transition-colors">
                      Conditions d&apos;utilisation
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-base-content/70">
                    Email: cvdiali.contact@gmail.com
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-base-content/10 mt-12 pt-8 text-center text-base-content/60">
              <p>&copy; {new Date().getFullYear()} CV Diali. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
