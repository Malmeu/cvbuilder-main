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

export async function generateCoverLetter(
  secteur: string,
  experience: string,
  entreprise: string,
  poste: string,
  langue: 'fr' | 'en' = 'fr'
): Promise<AIResponse> {
  try {
    const prompt = langue === 'fr' 
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

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: langue === 'fr' 
              ? 'Tu es un expert en rédaction de lettres de motivation professionnelles.'
              : 'You are an expert in writing professional cover letters.'
          },
          {
            role: 'user',
            content: prompt
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
    return { content: data.choices[0].message.content };
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

    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    
    if (!response.ok) {
      const text = await response.text();
      console.error('Réponse erreur:', text);
      throw new Error(text || 'Erreur lors de l\'analyse du CV');
    }

    const data = await response.json();
    console.log('Données reçues:', data);
    return data;
  } catch (error) {
    console.error('Erreur complète:', error);
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
    const prompt = langue === 'fr'
      ? `Prépare des questions d'entretien concises pour un poste de ${poste} chez ${entreprise}.${
          experience ? ` Le candidat a ${experience} d'expérience.` : ''
        }\n\nFournis :\n1. 3 questions techniques\n2. 2 questions sur la culture d'entreprise\n3. 2 questions pièges\n4. 3 conseils de préparation\n5. 3 points clés à retenir`
      : `Prepare concise interview questions for a ${poste} position at ${entreprise}.${
          experience ? ` The candidate has ${experience} of experience.` : ''
        }\n\nProvide:\n1. 3 technical questions\n2. 2 company culture questions\n3. 2 tricky questions\n4. 3 preparation tips\n5. 3 key points to remember`;

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
            content: langue === 'fr'
              ? 'Tu es un expert en recrutement qui prépare des questions d\'entretien pertinentes et concises.'
              : 'You are a recruitment expert preparing relevant and concise interview questions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
        timeout: 25000
      })
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Erreur API Deepseek:', responseText);
      throw new Error(langue === 'fr' ? 'Erreur lors de la génération des questions' : 'Error generating questions');
    }

    const responseText = await response.text();
    console.log('Réponse brute de l\'API:', responseText);
    
    const data = JSON.parse(responseText);
    const content = data.choices[0].message.content;

    // Extraction structurée des données
    const sections = content.split('\n').filter((line: string) => line.trim());
    
    const questions_techniques: string[] = [];
    const questions_culture: string[] = [];
    const questions_pieges: string[] = [];
    const conseils_preparation: string[] = [];
    const points_cles: string[] = [];

    let currentSection = '';
    for (const line of sections) {
      if (line.includes('technique') || line.includes('technical')) {
        currentSection = 'technique';
      } else if (line.includes('culture')) {
        currentSection = 'culture';
      } else if (line.includes('piège') || line.includes('tricky')) {
        currentSection = 'piege';
      } else if (line.includes('conseil') || line.includes('tip')) {
        currentSection = 'conseil';
      } else if (line.includes('clé') || line.includes('key')) {
        currentSection = 'cle';
      } else if (line.trim().length > 0) {
        const cleanLine = line.replace(/^\d+\.\s*[-•]?\s*/, '').trim();
        if (cleanLine) {
          switch (currentSection) {
            case 'technique':
              questions_techniques.push(cleanLine);
              break;
            case 'culture':
              questions_culture.push(cleanLine);
              break;
            case 'piege':
              questions_pieges.push(cleanLine);
              break;
            case 'conseil':
              conseils_preparation.push(cleanLine);
              break;
            case 'cle':
              points_cles.push(cleanLine);
              break;
          }
        }
      }
    }

    return {
      questions_techniques: questions_techniques.slice(0, 3),
      questions_culture: questions_culture.slice(0, 2),
      questions_pieges: questions_pieges.slice(0, 2),
      conseils_preparation: conseils_preparation.slice(0, 3),
      points_cles: points_cles.slice(0, 3)
    };

  } catch (error) {
    console.error('Erreur dans generateInterviewPrep:', error);
    return {
      questions_techniques: [],
      questions_culture: [],
      questions_pieges: [],
      conseils_preparation: [],
      points_cles: [],
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}
