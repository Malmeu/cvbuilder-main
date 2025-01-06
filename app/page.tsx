import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FileText, Sparkles, Target, MapPin, Languages } from 'lucide-react'
import AdBanner from './components/AdBanner'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                  Créez votre CV professionnel
                  <span className="block text-base-content">en quelques minutes</span>
                </h1>
                <p className="mt-6 text-xl text-base-content/80">
                  Un outil simple et puissant pour créer un CV qui vous démarque. 
                  Design moderne, personnalisable et export PDF gratuit.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/builder" 
                    className="btn btn-primary btn-lg gap-2">
                    Créer mon CV
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/canadian-builder"
                    className="btn btn-secondary btn-lg gap-2">
                    CV Format Canadien
                    <MapPin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              
              {/* Image flottante */}
              <div className="relative w-full h-[400px]">
                <div className="animate-float hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="relative w-full h-[400px] rounded-xl shadow-2xl overflow-hidden">
                    <Image
                      src="/cv1.png"
                      alt="Modèle de CV"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* AdSense Banner */}
          <div className="mt-16">
            <AdBanner slot="landing-page-hero" format="horizontal" />
          </div>
        </section>

        {/* Section Builders */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Builder Standard */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">CV Standard</h2>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Design moderne et professionnel
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Personnalisation complète
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Export PDF haute qualité
                    </li>
                  </ul>
                  <div className="card-actions justify-end">
                    <Link href="/builder" className="btn btn-primary gap-2">
                      Commencer
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Builder Canadien */}
              <div className="card bg-base-100 shadow-xl border-2 border-primary">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="card-title text-2xl">CV Canadien</h2>
                    <span className="badge badge-primary">Nouveau</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Format adapté au marché canadien
                    </li>
                    <li className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-primary" />
                      Support bilingue FR/EN
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Sections spécifiques au Canada
                    </li>
                  </ul>
                  <div className="card-actions justify-end">
                    <Link href="/canadian-builder" className="btn btn-primary gap-2">
                      Créer mon CV Canadien
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom AdSense */}
        <section className="py-16">
          <AdBanner slot="landing-page-bottom" format="horizontal" />
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-content">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à créer votre CV professionnel ?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/builder" 
                className="btn btn-secondary btn-lg gap-2">
                CV Standard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/canadian-builder" 
                className="btn btn-accent btn-lg gap-2">
                CV Canadien
                <MapPin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
