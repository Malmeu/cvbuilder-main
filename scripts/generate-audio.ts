import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

type AudioContent = {
  text: string;
  voiceParams: {
    languageCode: string;
    name: string;
  };
};

// Dialogues pour la compréhension orale
const audioContent: Record<string, AudioContent> = {
  'a1-lieu.mp3': {
    text: `
      - Bonjour madame, je voudrais des médicaments pour le mal de tête.
      - Bien sûr. Avez-vous une ordonnance ?
      - Non, je voudrais juste du paracétamol.
      - D'accord, je vous conseille cette boîte. C'est 5 euros.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-A' }
  },
  'a1-train.mp3': {
    text: `
      Attention s'il vous plaît. Le TGV numéro 5872 à destination de Lyon Part-Dieu 
      va partir de la voie 7 dans 5 minutes. Les voyageurs sont priés de se rendre 
      sur le quai.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-D' }
  },
  'a2-rdv.mp3': {
    text: `
      - Cabinet médical du Dr Martin, bonjour.
      - Bonjour, je voudrais prendre rendez-vous avec le docteur.
      - Oui, c'est pour quel motif ?
      - J'ai de la fièvre depuis deux jours.
      - Je peux vous proposer demain à 14h30.
      - Oui, c'est parfait. Merci.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-B' }
  },
  'b1-ecologie.mp3': {
    text: `
      Selon un nouveau rapport scientifique, la pollution des océans atteint des 
      niveaux alarmants. Chaque année, plus de 8 millions de tonnes de plastique 
      sont déversées dans les mers. Cette pollution affecte gravement la vie marine 
      et peut avoir des conséquences sur la santé humaine. Des chercheurs appellent 
      à des mesures urgentes pour réduire la consommation de plastique.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-C' }
  },
  'b2-teletravail.mp3': {
    text: `
      Le télétravail a considérablement transformé notre façon de travailler. 
      D'après notre étude, la productivité a augmenté de 15% en moyenne, grâce 
      à une meilleure concentration et moins d'interruptions. Cependant, nous 
      constatons que l'isolement social est un défi majeur. 30% des employés 
      rapportent se sentir moins connectés à leurs collègues. Il est donc 
      crucial de trouver un équilibre entre travail à distance et présence au bureau.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-D' }
  }
};

async function generateAudio() {
  const client = new TextToSpeechClient({
    credentials: {
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    },
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  });
  
  const writeFile = util.promisify(fs.writeFile);
  const audioDir = path.join(process.cwd(), 'public/audio/tcf');

  // Créer le répertoire s'il n'existe pas
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  for (const [filename, content] of Object.entries(audioContent)) {
    try {
      console.log(`Génération de ${filename}...`);

      const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
        input: { text: content.text.trim() },
        voice: content.voiceParams,
        audioConfig: { 
          audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
          pitch: 0,
          speakingRate: 1,
          effectsProfileId: ['handset-class-device']
        },
      };

      const [response] = await client.synthesizeSpeech(request);
      if (response.audioContent) {
        const audioPath = path.join(audioDir, filename);
        await writeFile(audioPath, response.audioContent, 'binary');
        console.log(`Fichier audio généré : ${filename}`);
      }
    } catch (error) {
      console.error(`Erreur lors de la génération de ${filename}:`, error);
    }
  }
}

generateAudio().catch(console.error);
