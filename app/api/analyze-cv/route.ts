import { NextResponse } from 'next/server';

export const maxDuration = 300; // Augmenter la durée maximale à 300 secondes
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { cvContent, langue = 'fr' } = await request.json();

    if (!cvContent) {
      return NextResponse.json(
        { error: 'Le contenu du CV est requis' },
        { status: 400 }
      );
    }

    // Limiter la taille du CV
    const maxLength = 4000;
    const truncatedContent = cvContent.slice(0, maxLength);

    console.log('API Key:', process.env.DEEPSEEK_API_KEY ? 'Présente' : 'Manquante');

    const prompt = langue === 'fr'
      ? `Analyse ce CV de manière concise et fournis :
         1. Un score sur 100
         2. 3-5 recommandations clés pour l'améliorer
         3. Points forts principaux
         4. Éléments essentiels manquants

         CV à analyser :
         ${truncatedContent}`
      : `Analyze this resume concisely and provide:
         1. A score out of 100
         2. 3-5 key recommendations for improvement
         3. Main strengths
         4. Essential missing elements

         Resume to analyze:
         ${truncatedContent}`;

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
              ? 'Tu es un expert en recrutement. Fournis une analyse courte et précise.'
              : 'You are a recruitment expert. Provide a short and precise analysis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 800, // Réduire le nombre de tokens
        timeout: 25000 // Timeout de 25 secondes
      })
    });

    console.log('Réponse Deepseek status:', response.status);
    
    if (!response.ok) {
      throw new Error('Erreur lors de l\'appel à l\'API Deepseek');
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;
    
    // Extraire le score et les recommandations de la réponse
    const scoreMatch = analysis.match(/(\d+)\/100/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
    
    // Convertir la réponse en format structuré
    const recommendations = analysis
      .split('\n')
      .filter((line: string) => line.trim().length > 0 && !line.includes('/100'))
      .map((line: string) => line.replace(/^[0-9-.\s]+/, '').trim());

    return NextResponse.json({
      score,
      recommendations
    });
  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { 
        error: 'Le service d\'analyse est temporairement surchargé. Veuillez réessayer dans quelques instants.'
      },
      { status: 503 }
    );
  }
}
