import { NextResponse } from 'next/server';
import { queryDeepseekViaOllama, checkOllamaAvailability } from '@/app/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const USE_OLLAMA = process.env.USE_OLLAMA === 'true';

type LanguageType = 'fr' | 'en';

export async function POST(request: Request) {
  let userLang: LanguageType = 'fr';

  try {
    const { secteur, experience, entreprise, poste, langue = 'fr' as LanguageType } = await request.json();
    userLang = langue;

    if (!secteur || !experience || !entreprise || !poste) {
      return NextResponse.json(
        { 
          error: userLang === 'fr' 
            ? 'Tous les champs sont requis'
            : 'All fields are required'
        },
        { status: 400 }
      );
    }

    const systemPrompt = langue === 'fr' 
      ? 'Tu es un expert en rédaction de lettres de motivation professionnelles.'
      : 'You are an expert in writing professional cover letters.';

    const userPrompt = langue === 'fr' 
      ? `Écris une lettre de motivation professionnelle pour un poste de ${poste} chez ${entreprise}. 
         Le candidat a ${experience} d'expérience dans le secteur ${secteur}.
         La lettre doit être formelle, persuasive et bien structurée.
         Structure la lettre avec :
         - Une introduction accrocheuse
         - 2-3 paragraphes détaillant l'expérience et les motivations
         - Une conclusion avec appel à l'action`
      : `Write a professional cover letter for a ${poste} position at ${entreprise}. 
         The candidate has ${experience} of experience in the ${secteur} sector.
         The letter should be formal, persuasive and well structured.
         Structure the letter with:
         - A compelling introduction
         - 2-3 paragraphs detailing experience and motivations
         - A conclusion with call to action`;

    let content: string;

    // Utiliser Ollama si activé, sinon fallback sur l'API Deepseek
    if (USE_OLLAMA) {
      console.log('Utilisation d\'Ollama (local - gratuit) pour lettre de motivation');
      
      const isAvailable = await checkOllamaAvailability();
      if (!isAvailable) {
        throw new Error('Ollama n\'est pas disponible. Lance Ollama ou désactive USE_OLLAMA dans .env.local');
      }

      content = await queryDeepseekViaOllama(systemPrompt, userPrompt, {
        temperature: 0.7,
        maxTokens: 1000
      });
    } else {
      console.log('Utilisation de l\'API Deepseek Cloud (payant) pour lettre de motivation');
      
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
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Erreur lors de la génération de la lettre');
      }

      const data = await response.json();
      content = data.choices[0].message.content;
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Erreur lors de la génération de la lettre:', error);
    return NextResponse.json(
      { 
        error: userLang === 'fr'
          ? 'Une erreur est survenue lors de la génération de la lettre'
          : 'An error occurred while generating the cover letter'
      },
      { status: 500 }
    );
  }
}
