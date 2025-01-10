import { TCFMultipleChoiceQuestion } from './types';

export const comprehensionEcrite: TCFMultipleChoiceQuestion[] = [
  {
    id: 'ce-1',
    type: 'comprehension-ecrite',
    level: 'a1',
    question: "Lisez le texte et répondez à la question.",
    context: "Panneau d'affichage",
    text: "PHARMACIE CENTRALE\nOuvert du lundi au samedi\n9h00 - 19h30\nFermé le dimanche",
    options: [
      "La pharmacie est ouverte le dimanche",
      "La pharmacie est fermée le samedi",
      "La pharmacie est fermée le dimanche"
    ],
    correctAnswer: 2,
    explanation: "Le panneau indique clairement que la pharmacie est fermée le dimanche."
  },
  {
    id: 'ce-2',
    type: 'comprehension-ecrite',
    level: 'a1',
    question: "Que dit cette annonce ?",
    context: "Petite annonce",
    text: "À VENDRE\nVélo rouge en bon état\nPrix : 50€\nTél : 06 12 34 56 78",
    options: [
      "On vend un vélo rouge",
      "On cherche un vélo rouge",
      "On répare les vélos"
    ],
    correctAnswer: 0,
    explanation: "L'annonce indique qu'un vélo rouge est à vendre pour 50€."
  },
  {
    id: 'ce-3',
    type: 'comprehension-ecrite',
    level: 'a2',
    question: "Quel est le but principal de ce message ?",
    context: "Email professionnel",
    text: "Cher M. Dupont,\n\nJe vous confirme notre rendez-vous de demain à 14h dans nos bureaux pour discuter du projet. N'oubliez pas d'apporter les documents nécessaires.\n\nCordialement,\nMme Martin",
    options: [
      "Annuler un rendez-vous",
      "Confirmer un rendez-vous",
      "Demander un rendez-vous"
    ],
    correctAnswer: 1,
    explanation: "L'email confirme un rendez-vous prévu pour le lendemain."
  },
  {
    id: 'ce-4',
    type: 'comprehension-ecrite',
    level: 'a2',
    question: "Que propose cette affiche ?",
    context: "Affiche culturelle",
    text: "FESTIVAL DE MUSIQUE\nDu 15 au 17 juillet\nParc municipal\nEntrée gratuite\nConcerts tous les soirs à partir de 19h",
    options: [
      "Un festival de théâtre",
      "Un festival de musique gratuit",
      "Un concert payant"
    ],
    correctAnswer: 1,
    explanation: "L'affiche annonce un festival de musique gratuit au parc municipal."
  },
  {
    id: 'ce-5',
    type: 'comprehension-ecrite',
    level: 'b1',
    question: "Quelle est l'idée principale de l'article ?",
    context: "Article de journal",
    text: "Le télétravail continue de se développer en France. Selon une récente étude, 30% des employés travaillent désormais au moins un jour par semaine depuis leur domicile. Cette tendance, accélérée par la crise sanitaire, semble s'installer durablement dans le paysage professionnel français.",
    options: [
      "La crise sanitaire en France",
      "L'augmentation du télétravail",
      "Les conditions de travail"
    ],
    correctAnswer: 1,
    explanation: "L'article traite principalement de l'augmentation du télétravail en France."
  },
  {
    id: 'ce-6',
    type: 'comprehension-ecrite',
    level: 'b1',
    question: "Quel est le message principal de cette publicité ?",
    context: "Publicité",
    text: "Découvrez notre nouvelle application mobile ! Gérez vos comptes, effectuez vos virements et payez vos factures en quelques clics. Simple, rapide et sécurisée, elle vous accompagne partout. Téléchargez-la gratuitement dès aujourd'hui !",
    options: [
      "Une nouvelle application bancaire pratique",
      "Un nouveau système de paiement en ligne",
      "Une offre de compte bancaire gratuit"
    ],
    correctAnswer: 0,
    explanation: "La publicité présente une nouvelle application mobile bancaire avec ses fonctionnalités."
  },
  {
    id: 'ce-7',
    type: 'comprehension-ecrite',
    level: 'b2',
    question: "Quelle est la conclusion de l'auteur ?",
    context: "Article scientifique",
    text: "L'intelligence artificielle révolutionne de nombreux secteurs, de la médecine à l'éducation. Cependant, son développement rapide soulève des questions éthiques importantes. Il est crucial d'établir un cadre réglementaire strict pour encadrer son utilisation et protéger les droits des citoyens.",
    options: [
      "Il faut réglementer l'IA",
      "L'IA est dangereuse",
      "L'IA n'est pas fiable"
    ],
    correctAnswer: 0,
    explanation: "L'auteur conclut sur la nécessité d'établir un cadre réglementaire pour l'IA."
  },
  {
    id: 'ce-8',
    type: 'comprehension-ecrite',
    level: 'b2',
    question: "Quel est le point de vue de l'auteur sur le sujet ?",
    context: "Article d'opinion",
    text: "La réduction du temps de travail fait débat. Si certains y voient une menace pour la productivité, les expériences menées dans plusieurs pays montrent qu'elle peut, au contraire, améliorer le bien-être des employés sans impact négatif sur les résultats. Il est temps d'envisager sérieusement cette option.",
    options: [
      "Il est favorable à la réduction du temps de travail",
      "Il est contre la réduction du temps de travail",
      "Il reste neutre sur la question"
    ],
    correctAnswer: 0,
    explanation: "L'auteur se positionne en faveur de la réduction du temps de travail, s'appuyant sur des expériences positives."
  },
  {
    id: 'ce-9',
    type: 'comprehension-ecrite',
    level: 'c1',
    question: "Quel est l'argument principal de l'auteur ?",
    context: "Essai philosophique",
    text: "Dans notre société hyperconnectée, la frontière entre vie privée et vie publique s'estompe progressivement. Les réseaux sociaux, initialement conçus comme des outils de communication, sont devenus des extensions de notre identité. Cette transformation profonde de notre rapport à l'intimité questionne les fondements mêmes de notre conception de l'individu.",
    options: [
      "Les réseaux sociaux transforment notre rapport à l'intimité",
      "La technologie est dangereuse",
      "Il faut limiter l'usage des réseaux sociaux"
    ],
    correctAnswer: 0,
    explanation: "L'auteur argumente sur la transformation de notre rapport à l'intimité par les réseaux sociaux."
  },
  {
    id: 'ce-10',
    type: 'comprehension-ecrite',
    level: 'c1',
    question: "Quelle est la thèse défendue par l'auteur ?",
    context: "Article académique",
    text: "Le multilinguisme précoce, loin d'être un obstacle au développement cognitif comme on le pensait autrefois, constitue un atout majeur dans le développement intellectuel de l'enfant. Les recherches récentes en neurosciences démontrent que l'exposition à plusieurs langues dès le plus jeune âge favorise la plasticité cérébrale et renforce les capacités d'apprentissage.",
    options: [
      "Le multilinguisme est bénéfique pour le développement",
      "Le multilinguisme peut être dangereux",
      "Le multilinguisme doit être limité"
    ],
    correctAnswer: 0,
    explanation: "L'auteur défend les bienfaits du multilinguisme précoce sur le développement cognitif."
  }
];
