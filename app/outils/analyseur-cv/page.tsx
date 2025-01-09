'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AnalysisResult {
  score: number;
  recommendations: string[];
}

export default function AnalyseurCV() {
  const [cvText, setCvText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const analyserCV = () => {
    const motsClés = ['expérience', 'compétences', 'projet', 'gestion', 'développement'];
    const recommendations: string[] = [];
    
    if (cvText.length < 200) {
      recommendations.push('Votre CV semble trop court. Ajoutez plus de détails sur vos expériences.');
    }

    motsClés.forEach(mot => {
      if (!cvText.toLowerCase().includes(mot)) {
        recommendations.push(`Considérez ajouter le mot-clé "${mot}" pour améliorer la visibilité de votre CV.`);
      }
    });

    const phrases = cvText.split('.');
    if (phrases.some(phrase => phrase.length > 150)) {
      recommendations.push('Certaines phrases sont trop longues. Essayez de les raccourcir pour plus de clarté.');
    }

    setAnalysis({
      score: Math.floor(Math.random() * 30 + 70),
      recommendations
    });
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
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux outils
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 text-transparent bg-clip-text">
              Analyseur de CV
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Optimisez votre CV pour les systèmes ATS et augmentez vos chances d'être sélectionné
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Collez le contenu de votre CV ici
                </label>
                <textarea
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Copiez-collez le texte de votre CV..."
                />
              </div>

              <button
                onClick={analyserCV}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
              >
                <span>Analyser mon CV</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-6"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Résultats de l'analyse</h2>
                    
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-medium text-gray-700">Score ATS</p>
                        <p className="text-2xl font-bold text-emerald-600">{analysis.score}/100</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.score}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-4 rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-4">Recommandations</h3>
                      <div className="space-y-3">
                        {analysis.recommendations.map((rec, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm"
                          >
                            <svg className="w-5 h-5 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-gray-700">{rec}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
