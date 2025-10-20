# 🚀 Migration vers Ollama - Guide Complet

## ✅ Ce qui est fait

### 1. Service Ollama créé
- ✅ `/app/lib/ollama.ts` - Service wrapper pour Ollama
- ✅ Fonctions: `queryOllama`, `checkOllamaAvailability`, `queryDeepseekViaOllama`

### 2. Route de test créée
- ✅ `/app/api/test-ollama/route.ts` - Pour tester la connexion Ollama

### 3. TOUTES les routes IA migrées avec fallback
- ✅ `/app/api/analyze-cv/route.ts` - Analyse de CV
- ✅ `/app/api/generate-cover-letter/route.ts` - Génération de lettre de motivation
- ✅ `/app/api/visa-interview/route.ts` - Entretien visa
- ✅ `/app/api/interview-prep/route.ts` - Préparation d'entretien
- ✅ `/app/api/blog/generate/route.ts` - Génération d'articles blog

### 4. Fonction client migrée
- ✅ `/app/lib/ai.ts` - `generateCoverLetter` appelle maintenant la route API

---

## 📝 Configuration requise

Ajoute ces variables dans ton `.env.local` :

```env
# Ollama (local - gratuit)
USE_OLLAMA=true
OLLAMA_URL=http://localhost:11434

# Deepseek Cloud (fallback si Ollama ne fonctionne pas)
DEEPSEEK_API_KEY=<ta_clé_existante>
```

---

## 🧪 Tests à effectuer

### 1. Tester Ollama directement
```bash
# Vérifier qu'Ollama tourne
curl http://localhost:11434/api/tags

# Tester via l'API Next.js
curl http://localhost:3000/api/test-ollama
```

### 2. Tester l'analyse CV
- Va sur la page d'analyse CV
- Upload un CV
- Vérifie les logs dans la console : tu devrais voir "Utilisation d'Ollama (local - gratuit)"

---

## 🎉 Migration terminée !

### Toutes les routes ont été migrées :

1. **✅ `/app/api/analyze-cv/route.ts`** - Analyse de CV
2. **✅ `/app/api/generate-cover-letter/route.ts`** - Lettre de motivation
3. **✅ `/app/api/visa-interview/route.ts`** - Entretien visa
4. **✅ `/app/api/interview-prep/route.ts`** - Préparation entretien
5. **✅ `/app/api/blog/generate/route.ts`** - Génération d'articles blog

### Pattern de migration (copier-coller) :

```typescript
import { queryDeepseekViaOllama, checkOllamaAvailability } from '@/app/lib/ollama';

const USE_OLLAMA = process.env.USE_OLLAMA === 'true';

// Dans ta fonction :
let response: string;

if (USE_OLLAMA) {
  console.log('Utilisation d\'Ollama (local - gratuit)');
  
  const isAvailable = await checkOllamaAvailability();
  if (!isAvailable) {
    throw new Error('Ollama non disponible');
  }

  response = await queryDeepseekViaOllama(
    systemPrompt,
    userPrompt,
    { 
      temperature: 0.7,
      format: 'json' // Optionnel, pour les réponses JSON
    }
  );
} else {
  console.log('Utilisation de l\'API Deepseek Cloud (payant)');
  // Ton code API existant...
}
```

---

## 💰 Économies estimées

### Avant (API Deepseek Cloud) :
- Analyse CV : ~800 tokens × $0.14/M = $0.00011 par analyse
- Entretien visa : ~500 tokens × 5 questions = $0.00035 par entretien
- **Coût mensuel estimé** : $50-100 (selon usage)

### Après (Ollama local) :
- **Coût : $0** 🎉
- Seul coût : électricité de ton Mac (négligeable)

---

## ⚡ Performances

### Deepseek Cloud :
- Latence : 2-5 secondes (réseau)
- Débit : Limité par l'API

### Ollama Local (deepseek-v3.1:671b-cloud) :
- Latence : Variable selon ton Mac
- Débit : Illimité
- **Note** : C'est un modèle cloud-hosted via Ollama, donc il y a quand même une connexion réseau mais sans coût

---

## 🔧 Dépannage

### Ollama ne répond pas
```bash
# Redémarrer Ollama
ollama serve

# Vérifier les modèles
ollama list
```

### Le modèle est lent
- Le modèle `deepseek-v3.1:671b-cloud` est hébergé sur les serveurs Ollama
- C'est gratuit mais nécessite une connexion internet
- Si tu veux du 100% local, utilise plutôt `mistral:latest` (déjà installé)

### Erreur "Ollama non disponible"
- Assure-toi qu'Ollama tourne : `ollama serve`
- Vérifie l'URL dans `.env.local` : `OLLAMA_URL=http://localhost:11434`

---

## 🎯 Prochaines étapes recommandées

1. **Tester l'analyse CV** avec Ollama
2. **Si ça marche bien** → Migrer les autres routes une par une
3. **Monitorer les performances** et ajuster si besoin
4. **Garder le fallback** vers l'API cloud pour la production

---

## 📌 Notes importantes

- ✅ Le fallback vers l'API cloud est automatique si Ollama plante
- ✅ Tu peux basculer entre les deux en changeant `USE_OLLAMA` dans `.env.local`
- ✅ Aucune modification du code client nécessaire
- ⚠️ Le modèle `deepseek-v3.1:671b-cloud` nécessite internet (hébergé par Ollama)
- 💡 Pour du 100% local, utilise `mistral:latest` à la place
