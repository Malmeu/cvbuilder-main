'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, Wand2, Download, Check, GraduationCap } from 'lucide-react'
import Image from 'next/image'


export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
        {/* Hero Section avec effet de verre */}
        <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Cercles décoratifs avec animation */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  ✨ Créez votre CV en quelques minutes
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Votre CV professionnel
                  </span>
                  <span className="block text-3xl md:text-4xl text-base-content mt-2">
                    en un clic
                  </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl leading-relaxed text-base-content/80">
                  Une plateforme intuitive pour créer des CV qui se démarquent.
                  Designs modernes, formats optimisés pour le Canada, et une expérience
                  utilisateur exceptionnelle.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/builder" 
                    className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-content rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <span className="flex items-center gap-2 text-lg font-medium">
                      Créer mon CV
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <Link href="/canadian-builder"
                    className="group px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white/20">
                    <span className="flex items-center gap-2 text-lg font-medium">
                      Format Canadien
                      <MapPin className="w-5 h-5" />
                    </span>
                  </Link>
                </div>

                {/* Statistiques */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-2xl md:text-3xl font-bold text-primary">10k+</div>
                    <div className="text-sm text-base-content/70">CV créés</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-2xl md:text-3xl font-bold text-secondary">98%</div>
                    <div className="text-sm text-base-content/70">Satisfaction</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 col-span-2 md:col-span-1">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-sm text-base-content/70">Support</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Preview du CV avec effet de flottement */}
              <motion.div 
                className="relative w-full h-[600px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl" />
                <div className="animate-float-slow transform-gpu">
                  <div className="relative w-full h-[600px] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10">
                    <Image
                      src="/cvhero.png"
                      alt="Modèle de CV"
                      fill
                      className="object-contain p-8"
                      priority
                    />
                    {/* Effets de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Caractéristiques */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Pourquoi choisir CV DIALI ?
              </h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Des outils puissants pour créer un CV qui vous ressemble
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Design Intelligent</h3>
                <p className="text-base-content/70">
                  Création intuitive avec des modèles professionnels adaptés à votre secteur
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-secondary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rapide et Efficace</h3>
                <p className="text-base-content/70">
                  Créez votre CV en quelques minutes avec notre interface intuitive
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Export PDF</h3>
                <p className="text-base-content/70">
                  Téléchargez votre CV en PDF, prêt à être envoyé aux recruteurs
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section TCF */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Nouveau
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Préparez-vous au{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      TCF
                    </span>
                  </h2>
                  <p className="text-xl text-base-content/80 mb-8">
                    Une préparation complète et interactive pour le Test de Connaissance du Français. 
                    Améliorez vos compétences en compréhension orale, écrite et en expression.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span>Exercices adaptés à votre niveau</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span>Suivi de progression détaillé</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span>Conseils personnalisés</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/outils/tcf"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Commencer la préparation
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
                  <div className="w-full h-full rounded-2xl bg-base-100/50 backdrop-blur-sm shadow-xl p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-base-content/60">Niveau actuel</div>
                          <div className="text-2xl font-bold">C1</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>75%</span>
                        </div>
                        <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-primary rounded-full" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-base-200">
                          <div className="text-sm text-base-content/60">Exercices</div>
                          <div className="text-xl font-bold">24</div>
                        </div>
                        <div className="p-4 rounded-xl bg-base-200">
                          <div className="text-sm text-base-content/60">Score moyen</div>
                          <div className="text-xl font-bold">85%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

              {/* Simulateur d'Entretien Visa */}
              <motion.div 
                className="group relative p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/20 shadow-xl hover:shadow-accent/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  Entretien Visa
                </h3>
                <p className="text-base-content/80 leading-relaxed mb-6 relative z-10">
                  Simulez votre entretien de visa étudiant avec notre assistant vocal interactif.
                </p>
                <Link 
                  href="/visa-interview"
                  className="inline-flex items-center text-accent hover:text-accent/80 transition-colors relative z-10"
                >
                  Simuler mon entretien
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
      </main>
    </>
  )
}
