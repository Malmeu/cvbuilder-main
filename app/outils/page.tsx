'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Search, Users } from 'lucide-react';
import Navbar from '../components/Navbar';

const outils = [
  {
    titre: "Simulateur de Lettre de Motivation",
    description: "Créez des lettres de motivation personnalisées avec des modèles et des conseils par secteur d'activité.",
    icon: FileText,
    href: "/outils/lettre-motivation",
    color: "from-blue-500 to-blue-600"
  },
  {
    titre: "Analyseur de CV",
    description: "Optimisez votre CV pour les systèmes ATS et obtenez des recommandations d'amélioration.",
    icon: Search,
    href: "/outils/analyseur-cv",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    titre: "Planificateur d'Entretiens",
    description: "Préparez vos entretiens avec des questions types, des conseils et des stratégies de négociation.",
    icon: Users,
    href: "/outils/entretien",
    color: "from-purple-500 to-purple-600"
  }
];

export default function Outils() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Boîte à Outils
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des outils professionnels pour optimiser votre recherche d'emploi et maximiser vos chances de réussite
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outils.map((outil, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={outil.href}>
                  <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className={`bg-gradient-to-r ${outil.color} p-8 flex items-center justify-center`}>
                      <outil.icon className="w-16 h-16 text-white" />
                    </div>
                    <div className="p-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                        {outil.titre}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {outil.description}
                      </p>
                      <div className="mt-6 flex items-center text-blue-600 font-medium">
                        Commencer
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
