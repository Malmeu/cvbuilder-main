import { TCFMultipleChoiceQuestion } from './types';

export const grammaire: TCFMultipleChoiceQuestion[] = [
  {
    id: 'gr-a1-1',
    type: 'grammaire',
    level: 'a1',
    question: "Choisissez la bonne forme du verbe 'être' :",
    text: "Tu ___ étudiant ?",
    options: [
      'es',
      'est',
      'suis',
      'sommes'
    ],
    correctAnswer: 0,
    explanation: "Avec le pronom 'tu', on utilise la forme 'es' du verbe être (tu es).",
    context: 'Conjugaison du verbe être'
  },
  {
    id: 'gr-a1-2',
    type: 'grammaire',
    level: 'a1',
    question: "Complétez avec l'article défini correct :",
    text: "___ soleil brille.",
    options: [
      'le',
      'la',
      'les',
      "l'"
    ],
    correctAnswer: 0,
    explanation: "'Le soleil' est masculin singulier.",
    context: 'Articles définis'
  },
  {
    id: 'gr-a2-1',
    type: 'grammaire',
    level: 'a2',
    question: "Choisissez le bon temps du verbe :",
    text: "Hier, je ___ au cinéma.",
    options: [
      'suis allé',
      'vais',
      'irai',
      'va'
    ],
    correctAnswer: 0,
    explanation: "Avec 'hier', on utilise le passé composé.",
    context: 'Temps du passé'
  },
  {
    id: 'gr-a2-2',
    type: 'grammaire',
    level: 'a2',
    question: "Complétez avec le pronom relatif correct :",
    text: "C'est le livre ___ j'ai lu hier.",
    options: [
      'que',
      'qui',
      'dont',
      'où'
    ],
    correctAnswer: 0,
    explanation: "'Que' est utilisé quand le pronom relatif est COD.",
    context: 'Pronoms relatifs'
  },
  {
    id: 'gr-b1-1',
    type: 'grammaire',
    level: 'b1',
    question: "Choisissez la bonne préposition :",
    text: "Je pense ___ mes vacances.",
    options: [
      'à',
      'de',
      'pour',
      'par'
    ],
    correctAnswer: 0,
    explanation: "Le verbe 'penser' est suivi de la préposition 'à'.",
    context: 'Prépositions'
  },
  {
    id: 'gr-b1-2',
    type: 'grammaire',
    level: 'b1',
    question: "Complétez avec le bon pronom possessif :",
    text: "Cette voiture est ___.",
    options: [
      'la mienne',
      'le mien',
      'les miennes',
      'à moi'
    ],
    correctAnswer: 0,
    explanation: "'La mienne' s'accorde avec 'voiture' (féminin singulier).",
    context: 'Pronoms possessifs'
  },
  {
    id: 'gr-b2-1',
    type: 'grammaire',
    level: 'b2',
    question: "Choisissez la bonne forme du subjonctif :",
    text: "Il faut que tu ___ plus tôt.",
    options: [
      'viennes',
      'viens',
      'viendrais',
      'venais'
    ],
    correctAnswer: 0,
    explanation: "Après 'il faut que', on utilise le subjonctif présent.",
    context: 'Subjonctif'
  },
  {
    id: 'gr-b2-2',
    type: 'grammaire',
    level: 'b2',
    question: "Complétez avec le bon participe passé :",
    text: "Les fleurs que j'ai ___ sont belles.",
    options: [
      'achetées',
      'acheté',
      'acheter',
      'achetés'
    ],
    correctAnswer: 0,
    explanation: "Le participe passé s'accorde avec le COD placé avant le verbe (que = les fleurs).",
    context: 'Accord du participe passé'
  },
  {
    id: 'gr-c1-1',
    type: 'grammaire',
    level: 'c1',
    question: "Choisissez la bonne construction :",
    text: "___ qu'il pleuve, nous irons à la plage.",
    options: [
      'Quoi',
      'Bien',
      'Même',
      'Pour'
    ],
    correctAnswer: 2,
    explanation: "'Même' exprime ici la concession.",
    context: 'Expression de la concession'
  },
  {
    id: 'gr-c1-2',
    type: 'grammaire',
    level: 'c1',
    question: "Complétez avec la forme correcte du conditionnel passé :",
    text: "Si j'avais su, je ___ différemment.",
    options: [
      'aurais agi',
      'agirais',
      'agirai',
      'avais agi'
    ],
    correctAnswer: 0,
    explanation: "Dans une hypothèse du passé, on utilise le conditionnel passé dans la principale.",
    context: 'Conditionnel passé'
  }
];
