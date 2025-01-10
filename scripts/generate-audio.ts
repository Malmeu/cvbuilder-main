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
  'a1-cafe.mp3': {
    text: `
      - Bonjour monsieur, que désirez-vous ?
      - Bonjour, je voudrais un café au lait s'il vous plaît.
      - Un café au lait, très bien. Ce sera tout ?
      - Oui, merci.
      - Ça fait 3 euros 50 s'il vous plaît.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-A' }
  },
  'a1-train.mp3': {
    text: `
      - Bonjour, je voudrais un billet pour Paris s'il vous plaît.
      - Oui, pour quel jour ?
      - Pour aujourd'hui, le prochain train.
      - Il y a un train dans 30 minutes. Ça fait 45 euros.
      - D'accord, je prends.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-B' }
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
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-C' }
  },
  'a2-cinema.mp3': {
    text: `
      Salut Marie ! J'ai vu qu'il y a un nouveau film français au cinéma ce soir. 
      Ça te dit d'aller le voir ? La séance est à 20h30. Rappelle-moi quand tu 
      as ce message. À plus !
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-D' }
  },
  'b1-ecologie.mp3': {
    text: `
      Dans notre journal aujourd'hui, nous parlons du développement durable. De plus 
      en plus d'entreprises s'engagent pour réduire leur impact environnemental. 
      Elles adoptent des solutions écologiques comme l'utilisation d'énergies 
      renouvelables ou la réduction des déchets. Ces initiatives sont essentielles 
      pour protéger notre planète.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-A' }
  },
  'b1-sante.mp3': {
    text: `
      L'activité physique est essentielle pour maintenir une bonne santé. Les experts 
      recommandent de faire au moins 30 minutes d'exercice par jour. Cela peut être 
      de la marche, de la natation ou du vélo. L'important est de bouger régulièrement 
      pour rester en forme.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-B' }
  },
  'b2-teletravail.mp3': {
    text: `
      Selon notre étude récente, le télétravail a un impact positif sur la productivité 
      des employés. Les personnes travaillant à domicile rapportent moins de stress, 
      une meilleure concentration et un meilleur équilibre vie professionnelle-vie 
      personnelle. Les entreprises constatent également une réduction des coûts 
      opérationnels.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-C' }
  },
  'b2-innovation.mp3': {
    text: `
      L'innovation est la clé de la réussite dans le monde des affaires moderne. 
      Les entreprises qui ne s'adaptent pas aux changements technologiques risquent 
      de perdre leur compétitivité. Il est crucial d'investir dans la recherche et 
      le développement pour rester à la pointe de son secteur.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-D' }
  },
  'c1-education.mp3': {
    text: `
      Le système éducatif doit évoluer pour répondre aux défis du 21e siècle. 
      L'intégration des nouvelles technologies dans l'enseignement n'est plus une 
      option mais une nécessité. Nous devons former les élèves aux compétences 
      numériques tout en préservant les fondamentaux de l'apprentissage. Cette 
      transformation requiert une approche équilibrée et réfléchie.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-A' }
  },
  'c1-science.mp3': {
    text: `
      La recherche scientifique est le moteur du progrès humain. Sans investissement 
      dans la recherche fondamentale et appliquée, nous ne pourrons pas relever les 
      grands défis de notre époque : le changement climatique, les maladies émergentes, 
      la transition énergétique. Il est impératif de soutenir la communauté scientifique 
      et de valoriser son travail essentiel.
    `,
    voiceParams: { languageCode: 'fr-FR', name: 'fr-FR-Neural2-B' }
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
