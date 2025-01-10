'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Headphones, PenTool, MessageSquare, GraduationCap, Trophy, Target, Clock } from 'lucide-react';
import { QuestionDisplay } from '@/app/components/tcf/QuestionDisplay';
import { getQuestionsByType, getQuestionsByLevel } from '@/app/data/tcf';
import type { TCFQuestionType, TCFLevel } from '@/app/data/tcf/types';

interface ExerciseSessionProps {
  type: TCFQuestionType;
  onClose: () => void;
  onComplete: (score: number, total: number, timeSpent: number) => void;
}

const ExerciseSession = ({ type, onClose, onComplete }: ExerciseSessionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = getQuestionsByType(type);
  const currentQuestion = questions[currentQuestionIndex];
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showTips, setShowTips] = useState(true);

  // Tips pour chaque type d'exercice
  const tips = {
    'comprehension-orale': [
      'Écoutez l\'audio deux fois avant de répondre',
      'Prenez des notes pendant l\'écoute',
      'Concentrez-vous sur les mots-clés'
    ],
    'comprehension-ecrite': [
      'Lisez d\'abord les questions',
      'Survolez le texte pour repérer les informations importantes',
      'Relisez les passages clés'
    ],
    'expression-orale': [
      'Structurez votre réponse avant de parler',
      'Parlez clairement et à un rythme modéré',
      'Utilisez des connecteurs logiques'
    ],
    'expression-ecrite': [
      'Faites un plan avant d\'écrire',
      'Respectez le nombre de mots demandé',
      'Relisez-vous pour corriger les erreurs'
    ],
    'grammaire': [
      'Lisez la phrase entière avant de choisir',
      'Vérifiez les accords et la conjugaison',
      'Faites attention aux exceptions'
    ]
  } as const;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const finalScore = Math.round((score / questions.length) * 100);
      onComplete(finalScore, questions.length, timeSpent);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header avec statistiques */}
      <div className="mb-12 space-y-6">
        <button 
          onClick={onClose} 
          className="text-base-content/60 hover:text-base-content flex items-center mt-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </button>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-base-200 p-4 rounded-lg">
            <div className="text-sm text-base-content/60">Progression</div>
            <div className="text-xl font-bold">{currentQuestionIndex + 1}/{questions.length}</div>
          </div>
          <div className="bg-base-200 p-4 rounded-lg">
            <div className="text-sm text-base-content/60">Score</div>
            <div className="text-xl font-bold">{score}/{currentQuestionIndex + 1}</div>
          </div>
          <div className="bg-base-200 p-4 rounded-lg">
            <div className="text-sm text-base-content/60">Temps</div>
            <div className="text-xl font-bold">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</div>
          </div>
        </div>

        {/* Conseils */}
        {showTips && (
          <motion.div 
            className="bg-primary/10 p-4 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Conseils pour cet exercice</h3>
              <button 
                onClick={() => setShowTips(false)}
                className="text-sm text-base-content/60 hover:text-base-content"
              >
                Masquer
              </button>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {tips[type].map((tip, index) => (
                <li key={index} className="text-sm text-base-content/80">{tip}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-base-100 rounded-xl shadow-lg p-6"
      >
        <QuestionDisplay
          question={currentQuestion}
          onAnswer={(isCorrect) => {
            if (isCorrect) setScore(s => s + 1);
            setTimeout(handleNext, 2000);
          }}
          onSubmitWriting={(answer) => {
            setScore(s => s + 1);
            setTimeout(handleNext, 1000);
          }}
          onSubmitSpeaking={(audioBlob) => {
            setScore(s => s + 1);
            setTimeout(handleNext, 1000);
          }}
        />
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-base-200 rounded disabled:opacity-50"
        >
          Question précédente
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          className="px-4 py-2 bg-primary text-primary-content rounded disabled:opacity-50"
        >
          Question suivante
        </button>
      </div>
    </div>
  );
};

export default function TCFPage() {
  const [activeSection, setActiveSection] = useState<TCFQuestionType | null>(null);
  const [scores, setScores] = useState<Record<TCFQuestionType, number>>({
    'comprehension-orale': 0,
    'comprehension-ecrite': 0,
    'expression-orale': 0,
    'expression-ecrite': 0,
    'grammaire': 0
  });
  const [completedExercises, setCompletedExercises] = useState<Record<TCFQuestionType, boolean>>({
    'comprehension-orale': false,
    'comprehension-ecrite': false,
    'expression-orale': false,
    'expression-ecrite': false,
    'grammaire': false
  });
  const [times, setTimes] = useState<Record<TCFQuestionType, number>>({
    'comprehension-orale': 0,
    'comprehension-ecrite': 0,
    'expression-orale': 0,
    'expression-ecrite': 0,
    'grammaire': 0
  });

  // Fonction de réinitialisation
  const handleReset = () => {
    const initialScores = {
      'comprehension-orale': 0,
      'comprehension-ecrite': 0,
      'expression-orale': 0,
      'expression-ecrite': 0,
      'grammaire': 0
    };
    const initialCompleted = {
      'comprehension-orale': false,
      'comprehension-ecrite': false,
      'expression-orale': false,
      'expression-ecrite': false,
      'grammaire': false
    };
    const initialTimes = {
      'comprehension-orale': 0,
      'comprehension-ecrite': 0,
      'expression-orale': 0,
      'expression-ecrite': 0,
      'grammaire': 0
    };

    // Mettre à jour les états
    setScores(initialScores);
    setCompletedExercises(initialCompleted);
    setTimes(initialTimes);

    // Effacer le localStorage
    localStorage.removeItem('tcf-scores');
    localStorage.removeItem('tcf-completed');
    localStorage.removeItem('tcf-times');
  };

  // Sauvegarder les scores dans le localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem('tcf-scores');
    const savedCompleted = localStorage.getItem('tcf-completed');
    const savedTimes = localStorage.getItem('tcf-times');

    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
    if (savedCompleted) {
      setCompletedExercises(JSON.parse(savedCompleted));
    }
    if (savedTimes) {
      setTimes(JSON.parse(savedTimes));
    }
  }, []);

  // Calculer les statistiques globales
  const totalExercisesCompleted = Object.values(completedExercises).filter(Boolean).length;
  const completedScores = Object.entries(scores)
    .filter(([type]) => completedExercises[type as TCFQuestionType])
    .map(([_, score]) => score);
  const averageScore = completedScores.length > 0
    ? completedScores.reduce((acc, score) => acc + score, 0) / completedScores.length
    : 0;
  const totalTime = Object.values(times).reduce((acc, time) => acc + time, 0);

  // Calculer le niveau en fonction du score moyen
  const calculateLevel = (score: number): string => {
    if (score >= 90) return 'C2';
    if (score >= 80) return 'C1';
    if (score >= 70) return 'B2';
    if (score >= 60) return 'B1';
    if (score >= 50) return 'A2';
    return 'A1';
  };

  const currentLevel = calculateLevel(averageScore);

  const handleExerciseComplete = (score: number, total: number, timeSpent: number) => {
    if (!activeSection) return;
    
    const newScores = {
      ...scores,
      [activeSection]: score
    };
    
    const newCompleted = {
      ...completedExercises,
      [activeSection]: true
    };
    
    const newTimes = {
      ...times,
      [activeSection]: timeSpent
    };

    // Mettre à jour les états
    setScores(newScores);
    setCompletedExercises(newCompleted);
    setTimes(newTimes);

    // Sauvegarder dans le localStorage
    localStorage.setItem('tcf-scores', JSON.stringify(newScores));
    localStorage.setItem('tcf-completed', JSON.stringify(newCompleted));
    localStorage.setItem('tcf-times', JSON.stringify(newTimes));

    setActiveSection(null);
  };

  const sections = [
    {
      id: 'comprehension-orale' as TCFQuestionType,
      title: 'Compréhension Orale',
      description: 'Entraînez-vous à comprendre le français parlé dans différentes situations.',
      icon: Headphones,
      color: 'primary'
    },
    {
      id: 'comprehension-ecrite' as TCFQuestionType,
      title: 'Compréhension Écrite',
      description: 'Développez votre capacité à comprendre des textes en français.',
      icon: BookOpen,
      color: 'secondary'
    },
    {
      id: 'expression-orale' as TCFQuestionType,
      title: 'Expression Orale',
      description: 'Pratiquez votre expression orale avec des exercices interactifs.',
      icon: MessageSquare,
      color: 'accent'
    },
    {
      id: 'expression-ecrite' as TCFQuestionType,
      title: 'Expression Écrite',
      description: 'Améliorez votre écriture en français avec des exercices guidés.',
      icon: PenTool,
      color: 'info'
    },
    {
      id: 'grammaire' as TCFQuestionType,
      title: 'Grammaire et Structure',
      description: 'Maîtrisez les règles grammaticales essentielles pour le TCF.',
      icon: GraduationCap,
      color: 'success'
    }
  ] as const;

  if (activeSection) {
    return (
      <ExerciseSession
        type={activeSection}
        onClose={() => setActiveSection(null)}
        onComplete={handleExerciseComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
          Préparation au TCF
        </h1>
        <p className="text-xl text-base-content/80 mb-8">
          Préparez-vous efficacement au Test de Connaissance du Français avec nos exercices personnalisés.
        </p>

        <div className="flex justify-end mb-8">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-error text-error-content rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Réinitialiser les scores
          </button>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-base-200 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Niveau actuel</div>
                <div className="text-2xl font-bold">{currentLevel}</div>
              </div>
            </div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Taux de réussite</div>
                <div className="text-2xl font-bold">{Math.round(averageScore)}%</div>
              </div>
            </div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Exercices complétés</div>
                <div className="text-2xl font-bold">{totalExercisesCompleted}</div>
              </div>
            </div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Temps total</div>
                <div className="text-2xl font-bold">{Math.floor(totalTime / 3600)}h {Math.floor((totalTime % 3600) / 60)}m {totalTime % 60}s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections d'exercices */}
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="bg-base-100 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative border border-base-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveSection(section.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-base-200/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="mb-6 relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-${section.color}/10 flex items-center justify-center`}>
                  <section.icon className={`w-6 h-6 text-${section.color}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{section.title}</h3>
              <p className="text-base-content/60 mb-6 relative z-10">
                {section.description}
              </p>
              <div className="relative z-10">
                <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ 
                      width: `${scores[section.id]}%`
                    }}
                  />
                </div>
                <div className="mt-2 text-sm text-base-content/60 flex justify-between items-center">
                  <span>Progression</span>
                  <span className="font-medium">{scores[section.id]}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
