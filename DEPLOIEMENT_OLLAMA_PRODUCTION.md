# 🌐 Déploiement Ollama en Production

## Problème

Ton site est en ligne (Vercel/Netlify), mais Ollama tourne en local sur ton Mac. Les utilisateurs ne peuvent pas y accéder.

## Solutions

---

## 🎯 Option 1 : Serveur Ollama Cloud (Recommandé - Simple)

### A. Utiliser Replicate.com (Pay-as-you-go)

**Avantages :**
- ✅ Pas de serveur à gérer
- ✅ Pay-as-you-go (~$0.0001/seconde)
- ✅ Scaling automatique
- ✅ Deepseek disponible

**Configuration :**

1. **Crée un compte sur [Replicate.com](https://replicate.com)**

2. **Modifie `/app/lib/ollama.ts` :**

```typescript
export async function queryOllama(
  messages: OllamaMessage[],
  options: {
    temperature?: number;
    format?: 'json';
  } = {}
): Promise<string> {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // Utiliser Replicate en production
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: 'deepseek-ai/deepseek-v3', // Version du modèle
          input: {
            prompt: messages[messages.length - 1].content,
            system_prompt: messages[0].content,
            temperature: options.temperature || 0.7,
          }
        })
      });
      
      const data = await response.json();
      return data.output;
    } else {
      // Utiliser Ollama local en développement
      // ... ton code actuel
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}
```

3. **Variables d'environnement (Vercel/Netlify) :**

```env
# Production
REPLICATE_API_TOKEN=r8_xxx...
USE_OLLAMA=true
NODE_ENV=production

# Développement (local)
USE_OLLAMA=true
OLLAMA_URL=http://localhost:11434
```

**Coût estimé :**
- ~$0.0001/seconde = $0.006/minute
- 1000 requêtes/mois ≈ **$5-10/mois**

---

## 🎯 Option 2 : VPS avec Ollama (Moins cher à long terme)

### A. Déployer sur Hetzner (€4/mois)

**Avantages :**
- ✅ Très bon rapport qualité/prix
- ✅ Serveur dédié
- ✅ Contrôle total
- ✅ Pas de limite d'utilisation

**Étapes :**

1. **Crée un serveur sur [Hetzner](https://www.hetzner.com)**
   - Choisis : CPX21 (3 vCPU, 4GB RAM) - €4.51/mois
   - OS : Ubuntu 22.04

2. **Connecte-toi en SSH :**

```bash
ssh root@ton-ip-serveur
```

3. **Installe Ollama :**

```bash
# Installer Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Télécharger le modèle
ollama pull deepseek-v3.1:671b-cloud

# Configurer Ollama pour écouter sur toutes les interfaces
sudo systemctl edit ollama

# Ajoute :
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"

# Redémarre
sudo systemctl restart ollama
```

4. **Sécurise avec Nginx + SSL :**

```bash
# Installer Nginx
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx

# Configurer Nginx
sudo nano /etc/nginx/sites-available/ollama

# Contenu :
server {
    listen 80;
    server_name ollama.ton-domaine.com;

    location / {
        proxy_pass http://localhost:11434;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Activer
sudo ln -s /etc/nginx/sites-available/ollama /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL gratuit
sudo certbot --nginx -d ollama.ton-domaine.com
```

5. **Variables d'environnement (Vercel/Netlify) :**

```env
USE_OLLAMA=true
OLLAMA_URL=https://ollama.ton-domaine.com
```

**Coût total :**
- Serveur Hetzner : **€4.51/mois**
- Domaine : **€10/an** (optionnel, tu peux utiliser l'IP)
- **Total : ~€5/mois**

---

## 🎯 Option 3 : Modal.com (Serverless)

**Avantages :**
- ✅ Serverless (pas de serveur à gérer)
- ✅ GPU disponible
- ✅ Pay-as-you-go
- ✅ Scaling automatique

**Configuration :**

1. **Crée un compte sur [Modal.com](https://modal.com)**

2. **Crée un endpoint Modal :**

```python
# modal_ollama.py
import modal

stub = modal.Stub("ollama-deepseek")

@stub.function(
    image=modal.Image.debian_slim().pip_install("ollama"),
    gpu="T4",  # GPU optionnel
)
@modal.web_endpoint(method="POST")
def chat(data: dict):
    import ollama
    
    response = ollama.chat(
        model='deepseek-v3.1:671b-cloud',
        messages=data['messages']
    )
    
    return {"content": response['message']['content']}
```

3. **Déploie :**

```bash
modal deploy modal_ollama.py
```

4. **Variables d'environnement :**

```env
USE_OLLAMA=true
OLLAMA_URL=https://ton-username--ollama-deepseek-chat.modal.run
```

**Coût estimé :**
- ~$0.0002/seconde avec GPU
- 1000 requêtes/mois ≈ **$8-12/mois**

---

## 🎯 Option 4 : Hybrid (Recommandé pour économiser)

**Stratégie intelligente :**

```typescript
// /app/lib/ollama.ts
const USE_OLLAMA = process.env.USE_OLLAMA === 'true';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const OLLAMA_AVAILABLE = await checkOllamaAvailability();

if (USE_OLLAMA && OLLAMA_AVAILABLE) {
  // Utiliser Ollama (gratuit si disponible)
  content = await queryOllama(...);
} else if (IS_PRODUCTION) {
  // En production, utiliser Replicate (payant mais fiable)
  content = await queryReplicate(...);
} else {
  // Fallback vers Deepseek API
  content = await queryDeepseek(...);
}
```

**Configuration :**

```env
# Production (Vercel/Netlify)
USE_OLLAMA=false  # Désactiver Ollama en prod
REPLICATE_API_TOKEN=r8_xxx...
DEEPSEEK_API_KEY=sk-xxx...  # Fallback

# Développement (local)
USE_OLLAMA=true
OLLAMA_URL=http://localhost:11434
```

**Avantages :**
- ✅ Gratuit en développement (Ollama local)
- ✅ Fiable en production (Replicate)
- ✅ Fallback vers Deepseek si problème
- ✅ Coût optimisé

---

## 📊 Comparaison des solutions

| Solution | Coût/mois | Complexité | Fiabilité | Recommandé pour |
|----------|-----------|------------|-----------|-----------------|
| **Replicate** | $5-10 | ⭐ Facile | ⭐⭐⭐ | Débutants, MVP |
| **Hetzner VPS** | €5 | ⭐⭐ Moyen | ⭐⭐⭐ | Long terme, contrôle |
| **Modal.com** | $8-12 | ⭐⭐ Moyen | ⭐⭐⭐ | Scaling, GPU |
| **Hybrid** | $5-15 | ⭐⭐⭐ Avancé | ⭐⭐⭐ | Optimisation coûts |
| **Deepseek API** | $50-100 | ⭐ Facile | ⭐⭐⭐ | Simplicité maximale |

---

## 🚀 Ma recommandation

### Pour commencer (court terme) :
**Option 4 : Hybrid**
- Ollama local en développement (gratuit)
- Replicate en production (pay-as-you-go)
- Deepseek API en fallback

### Pour économiser (long terme) :
**Option 2 : VPS Hetzner**
- €5/mois fixe
- Illimité
- Contrôle total

---

## 📝 Configuration finale recommandée

### 1. Développement (local)

```env
# .env.local
USE_OLLAMA=true
OLLAMA_URL=http://localhost:11434
NODE_ENV=development
```

### 2. Production (Vercel/Netlify)

```env
# Variables d'environnement Vercel/Netlify
USE_OLLAMA=false
REPLICATE_API_TOKEN=r8_xxx...
DEEPSEEK_API_KEY=sk-xxx...  # Fallback
NODE_ENV=production
```

### 3. Code adaptatif

Le code que j'ai déjà créé gère automatiquement :
- ✅ Ollama local en dev
- ✅ Fallback vers API cloud si Ollama indisponible
- ✅ Logs clairs pour debugging

---

## ⚡ Déploiement rapide (5 minutes)

**Solution la plus rapide : Replicate**

1. Crée un compte sur [Replicate.com](https://replicate.com)
2. Copie ton API token
3. Ajoute dans Vercel/Netlify :
   ```
   REPLICATE_API_TOKEN=r8_xxx...
   USE_OLLAMA=false
   ```
4. Modifie le code pour utiliser Replicate (je peux le faire si tu veux)
5. Redéploie ton site

**Coût : ~$5-10/mois** au lieu de $50-100 avec Deepseek ! 🎉

---

Quelle solution préfères-tu ? Je peux t'aider à la mettre en place ! 🚀
