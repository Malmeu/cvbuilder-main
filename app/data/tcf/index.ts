import { TCFQuestion, TCFLevel, TCFQuestionType } from './types';
import { comprehensionOrale } from './comprehension-orale';
import { comprehensionEcrite } from './comprehension-ecrite';
import { expressionOrale } from './expression-orale';
import { expressionEcrite } from './expression-ecrite';
import { grammaire } from './grammaire';

// Regrouper toutes les questions
export const allQuestions: TCFQuestion[] = [
  ...comprehensionOrale,
  ...comprehensionEcrite,
  ...expressionOrale,
  ...expressionEcrite,
  ...grammaire
];

// Fonctions utilitaires
export const getQuestionsByType = (type: TCFQuestionType): TCFQuestion[] => {
  return allQuestions.filter(q => q.type === type);
};

export const getQuestionsByLevel = (level: TCFLevel): TCFQuestion[] => {
  return allQuestions.filter(q => q.level === level);
};

export const getQuestionsByTypeAndLevel = (type: TCFQuestionType, level: TCFLevel): TCFQuestion[] => {
  return allQuestions.filter(q => q.type === type && q.level === level);
};

export const getQuestionById = (id: string): TCFQuestion | undefined => {
  return allQuestions.find(q => q.id === id);
};

export type { TCFQuestion, TCFLevel, TCFQuestionType };
