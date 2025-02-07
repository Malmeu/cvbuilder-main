'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2, FileText } from 'lucide-react';
import { analyzeCV } from '@/app/lib/ai';
import AnalysisReport from '@/app/components/AnalysisReport';
import CVHistory from '@/app/components/CVHistory';
import ATSTemplates from '@/app/components/ATSTemplates';

interface AnalysisResult {
  score: number;
  recommendations: string[];
}

export default function AnalyseurCV() {
  const [cvText, setCvText] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState<'analyzer' | 'history' | 'templates'>('analyzer');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setError('');
    setPastedText(''); // Réinitialiser le texte collé
    console.log('Début du traitement du fichier:', file.name, 'type:', file.type);

    try {
      let text = '';
      
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
        console.log('Traitement du PDF/Word');
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/extract-pdf', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
          throw new Error(errorData.error || 'Erreur lors de l\'extraction du fichier');
        }

        const data = await response.json();
        text = data.text;
        console.log('Texte extrait du fichier, longueur:', text.length);
      } else if (file.type === 'text/plain') {
        text = await file.text();
        console.log('Texte extrait du fichier texte, longueur:', text.length);
      } else {
        throw new Error('Format de fichier non supporté');
      }

      console.log('Mise à jour du texte du CV');
      setCvText(text);
      
      // Attendre que le state soit mis à jour avant de lancer l'analyse
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Vérification du texte avant analyse:', text ? 'présent' : 'absent', 'longueur:', text.length);
      if (!text.trim()) {
        throw new Error('Aucun texte n\'a pu être extrait du fichier, essayez avec un pdf non aplatis svp');
      }

      // Lancer l'analyse directement avec le texte extrait
      console.log('Lancement de l\'analyse avec le texte extrait');
      await analyserCV(text);

    } catch (err) {
      console.error('Erreur lors du traitement du fichier:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la lecture du fichier. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextPaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPastedText(text);
    setCvText(text); // Mettre à jour aussi cvText pour l'analyse
    setFileName(''); // Réinitialiser le nom du fichier
  };

  const analyserCV = async (textToAnalyze?: string) => {
    console.log('Début de l\'analyse');
    
    // Utiliser soit le texte passé en paramètre, soit le texte de l'état
    const finalText = textToAnalyze || cvText.trim();
    console.log('Texte à analyser:', finalText ? 'présent' : 'absent', 'longueur:', finalText?.length || 0);
    
    if (!finalText) {
      console.log('Aucun texte à analyser');
      setError('Veuillez ajouter le contenu de votre CV (via upload ou copier-coller)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Envoi du texte pour analyse, longueur:', finalText.length);
      const result = await analyzeCV(finalText);
      console.log('Résultat reçu:', result);
      setAnalysis(result);
      saveToHistory(result);
    } catch (err) {
      console.error('Erreur lors de l\'analyse:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'analyse');
    } finally {
      setIsLoading(false);
    }
  };

  const saveToHistory = (result: AnalysisResult) => {
    const historyItem = {
      id: uuidv4(),
      date: new Date().toISOString(),
      score: result.score,
      recommendations: result.recommendations,
      fileName: fileName || undefined
    };

    const savedHistory = localStorage.getItem('cv-analysis-history');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistory = [historyItem, ...history].slice(0, 10); // Garder les 10 dernières analyses
    
    localStorage.setItem('cv-analysis-history', JSON.stringify(newHistory));
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

          {/* Navigation des onglets */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analyzer'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Analyser un CV
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Historique
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Modèles ATS
            </button>
          </div>
          
          {activeTab === 'analyzer' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-8">
                {/* Zone de dépôt de fichier */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <input
                    type="file"
                    id="cv-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,image/*"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="cv-upload"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        {fileName ? fileName : 'Déposez votre CV ici'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PDF non aplatis, Word (docx), Text
                      </p>
                    </div>
                  </label>
                </div>

                {/* Zone de texte */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Ou collez le contenu de votre CV ici
                  </label>
                  <textarea
                    className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={pastedText}
                    onChange={handleTextPaste}
                    placeholder="Copiez-collez le texte de votre CV..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  onClick={() => analyserCV()}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <span>Analyser mon CV</span>
                      <FileText className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>

                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 space-y-6"
                  >
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                          Résultats de l'analyse
                        </h2>
                        <AnalysisReport
                          analysis={analysis}
                          fileName={fileName}
                        />
                      </div>
                      
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-medium text-gray-700">Score ATS</span>
                          <span className="text-2xl font-bold text-emerald-600">{analysis.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${analysis.score}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-800">Recommandations</h3>
                        <ul className="space-y-3">
                          {analysis.recommendations.map((recommendation, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3 text-gray-700"
                            >
                              <span className="text-emerald-600 font-medium">•</span>
                              <span>{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <CVHistory />
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <ATSTemplates />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
