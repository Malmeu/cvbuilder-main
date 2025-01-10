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

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
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
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">{question.question}</h3>
        {question.imageUrl && (
          <img
            src={question.imageUrl}
            alt="Question illustration"
            className="w-full rounded-xl mb-4 object-cover"
          />
        )}
      </div>

      {/* Options */}
      {question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                selectedAnswer === option
                  ? showFeedback
                    ? isCorrect
                      ? 'border-success/50 bg-success/10'
                      : 'border-error/50 bg-error/10'
                    : 'border-primary/50 bg-primary/10'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
              disabled={showFeedback}
            >
              <span className="text-left block">{option}</span>
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
            isCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
}
