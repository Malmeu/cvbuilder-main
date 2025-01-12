import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const client = new TextToSpeechClient({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  },
});

export async function POST(request: Request) {
  try {
    const { text, langue = 'fr-FR' } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Le texte est requis" },
        { status: 400 }
      );
    }

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { 
        languageCode: 'fr-FR',
        name: 'fr-FR-Neural2-A',
      },
      audioConfig: { 
        audioEncoding: 'MP3' as const,
        pitch: 0,
        speakingRate: 1,
      },
    });

    if (!response.audioContent) {
      throw new Error("Pas de contenu audio généré");
    }

    return NextResponse.json({ 
      audio: Buffer.from(response.audioContent).toString('base64') 
    });
  } catch (error) {
    console.error('Erreur Text-to-Speech:', error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de l'audio" },
      { status: 500 }
    );
  }
}
