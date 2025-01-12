# Utiliser Node.js 20 comme image de base
FROM node:20-alpine

# Installer Python et les outils de build nécessaires
RUN apk add --no-cache python3 make g++ gcc

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
