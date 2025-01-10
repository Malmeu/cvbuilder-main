import { TCFMultipleChoiceQuestion } from './types';

// Fonction pour mélanger un tableau et retourner un nouvel index pour la bonne réponse
function shuffleOptionsAndUpdateCorrectAnswer(
  options: string[],
  correctAnswer: number
): { shuffledOptions: string[]; newCorrectAnswer: number } {
  const indexedOptions = options.map((option, index) => ({
    option,
    isCorrect: index === correctAnswer
  }));
  
  // Fisher-Yates shuffle
  for (let i = indexedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]];
  }
  
  return {
    shuffledOptions: indexedOptions.map(item => item.option),
    newCorrectAnswer: indexedOptions.findIndex(item => item.isCorrect)
  };
}

// Questions de base
const baseQuestions: TCFMultipleChoiceQuestion[] = [
  {
    id: 'co-1',
    type: 'comprehension-orale',
    level: 'a1',
    question: "Écoutez l'audio et choisissez la bonne réponse.",
    context: "Dans un café",
    audioUrl: "/audio/tcf/a1-cafe.mp3",
    options: [
      "Le client commande un café au lait",
      "Le client commande un thé",
      "Le client commande un chocolat chaud"
    ],
    correctAnswer: 0,
    explanation: "Le client demande spécifiquement un café au lait."
  },
  {
    id: 'co-2',
    type: 'comprehension-orale',
    level: 'a1',
    question: "Que fait la personne ?",
    context: "À la gare",
    audioUrl: "/audio/tcf/a1-train.mp3",
    options: [
      "Elle achète un billet de train",
      "Elle demande l'heure",
      "Elle cherche les toilettes"
    ],
    correctAnswer: 0,
    explanation: "La personne achète un billet de train pour Paris."
  },
  {
    id: 'co-3',
    type: 'comprehension-orale',
    level: 'a2',
    question: "Quel est le sujet principal de la conversation ?",
    context: "Conversation téléphonique",
    audioUrl: "/audio/tcf/a2-rdv.mp3",
    options: [
      "Prendre un rendez-vous chez le médecin",
      "Commander une pizza",
      "Réserver une table au restaurant"
    ],
    correctAnswer: 0,
    explanation: "La conversation porte sur la prise d'un rendez-vous médical."
  },
  {
    id: 'co-4',
    type: 'comprehension-orale',
    level: 'a2',
    question: "Que propose la personne ?",
    context: "Message vocal",
    audioUrl: "/audio/tcf/a2-cinema.mp3",
    options: [
      "Aller au cinéma ce soir",
      "Faire du shopping",
      "Préparer le dîner"
    ],
    correctAnswer: 0,
    explanation: "La personne propose d'aller voir un film au cinéma ce soir."
  },
  {
    id: 'co-5',
    type: 'comprehension-orale',
    level: 'b1',
    question: "Quel est le thème principal de ce reportage ?",
    context: "Reportage radio",
    audioUrl: "/audio/tcf/b1-ecologie.mp3",
    options: [
      "L'écologie et le développement durable",
      "La politique internationale",
      "Les nouvelles technologies"
    ],
    correctAnswer: 0,
    explanation: "Le reportage traite des questions environnementales et du développement durable."
  },
  {
    id: 'co-6',
    type: 'comprehension-orale',
    level: 'b1',
    question: "Que recommande l'intervenant ?",
    context: "Interview radio",
    audioUrl: "/audio/tcf/b1-sante.mp3",
    options: [
      "Faire plus d'exercice physique",
      "Manger plus de fast-food",
      "Dormir moins longtemps"
    ],
    correctAnswer: 0,
    explanation: "L'intervenant recommande d'augmenter son activité physique pour une meilleure santé."
  },
  {
    id: 'co-7',
    type: 'comprehension-orale',
    level: 'b2',
    question: "Quel est l'argument principal de l'intervenant ?",
    context: "Débat télévisé",
    audioUrl: "/audio/tcf/b2-teletravail.mp3",
    options: [
      "Le télétravail améliore la productivité",
      "Le télétravail est néfaste pour l'entreprise",
      "Le télétravail devrait être interdit"
    ],
    correctAnswer: 0,
    explanation: "L'intervenant soutient que le télétravail a un impact positif sur la productivité des employés."
  },
  {
    id: 'co-8',
    type: 'comprehension-orale',
    level: 'b2',
    question: "Quelle est la conclusion de cette présentation ?",
    context: "Conférence professionnelle",
    audioUrl: "/audio/tcf/b2-innovation.mp3",
    options: [
      "L'innovation est essentielle pour l'avenir",
      "Il faut éviter les changements",
      "La technologie est dangereuse"
    ],
    correctAnswer: 0,
    explanation: "Le conférencier conclut sur l'importance de l'innovation pour le futur des entreprises."
  },
  {
    id: 'co-9',
    type: 'comprehension-orale',
    level: 'c1',
    question: "Quelle est la thèse défendue par l'orateur ?",
    context: "Conférence académique",
    audioUrl: "/audio/tcf/c1-education.mp3",
    options: [
      "L'éducation doit s'adapter aux nouvelles technologies",
      "L'éducation traditionnelle est parfaite",
      "Il faut supprimer les nouvelles technologies"
    ],
    correctAnswer: 0,
    explanation: "L'orateur défend la nécessité d'adapter le système éducatif aux nouvelles technologies."
  },
  {
    id: 'co-10',
    type: 'comprehension-orale',
    level: 'c1',
    question: "Quel est le point de vue de l'expert sur la question ?",
    context: "Émission scientifique",
    audioUrl: "/audio/tcf/c1-science.mp3",
    options: [
      "La recherche scientifique doit être une priorité",
      "La recherche scientifique est inutile",
      "Il faut réduire les budgets de recherche"
    ],
    correctAnswer: 0,
    explanation: "L'expert souligne l'importance cruciale de la recherche scientifique pour le progrès de la société."
  }
];

// Exporter les questions avec les options mélangées
export const comprehensionOrale: TCFMultipleChoiceQuestion[] = baseQuestions.map(question => {
  const { shuffledOptions, newCorrectAnswer } = shuffleOptionsAndUpdateCorrectAnswer(
    question.options,
    question.correctAnswer
  );
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer
  };
});
