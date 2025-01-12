import { NextResponse } from 'next/server';
import { analyzeCV } from '@/app/lib/ai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

type LanguageType = 'fr' | 'en';

export async function POST(request: Request) {
  let userLang: LanguageType = 'fr';

  try {
    console.log('Début de l\'analyse du CV');
    const { cvContent, langue = 'fr' as LanguageType } = await request.json();
    userLang = langue;

    if (!cvContent) {
      return NextResponse.json(
        { 
          error: userLang === 'fr' 
            ? 'Le contenu du CV est requis'
            : 'CV content is required'
        },
        { status: 400 }
      );
    }

    console.log('Longueur du CV:', cvContent.length);
    const maxLength = 4000;
    const truncatedContent = cvContent.slice(0, maxLength);

    const analysis = await analyzeCV(truncatedContent, langue);
    console.log('Analyse terminée avec succès');

    if (analysis.error) {
      return NextResponse.json(
        { 
          error: userLang === 'fr'
            ? 'Une erreur est survenue lors de l\'analyse du CV'
            : 'An error occurred while analyzing the CV'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Erreur lors de l\'analyse du CV:', error);
    return NextResponse.json(
      { 
        error: userLang === 'fr'
          ? 'Une erreur est survenue lors de l\'analyse du CV'
          : 'An error occurred while analyzing the CV'
      },
      { status: 500 }
    );
  }
}
