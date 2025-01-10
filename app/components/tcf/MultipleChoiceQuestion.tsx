'use client';

import React, { useState } from 'react';
import { TCFMultipleChoiceQuestion } from '@/app/data/tcf/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  question: TCFMultipleChoiceQuestion;
  onAnswer?: (isCorrect: boolean) => void;
}

export function MultipleChoiceQuestion({ question, onAnswer }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer !== null && !isSubmitted) {
      setShowExplanation(true);
      setIsSubmitted(true);
      onAnswer?.(isCorrect);
    }
  };

  const handleAnswerChange = (value: string) => {
    if (!isSubmitted) {
      setSelectedAnswer(parseInt(value));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Question */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{question.question}</h3>
            {question.text && (
              <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                {question.text}
              </div>
            )}
            {question.audioUrl && (
              <audio controls className="w-full">
                <source src={question.audioUrl} type="audio/mpeg" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
            )}
          </div>

          {/* Options */}
          <RadioGroup
            className="space-y-3"
            value={selectedAnswer?.toString()}
            onValueChange={handleAnswerChange}
          >
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-2 ${isSubmitted ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  disabled={isSubmitted}
                  className={isSubmitted && index === question.correctAnswer ? 'border-primary' : ''}
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className={`text-base ${
                    isSubmitted && index === question.correctAnswer 
                      ? 'text-primary font-semibold' 
                      : ''
                  }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={selectedAnswer === null || isSubmitted}
          >
            {isSubmitted ? 'Réponse soumise' : 'Vérifier'}
          </Button>

          {/* Explanation */}
          {showExplanation && (
            <Alert variant={isCorrect ? "default" : "destructive"}>
              <div className="flex items-center gap-2">
                {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertDescription>
                  {question.explanation}
                </AlertDescription>
              </div>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
