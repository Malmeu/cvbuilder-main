'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TCFQuestion } from '@/app/data/tcf/types';
import AudioPlayer from './AudioPlayer';

interface AudioQuestionProps {
  question: TCFQuestion;
  onAnswerSubmit: (isCorrect: boolean) => void;
}

export function AudioQuestion({ question, onAnswerSubmit }: AudioQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasListened, setHasListened] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null || !hasListened) return;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    setHasSubmitted(true);
    onAnswerSubmit(isCorrect);
  };

  const getOptionClassName = (index: number) => {
    if (!hasSubmitted || selectedAnswer !== index) {
      return 'bg-white hover:bg-gray-50';
    }
    if (index === question.correctAnswer) {
      return 'bg-green-50 border-green-500';
    }
    if (selectedAnswer === index) {
      return 'bg-red-50 border-red-500';
    }
    return 'bg-white';
  };

  return (
    <div className="space-y-6">
      {/* Lecteur audio */}
      <div className="mb-8">
        <AudioPlayer
          audioUrl={question.audioUrl || ''}
          onComplete={() => setHasListened(true)}
          fallbackText={question.text}
        />
        {!hasListened && (
          <p className="text-sm text-red-500 mt-2">
            Écoutez l&apos;audio avant de répondre à la question
          </p>
        )}
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
        {question.context && (
          <p className="text-gray-600 text-sm mb-4">{question.context}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full p-4 text-left rounded-lg border transition-colors ${
              selectedAnswer === index ? 'border-blue-500' : 'border-gray-200'
            } ${getOptionClassName(index)}`}
            onClick={() => !hasSubmitted && setSelectedAnswer(index)}
            disabled={hasSubmitted}
          >
            <span className="font-medium">{option}</span>
          </motion.button>
        ))}
      </div>

      {/* Bouton de soumission */}
      <motion.button
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white ${
          hasSubmitted
            ? 'bg-gray-500'
            : selectedAnswer !== null && hasListened
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-300'
        }`}
        onClick={handleSubmit}
        disabled={selectedAnswer === null || hasSubmitted || !hasListened}
        whileHover={!hasSubmitted ? { scale: 1.02 } : {}}
        whileTap={!hasSubmitted ? { scale: 0.98 } : {}}
      >
        {hasSubmitted
          ? selectedAnswer === question.correctAnswer
            ? '✓ Bonne réponse !'
            : '✗ Mauvaise réponse'
          : 'Valider la réponse'}
      </motion.button>

      {/* Explication */}
      {hasSubmitted && question.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 rounded-lg"
        >
          <p className="text-blue-800">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
