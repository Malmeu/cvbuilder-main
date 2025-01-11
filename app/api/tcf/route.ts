import { NextResponse } from 'next/server';
import { grammaire } from '@/app/data/tcf/grammaire';
import { comprehensionOrale } from '@/app/data/tcf/comprehension-orale';
import { comprehensionEcrite } from '@/app/data/tcf/comprehension-ecrite';
import { expressionEcrite } from '@/app/data/tcf/expression-ecrite';
import { expressionOrale } from '@/app/data/tcf/expression-orale';
import { TCFMultipleChoiceQuestion, TCFWritingQuestion, TCFSpeakingQuestion } from '@/app/data/tcf/types';

// Types
interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  correctAnswer?: number;
  audioUrl?: string;
  imageUrl?: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

const allQuestions = {
  grammaire,
  'comprehension-orale': comprehensionOrale,
  'comprehension-ecrite': comprehensionEcrite,
  'expression-ecrite': expressionEcrite,
  'expression-orale': expressionOrale
};

export async function POST(request: Request) {
  try {
    const { type, level } = await request.json();

    // Filtrer les questions par type et niveau
    const filteredQuestions = Object.values(allQuestions).flat().filter(q => 
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
    const { questionId, answer } = await request.json();
    console.log('Vérification de réponse:', { questionId, answer });

    // Trouver la question dans toutes les sections
    let question: TCFMultipleChoiceQuestion | TCFWritingQuestion | TCFSpeakingQuestion | undefined;
    for (const questions of Object.values(allQuestions)) {
      question = questions.find(q => q.id === questionId);
      if (question) break;
    }

    if (!question) {
      console.error('Question non trouvée:', questionId);
      return NextResponse.json(
        { error: 'Question non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier si c'est une question à choix multiple
    if ('correctAnswer' in question) {
      const isCorrect = parseInt(answer) === question.correctAnswer;

      console.log('Résultat de la vérification:', {
        questionId,
        answerGiven: parseInt(answer),
        correctAnswer: question.correctAnswer,
        isCorrect
      });

      return NextResponse.json({
        correct: isCorrect,
        feedback: isCorrect 
          ? 'Bravo ! C\'est la bonne réponse.'
          : 'Désolé, ce n\'est pas correct.',
      });
    } else {
      // Pour les questions d'expression écrite et orale
      return NextResponse.json({
        correct: true, // Ces questions sont toujours considérées comme correctes
        feedback: 'Réponse enregistrée.',
      });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la réponse:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de la réponse' },
      { status: 500 }
    );
  }
}
