# 🎉 Ollama Cloud - Solution 100% GRATUITE

## ✅ Pourquoi Ollama Cloud ?

- **$0** - Complètement gratuit (bêta)
- Pas de serveur à gérer
- Fonctionne en production
- Même API que Ollama local
- Deepseek disponible

---

## 🚀 Configuration (5 minutes)

### Étape 1 : Créer un compte Ollama Cloud

1. **Va sur [ollama.com](https://ollama.com)**
2. **Clique sur "Sign Up"** (ou "Get Started")
3. **Crée ton compte** (email + mot de passe)
4. **Vérifie ton email**

### Étape 2 : Obtenir ton API Key

1. **Connecte-toi** sur [ollama.com](https://ollama.com)
2. **Va dans "Settings"** ou "API Keys"
3. **Crée une nouvelle clé API**
4. **Copie la clé** (elle ressemble à : `ollama_xxxxxxxxxxxxx`)

---

## 🔧 Configuration du projet

### 1. Variables d'environnement LOCAL (.env.local)

Ton fichier `.env.local` actuel (pour développement) :

```env
# Ollama local (développement - gratuit)
USE_OLLAMA=true
OLLAMA_URL=http://localhost:11434
NODE_ENV=development

# Ollama Cloud (production - gratuit)
OLLAMA_API_KEY=ollama_xxxxxxxxxxxxx
OLLAMA_CLOUD_URL=https://api.ollama.com

# Autres configs...
NEXT_PUBLIC_SUPABASE_URL=...
DEEPSEEK_API_KEY=...  # Garde en fallback
```

### 2. Variables d'environnement PRODUCTION (Vercel/Netlify)

Dans ton dashboard Vercel ou Netlify, ajoute :

```env
USE_OLLAMA=true
OLLAMA_API_KEY=ollama_xxxxxxxxxxxxx
OLLAMA_CLOUD_URL=https://api.ollama.com
NODE_ENV=production
```

**Important :** Supprime ou laisse vide `OLLAMA_URL` en production (il utilisera automatiquement Ollama Cloud).

---

## 📝 Comment ça marche maintenant

### En développement (ton Mac)
```
✅ Utilise Ollama local (http://localhost:11434)
✅ Gratuit
✅ Rapide
```

### En production (site en ligne)
```
✅ Utilise Ollama Cloud (https://api.ollama.com)
✅ Gratuit
✅ Accessible partout
```

### Fallback automatique
```
Si Ollama Cloud ne répond pas → Utilise API Deepseek (payant)
```

---

## 🧪 Test

### 1. Tester en local

```bash
# Assure-toi qu'Ollama local tourne
ollama serve

# Lance ton serveur
npm run dev

# Teste une fonctionnalité IA
# Tu devrais voir dans les logs :
# "Utilisation d'Ollama (local - gratuit)"
```

### 2. Tester Ollama Cloud directement

```bash
# Test avec curl
curl https://api.ollama.com/api/chat \
  -H "Authorization: Bearer ollama_xxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v3.1:671b-cloud",
    "messages": [
      {
        "role": "user",
        "content": "Dis bonjour"
      }
    ]
  }'
```

Si ça fonctionne, tu verras une réponse JSON avec le message.

---

## 🚀 Déploiement sur Vercel/Netlify

### Vercel

1. **Va sur [vercel.com](https://vercel.com)**
2. **Sélectionne ton projet**
3. **Settings → Environment Variables**
4. **Ajoute :**
   ```
   USE_OLLAMA=true
   OLLAMA_API_KEY=ollama_xxxxxxxxxxxxx
   OLLAMA_CLOUD_URL=https://api.ollama.com
   NODE_ENV=production
   ```
5. **Redéploie** (Deployments → Redeploy)

### Netlify

1. **Va sur [netlify.com](https://netlify.com)**
2. **Sélectionne ton site**
3. **Site settings → Environment variables**
4. **Ajoute :**
   ```
   USE_OLLAMA=true
   OLLAMA_API_KEY=ollama_xxxxxxxxxxxxx
   OLLAMA_CLOUD_URL=https://api.ollama.com
   NODE_ENV=production
   ```
5. **Redéploie** (Deploys → Trigger deploy)

---

## 📊 Vérification

### Logs à surveiller en production

Dans les logs Vercel/Netlify, tu devrais voir :

```
✅ Utilisation d'Ollama (local - gratuit) pour lettre de motivation
```

Ou si tu as configuré les logs pour montrer l'URL :

```
✅ Utilisation d'Ollama Cloud (https://api.ollama.com)
```

### Si tu vois encore "Insufficient Balance"

Cela signifie que :
1. ❌ `OLLAMA_API_KEY` n'est pas configurée
2. ❌ `USE_OLLAMA` n'est pas à `true`
3. ❌ Le serveur n'a pas été redéployé

**Solution :** Vérifie les variables d'environnement et redéploie.

---

## 💡 Avantages de cette solution

| Aspect | Avant (Deepseek API) | Maintenant (Ollama Cloud) |
|--------|---------------------|---------------------------|
| **Coût** | $50-100/mois | **$0** 🎉 |
| **Limite** | Selon crédit | Illimité (bêta) |
| **Setup** | Simple | Simple |
| **Maintenance** | Aucune | Aucune |
| **Fiabilité** | ⭐⭐⭐ | ⭐⭐⭐ |

---

## ⚠️ Important à savoir

### Ollama Cloud est en bêta

- ✅ **Actuellement gratuit**
- ⚠️ Pourrait devenir payant plus tard (mais restera probablement moins cher que Deepseek)
- ✅ Tu as le fallback vers Deepseek API si besoin
- ✅ Tu peux toujours revenir à Ollama local en dev

### Limites potentielles

- Peut avoir des limites de rate (requêtes/minute)
- Peut être plus lent que local
- Dépend d'internet

Mais pour l'instant, c'est **100% gratuit** ! 🎉

---

## 🎯 Récapitulatif

### Ce que tu dois faire :

1. ✅ Créer un compte sur [ollama.com](https://ollama.com)
2. ✅ Récupérer ton API key
3. ✅ Ajouter `OLLAMA_API_KEY` dans `.env.local`
4. ✅ Ajouter les variables dans Vercel/Netlify
5. ✅ Redéployer ton site

### Résultat :

- 💰 **$0/mois** au lieu de $50-100
- 🚀 Fonctionne en production
- 🔧 Pas de serveur à gérer
- ✅ Fallback automatique si problème

---

## 🆘 Besoin d'aide ?

Si tu as des problèmes :

1. Vérifie que ton API key est valide
2. Vérifie les logs Vercel/Netlify
3. Teste l'API directement avec curl
4. Vérifie que `NODE_ENV=production` en production

---

**Tu es prêt ! Plus de soucis de budget IA !** 🎉
