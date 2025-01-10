'use client';

import React from 'react';
import { TCFQuestion } from '@/app/data/tcf/types';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { WritingQuestion } from './WritingQuestion';
import { SpeakingQuestion } from './SpeakingQuestion';

interface Props {
  question: TCFQuestion;
  onAnswer?: (isCorrect: boolean) => void;
  onSubmitWriting?: (answer: string) => void;
  onSubmitSpeaking?: (audioBlob: Blob) => void;
}

export function QuestionDisplay({
  question,
  onAnswer,
  onSubmitWriting,
  onSubmitSpeaking,
}: Props) {
  switch (question.type) {
    case 'grammaire':
    case 'comprehension-ecrite':
    case 'comprehension-orale':
      return (
        <MultipleChoiceQuestion
          question={question}
          onAnswer={onAnswer}
        />
      );
    case 'expression-ecrite':
      return (
        <WritingQuestion
          question={question}
          onSubmit={onSubmitWriting}
        />
      );
    case 'expression-orale':
      return (
        <SpeakingQuestion
          question={question}
          onSubmit={onSubmitSpeaking}
        />
      );
    default:
      return <div>Type de question non supporté</div>;
  }
}
