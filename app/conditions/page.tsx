'use client'

import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Conditions d&apos;Utilisation
          </motion.h1>

          <div className="space-y-8">
            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">1. Acceptation des Conditions</h2>
              <p className="text-base-content/80">
                En utilisant notre service de création de CV, vous acceptez les présentes conditions d&apos;utilisation.
                Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4">2. Description du Service</h2>
              <p className="text-base-content/80">
                Nous fournissons un outil en ligne permettant aux utilisateurs de créer et de personnaliser 
                leur CV. Le service inclut différents modèles, options de personnalisation et la possibilité 
                d&apos;exporter le CV en format PDF.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-4">3. Utilisation du Service</h2>
              <p className="text-base-content/80">
                Vous vous engagez à :
              </p>
              <ul className="list-disc pl-6 text-base-content/80">
                <li>Fournir des informations exactes et véridiques</li>
                <li>Ne pas utiliser le service à des fins illégales</li>
                <li>Ne pas tenter de perturber ou d&apos;endommager le service</li>
                <li>Respecter les droits de propriété intellectuelle</li>
              </ul>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">4. Propriété Intellectuelle</h2>
              <p className="text-base-content/80">
                Tous les droits de propriété intellectuelle liés au service (modèles, designs, logos, etc.) 
                sont notre propriété exclusive. Vous conservez tous les droits sur le contenu de votre CV.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-4">5. Limitation de Responsabilité</h2>
              <p className="text-base-content/80">
                Nous nous efforçons de maintenir le service disponible et fonctionnel, mais ne pouvons 
                garantir son fonctionnement ininterrompu. Nous ne sommes pas responsables des pertes ou 
                dommages résultant de l&apos;utilisation de notre service.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-semibold mb-4">6. Modifications</h2>
              <p className="text-base-content/80">
                Nous nous réservons le droit de modifier ces conditions d&apos;utilisation à tout moment. 
                Les modifications entrent en vigueur dès leur publication sur le site.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
              <p className="text-base-content/80">
                Pour toute question concernant ces conditions d&apos;utilisation, 
                contactez-nous à : contact@cvdiali.com
              </p>
            </motion.section>
          </div>
        </div>
      </main>
    </>
  )
}
