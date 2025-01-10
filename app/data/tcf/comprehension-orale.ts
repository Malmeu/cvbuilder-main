import { TCFMultipleChoiceQuestion } from './types';

export const comprehensionOrale: TCFMultipleChoiceQuestion[] = [
  {
    id: 'co-1',
    type: 'comprehension-orale',
    level: 'a1',
    question: "Écoutez l'audio et choisissez la bonne réponse.",
    context: "Dans un café",
    audioUrl: "/audio/tcf/cafe-commande.mp3",
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
    audioUrl: "/audio/tcf/gare-billet.mp3",
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
    audioUrl: "/audio/tcf/rendez-vous.mp3",
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
    context: "Entre amis",
    audioUrl: "/audio/tcf/invitation-cinema.mp3",
    options: [
      "Aller au cinéma ce soir",
      "Faire du shopping",
      "Dîner au restaurant"
    ],
    correctAnswer: 0,
    explanation: "La personne propose d'aller voir un film au cinéma ce soir."
  },
  {
    id: 'co-5',
    type: 'comprehension-orale',
    level: 'b1',
    question: "Quel est le thème principal du reportage ?",
    context: "Reportage radio",
    audioUrl: "/audio/tcf/environnement.mp3",
    options: [
      "Le réchauffement climatique",
      "La pollution plastique",
      "Les énergies renouvelables"
    ],
    correctAnswer: 1,
    explanation: "Le reportage traite principalement de la pollution plastique dans les océans."
  },
  {
    id: 'co-6',
    type: 'comprehension-orale',
    level: 'b1',
    question: "Quel est le sujet de l'interview ?",
    context: "Interview radio",
    audioUrl: "/audio/tcf/interview-chef.mp3",
    options: [
      "La cuisine française traditionnelle",
      "Les nouvelles tendances culinaires",
      "La formation des chefs cuisiniers"
    ],
    correctAnswer: 1,
    explanation: "L'interview porte sur les nouvelles tendances dans la cuisine moderne."
  },
  {
    id: 'co-7',
    type: 'comprehension-orale',
    level: 'b2',
    question: "Quelle est la conclusion de l'intervenant ?",
    context: "Débat sur l'éducation",
    audioUrl: "/audio/tcf/education-debat.mp3",
    options: [
      "Il faut réformer le système éducatif",
      "Les élèves travaillent trop",
      "Les professeurs sont mal payés"
    ],
    correctAnswer: 0,
    explanation: "L'intervenant conclut sur la nécessité de réformer le système éducatif."
  },
  {
    id: 'co-8',
    type: 'comprehension-orale',
    level: 'b2',
    question: "Quel est l'objectif principal du projet présenté ?",
    context: "Présentation professionnelle",
    audioUrl: "/audio/tcf/presentation-projet.mp3",
    options: [
      "Réduire l'empreinte carbone de l'entreprise",
      "Augmenter les ventes",
      "Améliorer la communication interne"
    ],
    correctAnswer: 0,
    explanation: "Le projet vise à réduire l'impact environnemental de l'entreprise."
  },
  {
    id: 'co-9',
    type: 'comprehension-orale',
    level: 'c1',
    question: "Quelle est la thèse principale de la conférence ?",
    context: "Conférence scientifique",
    audioUrl: "/audio/tcf/science-conf.mp3",
    options: [
      "L'impact de l'IA sur la société",
      "Les dangers des réseaux sociaux",
      "L'avenir du travail"
    ],
    correctAnswer: 0,
    explanation: "La conférence traite de l'impact de l'intelligence artificielle sur la société."
  },
  {
    id: 'co-10',
    type: 'comprehension-orale',
    level: 'c1',
    question: "Quelle est la principale recommandation du spécialiste ?",
    context: "Débat économique",
    audioUrl: "/audio/tcf/economie-debat.mp3",
    options: [
      "Investir dans la formation continue",
      "Réduire les dépenses publiques",
      "Augmenter les impôts"
    ],
    correctAnswer: 0,
    explanation: "Le spécialiste recommande d'investir davantage dans la formation continue pour adapter la main-d'œuvre aux changements économiques."
  }
];
