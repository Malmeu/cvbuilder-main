import { NextResponse } from 'next/server';
import { generateInterviewPrep } from '@/app/lib/ai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

type LanguageType = 'fr' | 'en';

export async function POST(request: Request) {
  let userLang: LanguageType = 'fr';

  try {
    console.log('Début du traitement de la requête interview-prep');
    const { poste, entreprise, experience, langue = 'fr' as LanguageType } = await request.json();
    userLang = langue;
    console.log('Données reçues:', { poste, entreprise, experience, langue });

    if (!poste || !entreprise) {
      console.log('Données manquantes');
      return NextResponse.json(
        { 
          error: userLang === 'fr' 
            ? 'Le poste et l\'entreprise sont requis'
            : 'Position and company are required'
        },
        { status: 400 }
      );
    }

    console.log('Appel à generateInterviewPrep');
    const prepData = await generateInterviewPrep(poste, entreprise, experience, userLang);
    console.log('Réponse reçue de generateInterviewPrep');

    if (!prepData || prepData.error) {
      console.error('Erreur retournée par generateInterviewPrep:', prepData?.error);
      return NextResponse.json(
        { 
          error: userLang === 'fr'
            ? 'Une erreur est survenue lors de la génération des questions. Veuillez réessayer.'
            : 'An error occurred while generating questions. Please try again.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(prepData);
  } catch (error) {
    console.error('Erreur complète lors de la génération des questions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { 
        error: userLang === 'fr'
          ? `Une erreur est survenue: ${errorMessage}`
          : `An error occurred: ${errorMessage}`
      },
      { status: 503 }
    );
  }
}
