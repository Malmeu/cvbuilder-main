import { queryDeepseekViaOllama, checkOllamaAvailability } from './ollama';

const USE_OLLAMA = process.env.USE_OLLAMA === 'true';

interface AIResponse {
  content: string;
  error?: string;
}

interface CVAnalysis {
  score: number;
  recommendations: string[];
  error?: string;
}

interface InterviewPrep {
  questions_techniques: string[];
  questions_culture: string[];
  questions_pieges: string[];
  conseils_preparation: string[];
  points_cles: string[];
  error?: string;
}

interface BlogArticle {
  title: string;
  slug: string;
  description: string;
  meta_description: string;
  content: string;
  tags: string[];
  category: string;
  image_url: string;
  error?: string;
}

export async function generateCoverLetter(
  secteur: string,
  experience: string,
  entreprise: string,
  poste: string,
  langue: 'fr' | 'en' = 'fr'
): Promise<AIResponse> {
  try {
    console.log('Envoi de la requête à /api/generate-cover-letter');
    const response = await fetch('/api/generate-cover-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secteur,
        experience,
        entreprise,
        poste,
        langue
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la génération de la lettre');
    }

    const data = await response.json();
    return { content: data.content };
  } catch (error) {
    console.error('Erreur AI:', error);
    return { 
      content: '',
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la génération de la lettre. Veuillez réessayer.'
    };
  }
}

export async function analyzeCV(
  cvContent: string,
  langue: 'fr' | 'en' = 'fr'
): Promise<CVAnalysis> {
  try {
    console.log('Envoi de la requête à /api/analyze-cv');
    const response = await fetch('/api/analyze-cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cvContent,
        langue
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Réponse erreur:', text);
      throw new Error(text || 'Erreur lors de l\'analyse du CV');
    }

    const data = await response.json();
    console.log('Données reçues:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'analyse du CV:', error);
    return {
      score: 0,
      recommendations: [],
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'analyse du CV'
    };
  }
}

export async function generateInterviewPrep(
  poste: string,
  entreprise: string,
  experience?: string,
  langue: 'fr' | 'en' = 'fr'
): Promise<InterviewPrep> {
  try {
    console.log('Début de generateInterviewPrep avec:', { poste, entreprise, experience });
    
    const systemPrompt = langue === 'fr'
      ? 'Tu es un expert en recrutement. Génère une préparation d\'entretien en format JSON uniquement, sans texte additionnel.'
      : 'You are a recruitment expert. Generate an interview preparation in JSON format only, without any additional text.';

    const userPrompt = langue === 'fr'
      ? `Prépare un entretien pour un poste de ${poste} chez ${entreprise}.${
          experience ? ` Le candidat a ${experience} d'expérience.` : ''
        }
        Retourne UNIQUEMENT un objet JSON avec cette structure exacte :
        {
          "questions_techniques": [
            "Question technique 1",
            "Question technique 2",
            "Question technique 3",
            "Question technique 4",
            "Question technique 5"
          ],
          "questions_culture": [
            "Question culture 1",
            "Question culture 2",
            "Question culture 3"
          ],
          "questions_pieges": [
            "Question piège 1",
            "Question piège 2"
          ],
          "conseils_preparation": [
            "Conseil 1",
            "Conseil 2",
            "Conseil 3"
          ],
          "points_cles": [
            "Point clé 1",
            "Point clé 2"
          ]
        }`
      : `Prepare an interview for a ${poste} position at ${entreprise}.${
          experience ? ` The candidate has ${experience} of experience.` : ''
        }
        Return ONLY a JSON object with this exact structure:
        {
          "questions_techniques": [
            "Technical question 1",
            "Technical question 2",
            "Technical question 3",
            "Technical question 4",
            "Technical question 5"
          ],
          "questions_culture": [
            "Culture question 1",
            "Culture question 2",
            "Culture question 3"
          ],
          "questions_pieges": [
            "Tricky question 1",
            "Tricky question 2"
          ],
          "conseils_preparation": [
            "Preparation tip 1",
            "Preparation tip 2",
            "Preparation tip 3"
          ],
          "points_cles": [
            "Key point 1",
            "Key point 2"
          ]
        }`;

    console.log('Envoi de la requête à Deepseek');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
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
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })
    });

    console.log('Réponse reçue, status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur Deepseek:', errorData);
      throw new Error(`Erreur API: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Données reçues de Deepseek:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('Format de réponse invalide:', data);
      throw new Error('Format de réponse invalide de l\'API');
    }

    const content = data.choices[0].message.content;
    console.log('Contenu de la réponse:', content);

    let prepData;
    try {
      prepData = typeof content === 'string' ? JSON.parse(content) : content;
      console.log('Données parsées avec succès:', prepData);
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError, 'Content:', content);
      const cleanedContent = content.replace(/[\n\r\t]/g, '').trim();
      try {
        prepData = JSON.parse(cleanedContent);
        console.log('Parsing réussi après nettoyage:', prepData);
      } catch (e) {
        throw new Error('Impossible de parser la réponse de l\'API');
      }
    }

    // Vérification et normalisation des données
    return {
      questions_techniques: Array.isArray(prepData.questions_techniques) ? prepData.questions_techniques.slice(0, 5) : [],
      questions_culture: Array.isArray(prepData.questions_culture) ? prepData.questions_culture.slice(0, 3) : [],
      questions_pieges: Array.isArray(prepData.questions_pieges) ? prepData.questions_pieges.slice(0, 2) : [],
      conseils_preparation: Array.isArray(prepData.conseils_preparation) ? prepData.conseils_preparation.slice(0, 3) : [],
      points_cles: Array.isArray(prepData.points_cles) ? prepData.points_cles.slice(0, 2) : []
    };

  } catch (error) {
    console.error('Erreur dans generateInterviewPrep:', error);
    throw error;
  }
}

export async function generateBlogArticle(title: string): Promise<BlogArticle> {
  try {
    const response = await fetch('/api/blog/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'article:', error);
    return {
      title: '',
      slug: '',
      description: '',
      meta_description: '',
      content: '',
      tags: [],
      category: '',
      image_url: '',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}
