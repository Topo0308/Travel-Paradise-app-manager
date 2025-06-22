
FROM node:18

WORKDIR /app

# Installation d'Expo CLI
RUN npm install -g @expo/cli

# Copie des fichiers package
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

EXPOSE 19000

CMD ["npm", "start"]
