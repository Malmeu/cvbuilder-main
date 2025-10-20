import { NextResponse } from 'next/server';
import { queryDeepseekViaOllama, checkOllamaAvailability } from '@/app/lib/ollama';

const USE_OLLAMA = process.env.USE_OLLAMA === 'true';

export async function POST(req: Request) {
  try {
    const { title } = await req.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Le titre est requis' },
        { status: 400 }
      )
    }

    const systemPrompt = 'Tu es un expert en rédaction d\'articles de blog sur l\'emploi et l\'immigration au Canada.';
    
    const userPrompt = `Génère un article complet et professionnel à partir du titre suivant : "${title}".
    
    Réponds UNIQUEMENT avec un objet JSON valide sans backticks ni formatage Markdown, dans ce format exact :
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
    - Être optimisé pour le SEO
    
    IMPORTANT : Renvoie UNIQUEMENT l'objet JSON, sans aucun texte avant ou après, sans backticks ni formatage Markdown.`;

    let content: string;

    // Utiliser Ollama si activé, sinon fallback sur l'API Deepseek
    if (USE_OLLAMA) {
      console.log('Utilisation d\'Ollama (local - gratuit) pour génération d\'article blog');
      
      const isAvailable = await checkOllamaAvailability();
      if (!isAvailable) {
        throw new Error('Ollama n\'est pas disponible. Lance Ollama ou désactive USE_OLLAMA dans .env.local');
      }

      content = await queryDeepseekViaOllama(systemPrompt, userPrompt, {
        temperature: 0.7,
        format: 'json'
      });
    } else {
      console.log('Utilisation de l\'API Deepseek Cloud (payant) pour génération d\'article blog');
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      content = data.choices[0].message.content;
    }
    
    // Nettoyer la réponse des backticks et du formatage Markdown
    content = content.replace(/^\`\`\`json\n/, ''); // Enlever ```json au début
    content = content.replace(/\`\`\`$/, ''); // Enlever ``` à la fin
    content = content.trim(); // Enlever les espaces superflus

    try {
      const articleData = JSON.parse(content);
      return NextResponse.json(articleData);
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', content);
      throw new Error('La réponse de l\'IA n\'est pas un JSON valide');
    }
  } catch (error) {
    console.error('Erreur lors de la génération:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}
