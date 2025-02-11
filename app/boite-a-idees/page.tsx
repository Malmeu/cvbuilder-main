'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  Send, 
  MessageCircle, 
  Star, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import emailjs from '@emailjs/browser'

// Configuration EmailJS
emailjs.init("yH4zvsKc755StyHmP");

export default function BoiteAIdees() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [idee, setIdee] = useState('')
  const [categorie, setCategorie] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation de base
    if (!nom || !email || !idee) {
      toast({
        title: 'Champs incomplets',
        description: 'Veuillez remplir tous les champs obligatoires',
        variant: 'destructive'
      })
      setIsSubmitting(false)
      return
    }

    try {
      await emailjs.send(
        'service_zmzh45f', 
        'template_1g0gq9p', 
        {
          from_name: nom,
          from_email: email,
          message: idee,
          categorie: categorie || 'Non spécifiée',
          to_email: 'cvdiali.contact@gmail.com'
        }
      )

      toast({
        title: 'Idée soumise !',
        description: 'Merci pour votre contribution. Nous étudierons votre suggestion.',
        variant: 'default'
      })

      // Réinitialiser le formulaire
      setNom('')
      setEmail('')
      setIdee('')
      setCategorie('')
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      toast({
        title: 'Erreur',
        description: 'Un problème est survenu. Veuillez réessayer.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Boîte à Idées
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto flex items-center justify-center">
            <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" />
            Aidez-nous à améliorer CVDiali
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-purple-600" />
                Votre Suggestion
              </h2>
              <p className="text-gray-600 mb-6">
                Partagez vos idées pour de nouveaux outils, fonctionnalités ou améliorations. 
                Chaque suggestion est précieuse pour faire évoluer CVDiali.
              </p>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Toutes les suggestions sont lues
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Retour garanti par email
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                  Merci de rester constructif
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contact
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  id="categorie"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="nouvel_outil">Nouvel Outil</option>
                  <option value="amelioration">Amélioration</option>
                  <option value="correction_bug">Correction de Bug</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="idee" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre Idée
                </label>
                <textarea
                  id="idee"
                  value={idee}
                  onChange={(e) => setIdee(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                  placeholder="Décrivez votre suggestion en détail..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }), 
                  'w-full flex items-center justify-center',
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                )}
              >
                <Send className="w-5 h-5 mr-2" /> 
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma Suggestion'}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>
            Vos suggestions seront envoyées à : 
            <a 
              href="mailto:cvdiali.contact@gmail.com" 
              className="ml-2 text-purple-600 hover:underline"
            >
              cvdiali.contact@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
