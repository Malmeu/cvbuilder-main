'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Loader2, BookOpen, Building2, BriefcaseIcon, Wand2 } from 'lucide-react';

interface PrepData {
  questions_techniques: string[];
  questions_culture: string[];
  questions_pieges: string[];
  conseils_preparation: string[];
  points_cles: string[];
}

export default function Entretien() {
  const [poste, setPoste] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [experience, setExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [prepData, setPrepData] = useState<PrepData | null>(null);

  const genererPreparation = async () => {
    if (!poste || !entreprise) {
      setError('Veuillez remplir au moins le poste et l\'entreprise');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Envoi de la requête avec:', { poste, entreprise, experience });
      const response = await fetch(`${window.location.origin}/api/interview-prep`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ poste, entreprise, experience }),
      });

      const data = await response.json();
      console.log('Réponse reçue:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la génération de la préparation');
      }

      setPrepData(data);
    } catch (err) {
      console.error('Erreur complète:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la génération de la préparation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
              Préparez-vous efficacement pour vos entretiens d'embauche avec notre assistant IA
            </p>
          </div>

          {/* Formulaire de préparation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Wand2 className="w-6 h-6 mr-2 text-purple-600" />
              Préparation Personnalisée
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poste visé
                </label>
                <div className="relative">
                  <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={poste}
                    onChange={(e) => setPoste(e.target.value)}
                    placeholder="ex: Développeur Full Stack"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    placeholder="ex: Google"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expérience (optionnel)
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Décrivez brièvement votre expérience pertinente..."
                    className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl">
                {error}
              </div>
            )}

            <button
              onClick={genererPreparation}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Générer ma préparation
                </>
              )}
            </button>
          </motion.div>

          {/* Résultats de la préparation */}
          {prepData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Questions techniques */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Questions Techniques
                </h3>
                <ul className="space-y-3">
                  {prepData.questions_techniques.map((q, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 mt-1">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions culture */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Questions Culture d'Entreprise
                </h3>
                <ul className="space-y-3">
                  {prepData.questions_culture.map((q, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions pièges */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Questions Pièges
                </h3>
                <ul className="space-y-3">
                  {prepData.questions_pieges.map((q, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                        !
                      </span>
                      <span className="text-gray-700">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conseils et points clés */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Conseils de Préparation
                  </h3>
                  <ul className="space-y-3">
                    {prepData.conseils_preparation.map((conseil, i) => (
                      <li key={i} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-1">
                          ✓
                        </span>
                        <span className="text-gray-700">{conseil}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Points Clés à Mettre en Avant
                  </h3>
                  <ul className="space-y-3">
                    {prepData.points_cles.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-3 mt-1">
                          ★
                        </span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
