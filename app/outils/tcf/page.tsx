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
  onComplete: (score: number, total: number) => void;
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
      onComplete(score, questions.length);
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
  const [selectedSection, setSelectedSection] = useState<TCFQuestionType | null>(null);
  const [stats, setStats] = useState({
    exercisesCompleted: 0,
    currentLevel: 'a1' as TCFLevel,
    successRate: 0,
    totalTimeSpent: 0,
    sectionProgress: {
      'comprehension-orale': 0,
      'comprehension-ecrite': 0,
      'expression-orale': 0,
      'expression-ecrite': 0,
      'grammaire': 0
    } as Record<TCFQuestionType, number>
  });

  const handleSessionComplete = (score: number, total: number) => {
    const newSuccessRate = Math.round(((stats.successRate * stats.exercisesCompleted) + (score / total * 100)) / (stats.exercisesCompleted + 1));
    
    // Mettre à jour le niveau en fonction du taux de réussite
    let newLevel = stats.currentLevel;
    if (newSuccessRate >= 80) {
      newLevel = stats.currentLevel === 'a1' ? 'a2' : 
                 stats.currentLevel === 'a2' ? 'b1' : 
                 stats.currentLevel === 'b1' ? 'b2' : 
                 stats.currentLevel === 'b2' ? 'c1' : 'c2';
    }

    setStats(prev => ({
      ...prev,
      exercisesCompleted: prev.exercisesCompleted + 1,
      currentLevel: newLevel as TCFLevel,
      successRate: newSuccessRate,
      sectionProgress: {
        ...prev.sectionProgress,
        [selectedSection!]: Math.min(100, prev.sectionProgress[selectedSection!] + 20)
      }
    }));
    setSelectedSection(null);
  };

  const sections = [
    {
      id: 'comprehension-orale' as const,
      name: 'Compréhension Orale',
      icon: Headphones,
      description: 'Entraînez-vous à comprendre le français parlé dans différentes situations.',
      color: 'primary'
    },
    {
      id: 'comprehension-ecrite' as const,
      name: 'Compréhension Écrite',
      icon: BookOpen,
      description: 'Développez votre capacité à comprendre des textes en français.',
      color: 'secondary'
    },
    {
      id: 'expression-orale' as const,
      name: 'Expression Orale',
      icon: MessageSquare,
      description: 'Pratiquez votre expression orale avec des exercices interactifs.',
      color: 'accent'
    },
    {
      id: 'expression-ecrite' as const,
      name: 'Expression Écrite',
      icon: PenTool,
      description: 'Améliorez votre écriture en français avec des exercices guidés.',
      color: 'info'
    },
    {
      id: 'grammaire' as const,
      name: 'Grammaire et Structure',
      icon: GraduationCap,
      description: 'Maîtrisez les règles grammaticales essentielles pour le TCF.',
      color: 'success'
    }
  ] as const;

  if (selectedSection) {
    return (
      <ExerciseSession
        type={selectedSection}
        onClose={() => setSelectedSection(null)}
        onComplete={handleSessionComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="mb-12">
          <Link 
            href="/outils"
            className="inline-flex items-center text-base-content/60 hover:text-base-content mb-6 mt-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux outils
          </Link>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Préparation au TCF
          </motion.h1>
          <motion.p 
            className="text-xl text-base-content/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Préparez-vous efficacement au Test de Connaissance du Français avec nos exercices personnalisés.
          </motion.p>
        </div>

        {/* Niveau et Progression Globale */}
        <motion.div
          className="mb-12 p-6 bg-base-200 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Niveau actuel</div>
                <div className="text-2xl font-bold">{stats.currentLevel}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Taux de réussite</div>
                <div className="text-2xl font-bold">{stats.successRate}%</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Exercices complétés</div>
                <div className="text-2xl font-bold">{stats.exercisesCompleted}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Temps total</div>
                <div className="text-2xl font-bold">{Math.floor(stats.totalTimeSpent / 60)}h {stats.totalTimeSpent % 60}m</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grille des sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="group relative p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/20 shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedSection(section.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-base-200/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-base-content">
                {section.name}
              </h3>
              <p className="text-base-content/80 leading-relaxed mb-6 relative z-10">
                {section.description}
              </p>
              <div className="relative z-10">
                <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${stats.sectionProgress[section.id]}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-base-content/60">
                  Progression : {stats.sectionProgress[section.id]}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
