import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const credentials = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
};

export class TTSService {
  private client: TextToSpeechClient;

  constructor() {
    this.client = new TextToSpeechClient({
      credentials,
      projectId: credentials.projectId,
    });
  }

  async synthesizeSpeech(text: string, options: {
    languageCode?: string;
    voiceName?: string;
    speakingRate?: number;
    pitch?: number;
  } = {}) {
    const {
      languageCode = 'fr-FR',
      voiceName = 'fr-FR-Neural2-A',
      speakingRate = 1,
      pitch = 0
    } = options;

    try {
      const request = {
        input: { text },
        voice: {
          languageCode,
          name: voiceName,
        },
        audioConfig: {
          audioEncoding: 'MP3' as const,
          speakingRate,
          pitch,
          effectsProfileId: ['handset-class-device'],
        },
      };

      const [response] = await this.client.synthesizeSpeech(request);
      return response.audioContent;
    } catch (error) {
      console.error('Erreur lors de la synthèse vocale:', error);
      throw error;
    }
  }

  async generateAudioFile(text: string, outputPath: string, options = {}) {
    try {
      const audioContent = await this.synthesizeSpeech(text, options);
      if (audioContent) {
        await fs.promises.writeFile(outputPath, audioContent, 'binary');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de la génération du fichier audio:', error);
      return false;
    }
  }
}
