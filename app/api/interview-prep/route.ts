import { NextResponse } from 'next/server';
import { queryDeepseekViaOllama, checkOllamaAvailability } from '@/app/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const USE_OLLAMA = process.env.USE_OLLAMA === 'true';

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

    const systemPrompt = langue === 'fr'
      ? 'Tu es un expert en recrutement. Génère une préparation d\'entretien en format JSON uniquement, sans texte additionnel.'
      : 'You are a recruitment expert. Generate an interview preparation in JSON format only, without any additional text.';

    const userPrompt = langue === 'fr'
      ? `Prépare un entretien pour un poste de ${poste} chez ${entreprise}.${
          experience ? ` Le candidat a ${experience} d'expérience.` : ''
        }
        Retourne UNIQUEMENT un objet JSON avec cette structure exacte :
        {
          "questions_techniques": ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
          "questions_culture": ["Question 1", "Question 2", "Question 3"],
          "questions_pieges": ["Question 1", "Question 2"],
          "conseils_preparation": ["Conseil 1", "Conseil 2", "Conseil 3"],
          "points_cles": ["Point 1", "Point 2"]
        }`
      : `Prepare an interview for a ${poste} position at ${entreprise}.${
          experience ? ` The candidate has ${experience} of experience.` : ''
        }
        Return ONLY a JSON object with this exact structure:
        {
          "questions_techniques": ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
          "questions_culture": ["Question 1", "Question 2", "Question 3"],
          "questions_pieges": ["Question 1", "Question 2"],
          "conseils_preparation": ["Tip 1", "Tip 2", "Tip 3"],
          "points_cles": ["Point 1", "Point 2"]
        }`;

    let content: string;

    // Utiliser Ollama si activé, sinon fallback sur l'API Deepseek
    if (USE_OLLAMA) {
      console.log('Utilisation d\'Ollama (local - gratuit) pour préparation d\'entretien');
      
      const isAvailable = await checkOllamaAvailability();
      if (!isAvailable) {
        throw new Error('Ollama n\'est pas disponible. Lance Ollama ou désactive USE_OLLAMA dans .env.local');
      }

      content = await queryDeepseekViaOllama(systemPrompt, userPrompt, {
        temperature: 0.7,
        format: 'json'
      });
    } else {
      console.log('Utilisation de l\'API Deepseek Cloud (payant) pour préparation d\'entretien');
      
      const apiKey = process.env.DEEPSEEK_API_KEY;
      if (!apiKey) {
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
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      content = data.choices[0].message.content;
    }

    // Parser le JSON
    let prepData;
    try {
      prepData = typeof content === 'string' ? JSON.parse(content) : content;
    } catch (parseError) {
      const cleanedContent = content.replace(/[\n\r\t]/g, '').trim();
      prepData = JSON.parse(cleanedContent);
    }

    // Normaliser les données
    const result = {
      questions_techniques: Array.isArray(prepData.questions_techniques) ? prepData.questions_techniques.slice(0, 5) : [],
      questions_culture: Array.isArray(prepData.questions_culture) ? prepData.questions_culture.slice(0, 3) : [],
      questions_pieges: Array.isArray(prepData.questions_pieges) ? prepData.questions_pieges.slice(0, 2) : [],
      conseils_preparation: Array.isArray(prepData.conseils_preparation) ? prepData.conseils_preparation.slice(0, 3) : [],
      points_cles: Array.isArray(prepData.points_cles) ? prepData.points_cles.slice(0, 2) : []
    };

    return NextResponse.json(result);
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
