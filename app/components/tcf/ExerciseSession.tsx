import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Timer } from 'lucide-react';
import ExerciseCard from './ExerciseCard';

interface ExerciseSessionProps {
  type: string;
  onClose: () => void;
  onComplete: (score: number, total: number, timeSpent: number) => void;
}

export default function ExerciseSession({ type, onClose, onComplete }: ExerciseSessionProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes par défaut
  const [startTime] = useState<number>(Date.now()); // Temps de début

  useEffect(() => {
    fetchQuestions();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/tcf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des questions');
      }

      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      setError('Impossible de charger les questions. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    setCurrentAnswer(answer);
    try {
      const response = await fetch('/api/tcf', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: questions[currentIndex].id,
          answer,
        }),
      });

      const data = await response.json();
      setIsCorrect(data.correct);
      setFeedback(data.feedback);
      setShowFeedback(true);

      if (data.correct) {
        setCorrectAnswers(prev => prev + 1);
      }
    } catch (err) {
      setError('Erreur lors de la vérification de la réponse');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFeedback(false);
      setCurrentAnswer('');
    } else {
      handleSessionComplete();
    }
  };

  const handleSessionComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const totalQuestions = questions.length;
    const finalScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    console.log(`Score final: ${correctAnswers}/${totalQuestions} = ${finalScore}%`); // Pour le débogage
    onComplete(finalScore, totalQuestions, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-error mb-4">{error}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary text-primary-content rounded-full hover:opacity-90"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* En-tête de la session */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onClose}
          className="flex items-center text-base-content/60 hover:text-base-content"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quitter
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Timer className="w-5 h-5 mr-2 text-warning" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
          <div className="px-4 py-1 rounded-full bg-primary/10 text-primary">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Carte d'exercice */}
      {questions[currentIndex] && (
        <ExerciseCard
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
          isCorrect={isCorrect}
          feedback={feedback}
          showFeedback={showFeedback}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onClose}
          className="px-6 py-2 text-base-content/60 hover:text-base-content"
        >
          Abandonner
        </button>
        {showFeedback && (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-primary text-primary-content rounded-full hover:opacity-90"
          >
            {currentIndex < questions.length - 1 ? (
              <>
                Question suivante
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'Terminer'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
