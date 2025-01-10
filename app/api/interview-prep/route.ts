import { NextResponse } from 'next/server';
import { generateInterviewPrep } from '@/app/lib/ai';

export async function POST(request: Request) {
  try {
    console.log('Début du traitement de la requête interview-prep');
    const { poste, entreprise, experience } = await request.json();
    console.log('Données reçues:', { poste, entreprise, experience });

    if (!poste || !entreprise) {
      console.log('Données manquantes');
      return NextResponse.json(
        { error: 'Le poste et l\'entreprise sont requis' },
        { status: 400 }
      );
    }

    console.log('Appel à generateInterviewPrep');
    const prepData = await generateInterviewPrep(poste, entreprise, experience);
    console.log('Réponse de generateInterviewPrep:', prepData);

    if (prepData.error) {
      console.error('Erreur retournée par generateInterviewPrep:', prepData.error);
      return NextResponse.json(
        { error: prepData.error },
        { status: 500 }
      );
    }

    return NextResponse.json(prepData);
  } catch (error) {
    console.error('Erreur complète lors de la génération des questions:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la génération des questions' },
      { status: 500 }
    );
  }
}
