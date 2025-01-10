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
    text: "J'aime ___ chocolat.",
    options: [
      'le',
      'la',
      'les',
      'un'
    ],
    correctAnswer: 0,
    explanation: "Le mot 'chocolat' est masculin singulier, donc on utilise l'article défini 'le'.",
    context: 'Articles définis'
  },
  {
    id: 'gr-a2-1',
    type: 'grammaire',
    level: 'a2',
    question: "Choisissez le pronom relatif correct :",
    text: "C'est le livre ___ j'ai lu hier.",
    options: [
      'que',
      'qui',
      'dont',
      'où'
    ],
    correctAnswer: 0,
    explanation: "On utilise 'que' car le pronom remplace le COD (le livre). 'Que' est utilisé quand le pronom relatif est complément d'objet direct.",
    context: 'Pronoms relatifs'
  },
  {
    id: 'gr-b1-1',
    type: 'grammaire',
    level: 'b1',
    question: "Complétez avec le temps correct :",
    text: "Si j'avais plus de temps, je ___ voyager.",
    options: [
      'pourrais',
      'peux',
      'pourrai',
      'ai pu'
    ],
    correctAnswer: 0,
    explanation: "Dans une phrase hypothétique avec 'si + imparfait', on utilise le conditionnel présent dans la principale (pourrais).",
    context: 'Conditionnel'
  },
  {
    id: 'gr-b2-1',
    type: 'grammaire',
    level: 'b2',
    question: "Choisissez la bonne forme du subjonctif :",
    text: "Il faut que vous ___ plus attentif.",
    options: [
      'soyez',
      'êtes',
      'serez',
      'étiez'
    ],
    correctAnswer: 0,
    explanation: "Après 'il faut que', on utilise le subjonctif présent. La forme correcte du verbe être au subjonctif présent avec 'vous' est 'soyez'.",
    context: 'Subjonctif présent'
  },
  {
    id: 'gr-c1-1',
    type: 'grammaire',
    level: 'c1',
    question: "Complétez avec le temps qui convient :",
    text: "Au moment où je l'ai appelé, il ___ déjà parti.",
    options: [
      'était',
      'a été',
      'fut',
      'serait'
    ],
    correctAnswer: 0,
    explanation: "Pour une action antérieure à une action au passé composé, on utilise le plus-que-parfait ou l'imparfait selon le contexte. Ici, l'imparfait 'était' est approprié car il s'agit d'un état.",
    context: 'Concordance des temps'
  }
];
