import { NextRequest, NextResponse } from 'next/server';
import { TTSService } from '@/app/services/tts.service';
import { z } from 'zod';

const ttsRequestSchema = z.object({
  text: z.string().min(1),
  languageCode: z.string().optional(),
  voiceName: z.string().optional(),
  speakingRate: z.number().min(0.25).max(4).optional(),
  pitch: z.number().min(-20).max(20).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ttsRequestSchema.parse(body);

    const tts = new TTSService();
    const audioContent = await tts.synthesizeSpeech(
      validatedData.text,
      {
        languageCode: validatedData.languageCode,
        voiceName: validatedData.voiceName,
        speakingRate: validatedData.speakingRate,
        pitch: validatedData.pitch,
      }
    );

    // Convertir le Buffer en Uint8Array pour le streaming
    const audioBuffer = Buffer.from(audioContent as Buffer);
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Erreur lors de la synthèse vocale:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur lors de la synthèse vocale' },
      { status: 500 }
    );
  }
}
