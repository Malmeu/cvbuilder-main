import { NextResponse } from 'next/server';
import { queryDeepseekViaOllama, checkOllamaAvailability } from '@/app/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const USE_OLLAMA = process.env.USE_OLLAMA === 'true';

interface Message {
  type: 'user' | 'agent';
  content: string;
}

export async function POST(request: Request) {
  try {
    const { userInput, question, questionIndex, previousMessages } = await request.json();

    // Construire le contexte de la conversation
    const conversationContext = previousMessages
      .map((msg: Message) => `${msg.type === 'user' ? 'Candidat' : 'Agent'}: ${msg.content}`)
      .join('\n');

    const systemPrompt = `Tu es un agent consulaire expérimenté qui conduit des entretiens pour les visas étudiants. 
    Tu dois évaluer les réponses du candidat et fournir des retours constructifs et des conseils.
    Sois professionnel mais bienveillant. Pose des questions de suivi si nécessaire.
    Question actuelle: "${question}"
    Index de la question: ${questionIndex}
    
    Format de réponse souhaité:
    1. Un bref commentaire sur la réponse du candidat
    2. Des suggestions d'amélioration si nécessaire
    3. Une transition vers la prochaine question ou une conclusion`;

    const userPrompt = `Contexte de la conversation:\n${conversationContext}\n\nRéponse du candidat à la question "${question}":\n${userInput}`;

    let responseContent: string;

    // Utiliser Ollama si activé, sinon fallback sur l'API Deepseek
    if (USE_OLLAMA) {
      console.log('Utilisation d\'Ollama (local - gratuit) pour entretien visa');
      
      const isAvailable = await checkOllamaAvailability();
      if (!isAvailable) {
        throw new Error('Ollama n\'est pas disponible. Lance Ollama ou désactive USE_OLLAMA dans .env.local');
      }

      responseContent = await queryDeepseekViaOllama(systemPrompt, userPrompt, {
        temperature: 0.7,
        maxTokens: 500
      });
    } else {
      console.log('Utilisation de l\'API Deepseek Cloud (payant) pour entretien visa');
      
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
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Réponse erreur Deepseek:', text);
        throw new Error(text);
      }

      const data = await response.json();
      responseContent = data.choices[0].message.content;
    }

    return NextResponse.json({ response: responseContent });
  } catch (error) {
    console.error('Erreur lors de la génération de la réponse:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la génération de la réponse' },
      { status: 500 }
    );
  }
}
