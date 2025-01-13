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
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      content: data.choices[0].message.content
    };
  } catch (error) {
    console.error('Erreur lors de la génération de la lettre:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

export async function analyzeCV(cvContent: string, langue: 'fr' | 'en' = 'fr'): Promise<CVAnalysis> {
  try {
    const prompt = langue === 'fr'
      ? `Analyse ce CV et donne un score sur 100 ainsi que des recommandations d'amélioration :
         ${cvContent}`
      : `Analyze this resume and give a score out of 100 along with improvement recommendations:
         ${cvContent}`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    // Analyser la réponse pour extraire le score et les recommandations
    const content = data.choices[0].message.content;
    const scoreMatch = content.match(/\d+/);
    const score = scoreMatch ? parseInt(scoreMatch[0]) : 0;
    const recommendations = content
      .split('\n')
      .filter((line: string) => line.trim().startsWith('-'))
      .map((line: string) => line.trim().substring(1).trim());

    return {
      score,
      recommendations
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse du CV:', error);
    return {
      score: 0,
      recommendations: [],
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

export async function generateBlogArticle(title: string): Promise<BlogArticle> {
  try {
    const prompt = `En tant qu'expert en rédaction d'articles de blog sur l'emploi et l'immigration au Canada, 
    génère un article complet et professionnel à partir du titre suivant : "${title}".
    
    Format requis (en JSON) :
    {
      "title": "Le titre original",
      "slug": "le-titre-en-slug",
      "description": "Un résumé accrocheur de 2-3 phrases",
      "meta_description": "Description SEO optimisée de 155 caractères maximum",
      "content": "Le contenu complet de l'article en HTML avec des balises <h2>, <p>, <ul>, <li>",
      "tags": ["tag1", "tag2", "tag3"],
      "category": "La catégorie appropriée (Conseils CV, Immigration Canada, Emploi, Études)",
      "image_url": "Une URL d'image pertinente de Unsplash"
    }
    
    L'article doit :
    - Être informatif et pratique
    - Inclure des exemples concrets
    - Être structuré avec des sous-titres
    - Avoir un ton professionnel mais accessible
    - Être optimisé pour le SEO`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const articleData = JSON.parse(data.choices[0].message.content);
    return articleData;
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
