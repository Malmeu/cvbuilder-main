import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FileText, Sparkles, Target, MapPin, Languages } from 'lucide-react'
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

        {/* Section Builders avec effet de verre */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-base-200/50 to-base-100/50 backdrop-blur-xl" />
          <div className="max-w-7xl mx-auto relative">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Builder Standard */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl transform transition-transform duration-500 group-hover:scale-105" />
                <div className="relative p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">CV Standard</h2>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-base-content/80">Design moderne et professionnel</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-base-content/80">Personnalisation complète</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-base-content/80">Export PDF haute qualité</span>
                    </li>
                  </ul>
                  <Link href="/builder" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors">
                    Commencer
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Builder Canadien */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent rounded-3xl transform transition-transform duration-500 group-hover:scale-105" />
                <div className="relative p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-semibold">CV Canadien</h2>
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">Nouveau</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <span className="text-base-content/80">Format adapté au marché canadien</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Languages className="w-5 h-5 text-secondary" />
                      <span className="text-base-content/80">Support bilingue FR/EN</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-secondary" />
                      <span className="text-base-content/80">Sections spécifiques au Canada</span>
                    </li>
                  </ul>
                  <Link href="/canadian-builder" 
                    className="inline-flex items-center gap-2 text-secondary hover:text-secondary-focus transition-colors">
                    Créer mon CV Canadien
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section avec effet de verre */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
          <div className="absolute inset-0 backdrop-blur-xl" />
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Prêt à créer votre CV professionnel ?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/builder" 
                className="group px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <span className="flex items-center gap-2 text-lg">
                  CV Standard
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/canadian-builder" 
                className="group px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <span className="flex items-center gap-2 text-lg">
                  CV Canadien
                  <MapPin className="w-5 h-5" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
