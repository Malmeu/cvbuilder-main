import { NextResponse } from 'next/server';

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

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error('Clé API Deepseek manquante');
      throw new Error('Configuration API manquante');
    }

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
                 ${truncatedContent}`
              : `Analyze this resume and provide:
                 1. A score out of 100
                 2. A list of recommendations for improvement

                 Resume to analyze:
                 ${truncatedContent}`
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Réponse erreur Deepseek:', text);
      throw new Error(text);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

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
