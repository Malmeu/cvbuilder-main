'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type QuestionCategory = 'experience' | 'competences' | 'motivation';
type ConseilCategory = 'posture' | 'reponses' | 'negociation';

const questionsParCategorie: Record<QuestionCategory, string[]> = {
  experience: [
    "Parlez-moi de votre expérience professionnelle.",
    "Quelle a été votre plus grande réussite ?",
    "Comment gérez-vous les situations de stress ?",
    "Pourquoi voulez-vous quitter votre emploi actuel ?"
  ],
  competences: [
    "Quelles sont vos principales compétences ?",
    "Comment restez-vous à jour dans votre domaine ?",
    "Donnez-moi un exemple de projet complexe que vous avez géré.",
    "Comment gérez-vous les conflits en équipe ?"
  ],
  motivation: [
    "Pourquoi voulez-vous travailler pour notre entreprise ?",
    "Où vous voyez-vous dans 5 ans ?",
    "Qu'est-ce qui vous motive au quotidien ?",
    "Quelles sont vos attentes salariales ?"
  ]
};

const conseils: Record<ConseilCategory, string[]> = {
  posture: [
    "Maintenez un contact visuel approprié",
    "Adoptez une posture droite mais détendue",
    "Utilisez des gestes naturels pour appuyer vos propos",
    "Souriez de manière authentique"
  ],
  reponses: [
    "Utilisez la méthode STAR pour structurer vos réponses",
    "Soyez concis mais détaillé",
    "Préparez des exemples concrets",
    "Restez positif, même pour les questions difficiles"
  ],
  negociation: [
    "Faites des recherches sur les salaires du marché",
    "Préparez une fourchette plutôt qu'un chiffre fixe",
    "Mettez en avant votre valeur ajoutée",
    "Négociez le package complet, pas seulement le salaire"
  ]
};

export default function Entretien() {
  const [categorieActive, setCategorieActive] = useState<QuestionCategory>('experience');
  const [conseilActif, setConseilActif] = useState<ConseilCategory>('posture');
  const [reponseUtilisateur, setReponseUtilisateur] = useState('');
  const [questionActive, setQuestionActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <Link
            href="/outils"
            className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux outils
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              Planificateur d'Entretiens
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Préparez-vous efficacement pour vos entretiens d'embauche avec notre guide interactif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Questions d'entretien */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Questions Types</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(questionsParCategorie).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategorieActive(cat as QuestionCategory)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      categorieActive === cat
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {questionsParCategorie[categorieActive].map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      questionActive === question
                        ? 'bg-purple-50 border-2 border-purple-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setQuestionActive(question)}
                  >
                    <p className="text-gray-700">{question}</p>
                  </motion.div>
                ))}
              </div>

              {questionActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Votre réponse</h3>
                  <textarea
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    value={reponseUtilisateur}
                    onChange={(e) => setReponseUtilisateur(e.target.value)}
                    placeholder="Écrivez votre réponse ici..."
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Conseils */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Conseils Pratiques</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(conseils).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setConseilActif(cat as ConseilCategory)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      conseilActif === cat
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {conseils[conseilActif].map((conseil, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl"
                  >
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700">{conseil}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
