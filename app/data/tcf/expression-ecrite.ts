import { TCFWritingQuestion } from './types';

export const expressionEcrite: TCFWritingQuestion[] = [
  {
    id: 'ee-1',
    type: 'expression-ecrite',
    level: 'a1',
    question: "Écrivez un message à votre ami(e) pour l'inviter à votre anniversaire. Précisez la date, l'heure et le lieu.",
    context: "Message personnel",
    minWords: 30,
    maxWords: 50,
    exampleAnswer: "Cher Paul,\nJe t'invite à mon anniversaire samedi prochain, le 15 janvier. La fête commence à 19h chez moi, au 12 rue des Fleurs. J'espère que tu pourras venir !\nAmicalement,\nMarie",
    criteria: [
      "Inclusion des informations essentielles (date, heure, lieu)",
      "Formules de politesse appropriées",
      "Orthographe et grammaire de base"
    ]
  },
  {
    id: 'ee-2',
    type: 'expression-ecrite',
    level: 'a1',
    question: "Écrivez un message pour prévenir de votre retard au travail.",
    context: "Message professionnel court",
    minWords: 30,
    maxWords: 50,
    exampleAnswer: "Bonjour Madame,\nJe serai en retard ce matin à cause d'un problème de transport. J'arriverai vers 10h au bureau.\nCordialement,\nPierre Martin",
    criteria: [
      "Explication claire du retard",
      "Indication de l'heure d'arrivée",
      "Formules de politesse",
      "Structure du message"
    ]
  },
  {
    id: 'ee-3',
    type: 'expression-ecrite',
    level: 'a2',
    question: "Vous devez annuler un rendez-vous chez le médecin. Écrivez un email pour expliquer la situation et demander un nouveau rendez-vous.",
    context: "Email formel",
    minWords: 50,
    maxWords: 80,
    exampleAnswer: "Bonjour Docteur Martin,\n\nJe dois malheureusement annuler mon rendez-vous prévu pour demain à 14h30 car je suis cloué(e) au lit avec de la fièvre. Serait-il possible d'avoir un nouveau rendez-vous la semaine prochaine ?\n\nJe vous remercie de votre compréhension.\n\nCordialement,\nJean Dupont",
    criteria: [
      "Explication claire du motif d'annulation",
      "Demande polie d'un nouveau rendez-vous",
      "Structure appropriée d'un email formel",
      "Utilisation correcte des formules de politesse"
    ]
  },
  {
    id: 'ee-4',
    type: 'expression-ecrite',
    level: 'a2',
    question: "Décrivez votre week-end dernier en détaillant vos activités.",
    context: "Récit personnel",
    minWords: 60,
    maxWords: 90,
    exampleAnswer: "Le week-end dernier était très agréable. Samedi matin, je suis allé(e) au marché pour acheter des fruits frais. L'après-midi, j'ai fait une longue promenade dans le parc avec des amis. Dimanche, j'ai cuisiné un bon repas pour ma famille et nous avons regardé un film ensemble. C'était un week-end reposant et plaisant.",
    criteria: [
      "Utilisation du passé composé",
      "Description chronologique",
      "Vocabulaire des activités quotidiennes",
      "Expression des sentiments"
    ]
  },
  {
    id: 'ee-5',
    type: 'expression-ecrite',
    level: 'b1',
    question: "Rédigez un avis sur le dernier restaurant que vous avez visité. Décrivez la nourriture, le service et l'ambiance.",
    context: "Critique de restaurant",
    minWords: 80,
    maxWords: 120,
    exampleAnswer: "J'ai dîné au restaurant 'Le Petit Bistrot' hier soir et j'ai été agréablement surpris(e). La décoration est chaleureuse et l'ambiance est conviviale. Le service était attentionné et rapide. J'ai particulièrement apprécié leur spécialité, le coq au vin, qui était parfaitement cuisiné. Les desserts maison sont également délicieux. Les prix sont raisonnables pour la qualité proposée. Je recommande vivement ce restaurant pour un dîner en famille ou entre amis.",
    criteria: [
      "Description détaillée des différents aspects",
      "Utilisation d'adjectifs variés",
      "Expression d'opinions personnelles",
      "Structure logique du texte"
    ]
  },
  {
    id: 'ee-6',
    type: 'expression-ecrite',
    level: 'b1',
    question: "Écrivez une lettre à votre ancien professeur pour lui donner de vos nouvelles.",
    context: "Lettre amicale",
    minWords: 100,
    maxWords: 150,
    exampleAnswer: "Cher Monsieur Durant,\n\nJ'espère que vous allez bien. Je vous écris pour vous donner de mes nouvelles depuis l'obtention de mon diplôme. J'ai commencé à travailler dans une entreprise de marketing digital et j'aime beaucoup mon travail. Je mets en pratique tout ce que vous nous avez enseigné en classe de français, particulièrement pour la rédaction de contenus.\n\nJe tenais à vous remercier pour tout ce que vous m'avez appris. Vos cours m'ont vraiment aidé(e) dans mon parcours professionnel.\n\nBien cordialement,\nSophie Martin",
    criteria: [
      "Structure de la lettre",
      "Expression de la gratitude",
      "Narration au présent et passé composé",
      "Ton approprié"
    ]
  },
  {
    id: 'ee-7',
    type: 'expression-ecrite',
    level: 'b2',
    question: "Rédigez une lettre de motivation pour un stage dans une entreprise française. Expliquez vos motivations et vos compétences.",
    context: "Lettre de motivation",
    minWords: 150,
    maxWords: 200,
    exampleAnswer: "Madame, Monsieur,\n\nJe me permets de vous adresser ma candidature pour le stage de chargé(e) de communication au sein de votre entreprise.\n\nActuellement en master de communication digitale, je suis particulièrement intéressé(e) par votre approche innovante en matière de marketing digital. Vos récentes campagnes sur les réseaux sociaux ont particulièrement retenu mon attention.\n\nAu cours de mes études, j'ai développé de solides compétences en gestion de projets et en création de contenu. Mon stage précédent chez MediaCom m'a permis d'acquérir une expérience pratique en gestion de communauté et en analyse de données.\n\nJe suis convaincu(e) que mes compétences et ma motivation seraient des atouts pour votre équipe.\n\nJe reste à votre disposition pour un entretien.\n\nCordialement,\nCamille Durand",
    criteria: [
      "Structure formelle appropriée",
      "Argumentation claire et convaincante",
      "Mise en valeur des compétences",
      "Langue soutenue et professionnelle"
    ]
  },
  {
    id: 'ee-8',
    type: 'expression-ecrite',
    level: 'b2',
    question: "Rédigez un article sur l'importance du sport dans la vie quotidienne.",
    context: "Article de blog",
    minWords: 180,
    maxWords: 230,
    exampleAnswer: "Le sport : un élément essentiel pour une vie équilibrée\n\nDans notre société moderne où le travail occupe une place prépondérante, la pratique régulière d'une activité sportive est devenue indispensable. Non seulement le sport contribue à maintenir une bonne santé physique, mais il joue également un rôle crucial dans notre bien-être mental.\n\nPremièrement, l'exercice physique régulier permet de lutter contre le stress et l'anxiété. Il favorise la production d'endorphines, ces hormones du bonheur qui nous aident à nous sentir mieux. De plus, le sport nous aide à maintenir un poids santé et à renforcer notre système immunitaire.\n\nDeuxièmement, la pratique sportive peut être une excellente occasion de socialiser. Qu'il s'agisse de sports d'équipe ou d'activités en groupe, le sport nous permet de rencontrer de nouvelles personnes et de créer des liens.\n\nEnfin, le sport nous apprend la discipline et la persévérance, des qualités précieuses dans tous les aspects de notre vie.",
    criteria: [
      "Structure claire avec introduction et conclusion",
      "Arguments développés",
      "Exemples concrets",
      "Vocabulaire varié et précis"
    ]
  },
  {
    id: 'ee-9',
    type: 'expression-ecrite',
    level: 'c1',
    question: "Rédigez un essai sur l'impact des réseaux sociaux sur les relations humaines. Présentez les avantages et les inconvénients, puis donnez votre opinion.",
    context: "Essai argumentatif",
    minWords: 200,
    maxWords: 250,
    exampleAnswer: "Les réseaux sociaux ont profondément transformé notre façon d'interagir avec les autres. D'un côté, ils ont facilité la communication à distance et permis de maintenir des liens avec des proches géographiquement éloignés. Ils ont également créé de nouvelles opportunités de networking professionnel et de partage de connaissances.\n\nCependant, cette connectivité permanente a aussi ses revers. La qualité des interactions tend à se dégrader, privilégiant la quantité au détriment de la profondeur. Le phénomène de la 'vie en vitrine' encourage une forme de superficialité et de comparaison sociale constante.\n\nPar ailleurs, l'addiction aux réseaux sociaux est un problème croissant, affectant particulièrement les jeunes générations. Le temps passé en ligne réduit les interactions face à face, essentielles au développement des compétences sociales.\n\nÀ mon sens, il est crucial de trouver un équilibre. Les réseaux sociaux sont des outils puissants qui, utilisés avec discernement, peuvent enrichir nos relations sociales. Néanmoins, ils ne devraient pas se substituer aux interactions réelles, mais plutôt les compléter.",
    criteria: [
      "Structure argumentative claire",
      "Analyse approfondie",
      "Vocabulaire riche et précis",
      "Expression d'une opinion nuancée",
      "Cohérence et cohésion du texte"
    ]
  },
  {
    id: 'ee-10',
    type: 'expression-ecrite',
    level: 'c1',
    question: "Rédigez un rapport sur les solutions possibles pour réduire l'empreinte carbone des entreprises.",
    context: "Rapport professionnel",
    minWords: 220,
    maxWords: 270,
    exampleAnswer: "Rapport sur la réduction de l'empreinte carbone en entreprise\n\nObjectif :\nCe rapport vise à présenter les principales solutions permettant aux entreprises de réduire leur impact environnemental tout en maintenant leur efficacité opérationnelle.\n\nSolutions proposées :\n\n1. Optimisation énergétique\n- Installation de systèmes d'éclairage intelligents\n- Modernisation des systèmes de chauffage et climatisation\n- Utilisation d'énergies renouvelables\n\n2. Politique de transport\n- Encouragement du télétravail\n- Mise en place d'une flotte de véhicules électriques\n- Promotion du covoiturage et des transports en commun\n\n3. Gestion des déchets\n- Mise en place du tri sélectif\n- Réduction des impressions papier\n- Recyclage du matériel informatique\n\nRecommandations :\nIl est conseillé d'adopter une approche progressive en commençant par les solutions les plus facilement réalisables. Un suivi régulier des résultats permettra d'ajuster les mesures selon leur efficacité.\n\nConclusion :\nLa réduction de l'empreinte carbone nécessite un engagement à long terme et une sensibilisation continue des employés. Les investissements initiaux seront compensés par les économies réalisées et l'amélioration de l'image de l'entreprise.",
    criteria: [
      "Structure formelle du rapport",
      "Propositions concrètes",
      "Vocabulaire technique approprié",
      "Clarté des recommandations",
      "Conclusion synthétique"
    ]
  }
];
