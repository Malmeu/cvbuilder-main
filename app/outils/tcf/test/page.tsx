'use client';

import React from 'react';
import { grammaire } from '@/app/data/tcf/grammaire';
import { expressionEcrite } from '@/app/data/tcf/expression-ecrite';
import { expressionOrale } from '@/app/data/tcf/expression-orale';
import { QuestionDisplay } from '@/app/components/tcf/QuestionDisplay';

export default function TCFTestPage() {
  const handleAnswer = (isCorrect: boolean) => {
    alert(isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse.');
  };

  const handleWritingSubmit = (answer: string) => {
    alert(`Réponse soumise : ${answer}`);
  };

  const handleSpeakingSubmit = (audioBlob: Blob) => {
    const url = URL.createObjectURL(audioBlob);
    alert(`Enregistrement audio disponible à : ${url}`);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Test de Connaissance du Français</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Grammaire</h2>
        <QuestionDisplay
          question={grammaire[0]}
          onAnswer={handleAnswer}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Expression Écrite</h2>
        <QuestionDisplay
          question={expressionEcrite[0]}
          onSubmitWriting={handleWritingSubmit}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Expression Orale</h2>
        <QuestionDisplay
          question={expressionOrale[0]}
          onSubmitSpeaking={handleSpeakingSubmit}
        />
      </section>
    </div>
  );
}
