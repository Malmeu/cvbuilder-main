export type TCFLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
export type TCFQuestionType = 
  | 'comprehension-orale'
  | 'comprehension-ecrite'
  | 'expression-orale'
  | 'expression-ecrite'
  | 'grammaire';

// Interface de base pour toutes les questions
export interface TCFQuestionBase {
  id: string;
  type: TCFQuestionType;
  level: TCFLevel;
  question: string;
  context: string;
}

// Questions à choix multiples (grammaire, compréhension écrite et orale)
export interface TCFMultipleChoiceQuestion extends TCFQuestionBase {
  type: 'grammaire' | 'comprehension-ecrite' | 'comprehension-orale';
  options: string[];
  correctAnswer: number;
  explanation: string;
  text?: string;
  audioUrl?: string;
  imageUrl?: string;
}

// Questions d'expression écrite
export interface TCFWritingQuestion extends TCFQuestionBase {
  type: 'expression-ecrite';
  minWords: number;
  maxWords: number;
  criteria: string[];
  example?: string;
}

// Questions d'expression orale
export interface TCFSpeakingQuestion extends TCFQuestionBase {
  type: 'expression-orale';
  audioUrl?: string;
  minSeconds: number;
  maxSeconds: number;
  criteria: string[];
  preparationTime: number;  // Temps de préparation en secondes
  speakingTime: number;     // Temps de parole en secondes
  example?: string;         // Exemple de réponse
}

// Type union pour toutes les questions
export type TCFQuestion = 
  | TCFMultipleChoiceQuestion 
  | TCFWritingQuestion 
  | TCFSpeakingQuestion;
