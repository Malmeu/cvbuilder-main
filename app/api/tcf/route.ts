import { NextResponse } from 'next/server';

// Types
interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  audioUrl?: string;
  imageUrl?: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

// Base de données simulée de questions
const questions: Question[] = [
  {
    id: 1,
    type: 'comprehension-orale',
    question: "Écoutez l'audio et choisissez la bonne réponse : Où se passe la conversation ?",
    options: ['À la boulangerie', 'Au restaurant', 'À la gare', 'Au supermarché'],
    correctAnswer: 'À la gare',
    audioUrl: '/audio/conversation-gare.mp3',
    level: 'A2'
  },
  {
    id: 2,
    type: 'comprehension-ecrite',
    question: "Lisez le texte suivant et répondez à la question : [Texte sur une annonce d'emploi]",
    options: ['Un poste de vendeur', 'Un poste de manager', 'Un poste de serveur', 'Un poste de comptable'],
    correctAnswer: 'Un poste de manager',
    level: 'B1'
  },
  // Ajoutez plus de questions ici
];

export async function POST(request: Request) {
  try {
    const { type, level } = await request.json();

    // Filtrer les questions par type et niveau
    const filteredQuestions = questions.filter(q => 
      (!type || q.type === type) && 
      (!level || q.level === level)
    );

    // Mélanger les questions et en prendre 5 au maximum
    const shuffledQuestions = filteredQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    return NextResponse.json(shuffledQuestions);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des questions' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { questionId, answer, userId } = await request.json();

    // Vérifier la réponse
    const question = questions.find(q => q.id === questionId);
    const isCorrect = question?.correctAnswer === answer;

    // Ici, vous pourriez sauvegarder les résultats dans une base de données

    return NextResponse.json({
      correct: isCorrect,
      feedback: isCorrect 
        ? 'Bravo ! C\'est la bonne réponse.'
        : `Désolé, ce n'est pas correct. La bonne réponse était : ${question?.correctAnswer}`,
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de la réponse:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de la réponse' },
      { status: 500 }
    );
  }
}
