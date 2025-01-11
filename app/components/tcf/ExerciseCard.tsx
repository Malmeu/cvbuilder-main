import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react';

interface ExerciseCardProps {
  question: {
    id: number;
    type: string;
    question: string;
    options?: string[];
    audioUrl?: string;
    imageUrl?: string;
    level: string;
  };
  onAnswer: (answer: string) => void;
  isCorrect?: boolean;
  feedback?: string;
  showFeedback: boolean;
}

export default function ExerciseCard({ 
  question, 
  onAnswer, 
  isCorrect, 
  feedback,
  showFeedback 
}: ExerciseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Gérer l'audio
  const toggleAudio = () => {
    if (!audio && question.audioUrl) {
      const newAudio = new Audio(question.audioUrl);
      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleAnswerSelect = (answer: string, index: number) => {
    setSelectedAnswer(answer);
    // Passer l'index de la réponse au lieu de la réponse elle-même
    onAnswer(index.toString());
    
    // Log pour le débogage
    console.log('=== Sélection de réponse ===');
    console.log('Question:', question.question);
    console.log('Réponse sélectionnée:', answer);
    console.log('Index de la réponse:', index);
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-6 backdrop-blur-md bg-white/5 rounded-3xl border border-white/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* En-tête avec niveau */}
      <div className="flex justify-between items-center mb-6">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          Niveau {question.level}
        </span>
        {question.audioUrl && (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-secondary" />
              ) : (
                <Play className="w-5 h-5 text-secondary" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-secondary" />
              ) : (
                <Volume2 className="w-5 h-5 text-secondary" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold mb-6 text-white/90">{question.question}</h3>

      {/* Options de réponse */}
      {question.options && (
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option, index)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedAnswer === option
                  ? showFeedback
                    ? isCorrect
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'bg-red-500/20 border-red-500/50'
                    : 'bg-primary/20 border-primary/50'
                  : 'bg-white/5 hover:bg-white/10'
              } border border-white/10`}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-xl ${
            isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
}
