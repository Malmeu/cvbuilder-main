'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Search, Users, GraduationCap, MessageSquare } from 'lucide-react';


const outils = [
  {
    titre: "Préparation au TCF",
    description: "Préparez-vous efficacement au Test de Connaissance du Français avec des exercices interactifs et personnalisés.",
    icon: GraduationCap,
    href: "/outils/tcf",
    color: "from-primary to-secondary",
    featured: true
  },
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
  },
  {
    titre: "Simulateur Visa Étudiant",
    description: "Préparez-vous à votre entretien Campus France avec notre simulateur interactif.",
    icon: MessageSquare,
    href: "/visa-interview",
    color: "from-violet-500 to-violet-600"
  }
];

export default function Outils() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

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
                key={outil.titre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={outil.href}>
                  <div className={`relative group h-full p-8 rounded-3xl transition-all duration-300 ${
                    outil.featured ? 'bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20' : 'bg-white hover:bg-gray-50'
                  } border border-gray-200 hover:border-primary/20 hover:shadow-lg`}>
                    <div className={`w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br ${outil.color} flex items-center justify-center`}>
                      <outil.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{outil.titre}</h3>
                    <p className="text-gray-600">{outil.description}</p>
                    {outil.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                        Nouveau
                      </div>
                    )}
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
