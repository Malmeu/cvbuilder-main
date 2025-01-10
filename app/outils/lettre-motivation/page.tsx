'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import { generateCoverLetter } from '@/app/lib/ai';

export default function LettreMotivation() {
  const [secteur, setSecteur] = useState('');
  const [experience, setExperience] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [poste, setPoste] = useState('');
  const [lettre, setLettre] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const genererLettre = async () => {
    if (!secteur || !experience || !entreprise || !poste) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { content, error } = await generateCoverLetter(
        secteur,
        experience,
        entreprise,
        poste
      );

      if (error) {
        setError(error);
      } else {
        setLettre(content);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            href="/outils"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux outils
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Simulateur de Lettre de Motivation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Créez une lettre de motivation professionnelle adaptée à votre secteur d'activité
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Secteur d'activité</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={secteur}
                    onChange={(e) => setSecteur(e.target.value)}
                    placeholder="Ex: Informatique, Marketing..."
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Expérience</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Ex: 3 ans, Débutant..."
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Entreprise ciblée</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    placeholder="Nom de l'entreprise"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Poste visé</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={poste}
                    onChange={(e) => setPoste(e.target.value)}
                    placeholder="Ex: Développeur Full Stack"
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={genererLettre}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  'Générer la lettre'
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl">
                {error}
              </div>
            )}

            {lettre && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Votre lettre de motivation</h2>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl whitespace-pre-line">
                  {lettre}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {navigator.clipboard.writeText(lettre)}}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copier le texte
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
