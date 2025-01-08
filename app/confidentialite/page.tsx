'use client'

import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
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
            Politique de Confidentialité
          </motion.h1>

          <div className="space-y-8">
            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Collecte des Informations</h2>
              <p className="text-base-content/80">
                Nous collectons uniquement les informations nécessaires à la création de votre CV. 
                Ces informations incluent vos données personnelles et professionnelles que vous choisissez de partager.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Utilisation des Données</h2>
              <p className="text-base-content/80">
                Vos données sont utilisées exclusivement pour la création et la personnalisation de votre CV.
                Nous ne partageons pas vos informations avec des tiers sans votre consentement explicite.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Sécurité</h2>
              <p className="text-base-content/80">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données 
                contre tout accès, modification, divulgation ou destruction non autorisés.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="text-base-content/80">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Ces cookies sont nécessaires au bon fonctionnement de certaines fonctionnalités 
                et nous aident à comprendre comment vous interagissez avec notre site.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Vos Droits</h2>
              <p className="text-base-content/80">
                Vous avez le droit d&apos;accéder à vos données personnelles, de les corriger ou de les supprimer.
                Pour toute demande concernant vos données, contactez-nous à l&apos;adresse indiquée ci-dessous.
              </p>
            </motion.section>

            <motion.section 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-base-content/80">
                Pour toute question concernant notre politique de confidentialité, 
                vous pouvez nous contacter à : contact@cvdiali.com
              </p>
            </motion.section>
          </div>
        </div>
      </main>
    </>
  )
}
