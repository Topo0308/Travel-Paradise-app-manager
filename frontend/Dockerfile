FROM node:18

WORKDIR /app

# Copier package.json et lock files
COPY package*.json ./

# Installer dépendances (sans legacy-peer-deps en prod si possible)
RUN npm install

# Copier le code source
COPY . .

# Builder l'app Expo en mode production (optionnel selon ton workflow)
RUN npm run build

# Exposer ports nécessaires si tu veux servir via Expo
EXPOSE 19000 19001 19002

CMD ["npm", "start"]
