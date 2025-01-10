'use client';

import React, { useState } from 'react';
import { TCFWritingQuestion } from '@/app/data/tcf/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface Props {
  question: TCFWritingQuestion;
  onSubmit?: (answer: string) => void;
}

export function WritingQuestion({ question, onSubmit }: Props) {
  const [answer, setAnswer] = useState('');
  const [showExample, setShowExample] = useState(false);

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const isWithinLimits = wordCount >= question.minWords && wordCount <= question.maxWords;

  const handleSubmit = () => {
    if (isWithinLimits) {
      onSubmit?.(answer);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Question */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{question.question}</h3>
            <p className="text-muted-foreground">{question.context}</p>
          </div>

          {/* Writing Area */}
          <div className="space-y-2">
            <Textarea
              placeholder="Écrivez votre réponse ici..."
              className="min-h-[200px]"
              value={answer}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)}
            />
            <p className={`text-sm ${isWithinLimits ? 'text-muted-foreground' : 'text-destructive'}`}>
              {wordCount} mots (minimum : {question.minWords}, maximum : {question.maxWords})
            </p>
          </div>

          {/* Criteria */}
          <div className="space-y-2">
            <h4 className="font-medium">Critères d'évaluation :</h4>
            <ul className="list-disc list-inside space-y-1">
              {question.criteria.map((criterion, index) => (
                <li key={index} className="text-muted-foreground">
                  {criterion}
                </li>
              ))}
            </ul>
          </div>

          {/* Example Toggle */}
          {question.example && (
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => setShowExample(!showExample)}
              >
                {showExample ? 'Masquer l\'exemple' : 'Voir un exemple'}
              </Button>
              {showExample && (
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertDescription className="whitespace-pre-line">
                    {question.example}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!isWithinLimits}
          >
            Soumettre
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
