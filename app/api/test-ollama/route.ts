import { NextResponse } from 'next/server';
import { queryDeepseekViaOllama, checkOllamaAvailability } from '@/app/lib/ollama';

export async function GET() {
  try {
    // Vérifier si Ollama est disponible
    const isAvailable = await checkOllamaAvailability();
    
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Ollama n\'est pas disponible. Assure-toi qu\'il est lancé.' },
        { status: 503 }
      );
    }

    // Test simple
    const response = await queryDeepseekViaOllama(
      'Tu es un assistant utile.',
      'Réponds simplement "OK" si tu me comprends.',
      { temperature: 0.7 }
    );

    return NextResponse.json({
      success: true,
      message: 'Ollama fonctionne correctement !',
      response,
      model: 'deepseek-v3.1:671b-cloud'
    });
  } catch (error) {
    console.error('Erreur test Ollama:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors du test Ollama',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
