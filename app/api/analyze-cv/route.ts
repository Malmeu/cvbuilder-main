import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { cvContent, langue = 'fr' } = await request.json();

    if (!cvContent) {
      return NextResponse.json(
        { error: 'Le contenu du CV est requis' },
        { status: 400 }
      );
    }

    console.log('API Key:', process.env.DEEPSEEK_API_KEY ? 'Présente' : 'Manquante');

    const prompt = langue === 'fr'
      ? `Analyse ce CV et fournis :
         1. Un score sur 100
         2. Une liste de recommandations détaillées pour l'améliorer
         3. Les points forts du CV
         4. Les éléments manquants ou à améliorer
         5. Suggestions pour mieux adapter le CV aux ATS

         CV à analyser :
         ${cvContent}`
      : `Analyze this resume and provide:
         1. A score out of 100
         2. A detailed list of recommendations for improvement
         3. CV strengths
         4. Missing or improvable elements
         5. Suggestions for better ATS optimization

         Resume to analyze:
         ${cvContent}`;

    console.log('Envoi de la requête à Deepseek');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: langue === 'fr'
              ? 'Tu es un expert en recrutement et en analyse de CV. Tu dois fournir une analyse détaillée et des recommandations concrètes.'
              : 'You are an expert in recruitment and resume analysis. Provide detailed analysis and concrete recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    console.log('Réponse Deepseek status:', response.status);
    const responseText = await response.text();
    console.log('Réponse Deepseek:', responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'appel à l\'API Deepseek' },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    const analysis = data.choices[0].message.content;
    
    // Extraire le score et les recommandations de la réponse
    const scoreMatch = analysis.match(/(\d+)\/100/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
    
    // Convertir la réponse en format structuré
    const recommendations = analysis
      .split('\n')
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => line.replace(/^[0-9-.\s]+/, '').trim());

    return NextResponse.json({
      score,
      recommendations
    });
  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'analyse du CV'
      },
      { status: 500 }
    );
  }
}
