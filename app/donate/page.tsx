'use client'

import { 
  Coffee, 
  Heart, 
  Server, 
  DollarSign, 
  Shield, 
  Zap 
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Soutenez CVDiali
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un projet communautaire pour démocratiser l'accès aux outils de carrière et d'immigration
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <Coffee className="w-8 h-8 text-purple-600 mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Pourquoi faire un don ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <Server className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Coûts des APIs IA</h3>
              <p className="text-gray-600">
                Chaque outil utilise des APIs d'intelligence artificielle qui ont un coût réel. 
                Vos dons aident à maintenir ces services et à garder le site gratuit.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <Heart className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Développement Continu</h3>
              <p className="text-gray-600">
                Soutenez le développement de nouveaux outils, l'amélioration continue 
                et le maintien de l'infrastructure du site.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-green-600 mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Transparence et Engagement
            </h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              CVDiali est et restera <strong>100% gratuit</strong>. Les dons ne sont 
              <strong> jamais obligatoires</strong>. Ils sont simplement une façon 
              pour la communauté de soutenir un projet open-source.
            </p>
            <p>
              Chaque don aide à :
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>Maintenir les services IA</li>
                <li>Développer de nouveaux outils</li>
                <li>Améliorer l'expérience utilisateur</li>
                <li>Garder le site accessible à tous</li>
              </ul>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <DollarSign className="w-8 h-8 text-emerald-600 mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Options de Don
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4">Baridi Mob</h3>
              <p className="text-gray-600 mb-4">
                Numéro de compte : <strong>XXXX XXXX XXXX XXXX</strong>
              </p>
              <button 
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                onClick={() => navigator.clipboard.writeText('XXXX XXXX XXXX XXXX')}
              >
                Copier le numéro
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4">CCP Algérie</h3>
              <p className="text-gray-600 mb-4">
                Numéro de compte : <strong>YYYY YYYY YYYY YYYY</strong>
              </p>
              <button 
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                onClick={() => navigator.clipboard.writeText('YYYY YYYY YYYY YYYY')}
              >
                Copier le numéro
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              <Zap className="inline-block w-4 h-4 mr-2 text-yellow-500" />
              D'autres options de paiement seront bientôt disponibles
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Merci de soutenir CVDiali et sa mission de démocratisation des outils professionnels !
          </p>
          <Link 
            href="/" 
            className={cn(buttonVariants({ variant: 'default' }), 'inline-flex items-center')}
          >
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
