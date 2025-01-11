import { NextResponse } from 'next/server';

export const maxDuration = 60; // Limité à 60 secondes pour Vercel hobby
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
              ? `Tu es un expert en recrutement qui analyse uniquement ${section} du CV.`
              : `You are a recruitment expert analyzing only the ${section} of the resume.`
          },
          {
            role: 'user',
            content: content
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
        timeout: 30000
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
    const maxLength = 3000;
    const truncatedContent = cvContent
      .slice(0, maxLength)
      .replace(/\s+/g, ' ')
      .trim();
    console.log('Longueur du CV après troncature:', truncatedContent.length);

    try {
      const [scoreAnalysis, strengthsAnalysis, recommendationsAnalysis] = await Promise.all([
        analyzeSection(
          langue === 'fr'
            ? `Évalue ce CV sur 100 points en te basant sur sa structure, son contenu et sa clarté. Réponds uniquement avec un nombre entre 0 et 100.\n\n${truncatedContent}`
            : `Evaluate this resume out of 100 points based on its structure, content and clarity. Reply only with a number between 0 and 100.\n\n${truncatedContent}`,
          'score',
          langue
        ),

        analyzeSection(
          langue === 'fr'
            ? `Identifie les 2-3 points forts principaux de ce CV. Sois bref et direct.\n\n${truncatedContent}`
            : `Identify the 2-3 main strengths of this resume. Be brief and direct.\n\n${truncatedContent}`,
          'points forts',
          langue
        ),

        analyzeSection(
          langue === 'fr'
            ? `Suggère 3 améliorations essentielles pour ce CV. Sois bref et direct.\n\n${truncatedContent}`
            : `Suggest 3 essential improvements for this resume. Be brief and direct.\n\n${truncatedContent}`,
          'recommandations',
          langue
        )
      ]);

      console.log('Analyses terminées avec succès');
      console.log('Score analysis:', scoreAnalysis);
      console.log('Strengths:', strengthsAnalysis);
      console.log('Recommendations:', recommendationsAnalysis);

      const scoreMatch = scoreAnalysis.match(/\d+/);
      const score = scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[0]))) : 70;

      const recommendations = [
        ...strengthsAnalysis.split('\n').filter((line: string) => line.trim()),
        ...recommendationsAnalysis.split('\n').filter((line: string) => line.trim())
      ].map((line: string) => line.replace(/^[-•*]\s*/, '').trim());

      return NextResponse.json({
        score,
        recommendations: recommendations.filter(rec => rec.length > 0)
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
