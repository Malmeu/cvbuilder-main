/**
 * Service Ollama pour utiliser Deepseek en local
 * Remplace l'API Deepseek cloud pour économiser les tokens
 */

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OllamaRequest {
  model: string;
  messages: OllamaMessage[];
  temperature?: number;
  stream?: boolean;
  format?: 'json';
}

interface OllamaResponse {
  model: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

/**
 * Appelle Ollama en local avec le modèle Deepseek
 */
export async function queryOllama(
  messages: OllamaMessage[],
  options: {
    temperature?: number;
    format?: 'json';
  } = {}
): Promise<string> {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // En production, utiliser Ollama Cloud (gratuit)
    // En développement, utiliser Ollama local
    const ollamaUrl = isProduction 
      ? (process.env.OLLAMA_CLOUD_URL || 'https://api.ollama.com')
      : (process.env.OLLAMA_URL || 'http://localhost:11434');
    
    const ollamaApiKey = process.env.OLLAMA_API_KEY; // Requis pour Ollama Cloud
    
    const requestBody: OllamaRequest = {
      model: 'deepseek-v3.1:671b-cloud',
      messages,
      temperature: options.temperature || 0.7,
      stream: false,
    };

    // Ajouter le format JSON si demandé
    if (options.format === 'json') {
      requestBody.format = 'json';
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Ajouter l'authentification si une clé API est fournie
    if (ollamaApiKey) {
      headers['Authorization'] = `Bearer ${ollamaApiKey}`;
    }

    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur Ollama:', errorText);
      throw new Error(`Erreur Ollama: ${response.status} - ${errorText}`);
    }

    const data: OllamaResponse = await response.json();
    
    if (!data.message?.content) {
      throw new Error('Réponse Ollama invalide');
    }

    return data.message.content;
  } catch (error) {
    console.error('Erreur lors de l\'appel à Ollama:', error);
    throw error;
  }
}

/**
 * Vérifie si Ollama est disponible
 */
export async function checkOllamaAvailability(): Promise<boolean> {
  try {
    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    const response = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Ollama non disponible:', error);
    return false;
  }
}

/**
 * Wrapper compatible avec l'API Deepseek pour faciliter la migration
 */
export async function queryDeepseekViaOllama(
  systemPrompt: string,
  userPrompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
    format?: 'json';
  } = {}
): Promise<string> {
  const messages: OllamaMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: userPrompt,
    },
  ];

  return queryOllama(messages, {
    temperature: options.temperature,
    format: options.format,
  });
}
