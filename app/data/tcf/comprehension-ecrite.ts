import { TCFMultipleChoiceQuestion } from './types';

export const comprehensionEcrite: TCFMultipleChoiceQuestion[] = [
  {
    id: 'ce-1',
    type: 'comprehension-ecrite',
    level: 'a1',
    question: "Lisez le texte et choisissez la bonne réponse.",
    text: "Fermé le lundi. Ouvert du mardi au samedi de 9h à 19h. Dimanche de 10h à 16h.",
    options: [
      "Le magasin est fermé le lundi",
      "Le magasin est ouvert tous les jours",
      "Le magasin est fermé le dimanche"
    ],
    correctAnswer: 0,
    explanation: "Le texte indique clairement que le magasin est fermé le lundi.",
    context: "Horaires d'ouverture"
  },
  {
    id: 'ce-2',
    type: 'comprehension-ecrite',
    level: 'a1',
    question: "Que dit cette annonce ?",
    text: "Appartement à louer : 2 chambres, cuisine équipée, proche métro. 800€/mois.",
    options: [
      "On loue un appartement",
      "On vend un appartement",
      "On cherche un appartement"
    ],
    correctAnswer: 0,
    explanation: "L'annonce propose un appartement à louer.",
    context: "Petite annonce immobilière"
  },
  {
    id: 'ce-3',
    type: 'comprehension-ecrite',
    level: 'a2',
    question: "De quel type de document s'agit-il ?",
    text: "Chère Marie, Je suis bien arrivée à Paris. Le voyage était long mais agréable. Je te raconterai tout à mon retour. Bisous, Sophie",
    options: [
      "Une carte postale",
      "Un article de journal",
      "Une publicité"
    ],
    correctAnswer: 0,
    explanation: "Le format et le style correspondent à une carte postale.",
    context: "Correspondance personnelle"
  },
  {
    id: 'ce-4',
    type: 'comprehension-ecrite',
    level: 'a2',
    question: "Quel est le message principal ?",
    text: "SOLDES D'HIVER : Jusqu'à -50% sur tous les vêtements du 10 au 30 janvier !",
    options: [
      "Il y a des réductions sur les vêtements",
      "Le magasin ferme en janvier",
      "Les vêtements d'hiver sont arrivés"
    ],
    correctAnswer: 0,
    explanation: "L'annonce informe sur des réductions pendant les soldes d'hiver.",
    context: "Publicité commerciale"
  },
  {
    id: 'ce-5',
    type: 'comprehension-ecrite',
    level: 'b1',
    question: "Que propose cette annonce ?",
    text: "Cours de français tous niveaux. Professeur expérimenté. Méthode interactive. Petits groupes. 20€/heure.",
    options: [
      "Des cours de français personnalisés",
      "Des livres de français",
      "Un emploi de professeur"
    ],
    correctAnswer: 0,
    explanation: "L'annonce propose des cours de français.",
    context: "Annonce de service"
  },
  {
    id: 'ce-6',
    type: 'comprehension-ecrite',
    level: 'b1',
    question: "Quel est le sujet principal de cet article ?",
    text: "Le télétravail continue de se développer en France. Selon une récente étude, 30% des employés travaillent désormais régulièrement depuis leur domicile.",
    options: [
      "L'évolution du télétravail",
      "Le chômage en France",
      "Les conditions de travail"
    ],
    correctAnswer: 0,
    explanation: "L'article traite principalement du développement du télétravail.",
    context: "Article de presse"
  },
  {
    id: 'ce-7',
    type: 'comprehension-ecrite',
    level: 'b2',
    question: "Quelle est la conclusion de cet extrait ?",
    text: "Bien que les énergies renouvelables présentent de nombreux avantages, leur développement nécessite des investissements importants et une volonté politique forte.",
    options: [
      "Le développement des énergies renouvelables est complexe",
      "Les énergies renouvelables sont trop chères",
      "Il faut abandonner les énergies renouvelables"
    ],
    correctAnswer: 0,
    explanation: "Le texte conclut sur la complexité du développement des énergies renouvelables.",
    context: "Article scientifique"
  },
  {
    id: 'ce-8',
    type: 'comprehension-ecrite',
    level: 'b2',
    question: "Quel est l'argument principal du texte ?",
    text: "L'apprentissage d'une langue étrangère ne se limite pas à la grammaire et au vocabulaire. C'est aussi une ouverture sur une nouvelle culture et une façon différente de voir le monde.",
    options: [
      "L'apprentissage des langues est culturel",
      "La grammaire est difficile",
      "Il faut voyager pour apprendre"
    ],
    correctAnswer: 0,
    explanation: "Le texte souligne l'aspect culturel de l'apprentissage des langues.",
    context: "Article éducatif"
  },
  {
    id: 'ce-9',
    type: 'comprehension-ecrite',
    level: 'c1',
    question: "Quelle est la thèse défendue ?",
    text: "Dans un monde hyperconnecté, la protection de la vie privée devient un enjeu majeur. Les récentes législations tentent de répondre à ce défi, mais sont-elles suffisantes ?",
    options: [
      "La protection des données est un défi important",
      "Il faut interdire internet",
      "Les lois sont parfaites"
    ],
    correctAnswer: 0,
    explanation: "Le texte défend l'importance de la protection des données personnelles.",
    context: "Article d'opinion"
  },
  {
    id: 'ce-10',
    type: 'comprehension-ecrite',
    level: 'c1',
    question: "Quel est le ton de cet article ?",
    text: "Les avancées en intelligence artificielle soulèvent des questions éthiques fondamentales. Si ces technologies offrent des opportunités sans précédent, elles comportent aussi des risques qu'il serait imprudent d'ignorer.",
    options: [
      "Analytique et nuancé",
      "Totalement négatif",
      "Purement enthousiaste"
    ],
    correctAnswer: 0,
    explanation: "L'article adopte un ton équilibré, présentant à la fois les opportunités et les risques.",
    context: "Article technologique"
  }
];
