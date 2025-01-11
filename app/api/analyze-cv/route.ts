import { NextResponse } from 'next/server';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

type LanguageType = 'fr' | 'en';

async function analyzeSection(content: string, section: string, langue: LanguageType) {
  console.log(`Début de l'analyse de la section: ${section}`);
  
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('Clé API Deepseek manquante');
    throw new Error('Configuration API manquante');
  }

  try {
    console.log(`Envoi de la requête à Deepseek pour la section: ${section}`);
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat', 
        messages: [
          {
            role: 'system',
            content: langue === 'fr'
              ? 'Tu es un expert en recrutement qui analyse des CV.'
              : 'You are a recruitment expert who analyzes resumes.'
          },
          {
            role: 'user',
            content: langue === 'fr'
              ? `Analyse ce CV et fournis :
                 1. Un score sur 100
                 2. Une liste de recommandations pour l'améliorer

                 CV à analyser :
                 ${content}`
              : `Analyze this resume and provide:
                 1. A score out of 100
                 2. A list of recommendations for improvement

                 Resume to analyze:
                 ${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    console.log(`Réponse reçue pour ${section}, status:`, response.status);
    const responseText = await response.text();
    console.log(`Réponse brute pour ${section}:`, responseText);

    if (!response.ok) {
      throw new Error(`Erreur API pour ${section}: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return data.choices[0].message.content;
  } catch (error) {
    console.error(`Erreur dans analyzeSection pour ${section}:`, error);
    throw error;
  }
}

export async function POST(request: Request) {
  let userLang: LanguageType = 'fr';

  try {
    console.log('Début de l\'analyse du CV');
    const { cvContent, langue = 'fr' as LanguageType } = await request.json();
    userLang = langue;

    if (!cvContent) {
      return NextResponse.json(
        { error: 'Le contenu du CV est requis' },
        { status: 400 }
      );
    }

    console.log('Longueur du CV:', cvContent.length);
    const maxLength = 4000;
    const truncatedContent = cvContent.slice(0, maxLength);

    try {
      const analysis = await analyzeSection(truncatedContent, 'cv', langue);

      console.log('Analyse terminée avec succès');
      console.log('Analyse:', analysis);

      // Extraire le score et les recommandations
      const scoreMatch = analysis.match(/(\d+)\/100/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
      
      const recommendations = analysis
        .split('\n')
        .filter((line: string) => line.trim().length > 0 && !line.includes('/100'))
        .map((line: string) => line.replace(/^[0-9-.\s]+/, '').trim());

      return NextResponse.json({
        score,
        recommendations
      });

    } catch (analysisError) {
      console.error('Erreur pendant l\'analyse:', analysisError);
      throw new Error('Erreur lors de l\'analyse du CV: ' + (analysisError as Error).message);
    }

  } catch (error) {
    console.error('Erreur globale:', error);
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
