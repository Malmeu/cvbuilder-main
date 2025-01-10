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
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowExplanation(true);
      onAnswer?.(isCorrect);
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
            onValueChange={(value: string) => setSelectedAnswer(parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Vérifier
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
