FROM node:18

WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copie uniquement les fichiers package depuis le frontend
COPY frontend/package*.json ./

# Install dependencies (frontend only)
RUN npm install --legacy-peer-deps

# Copier le code source
COPY frontend ./

# Expose Expo ports
EXPOSE 19000 19001 19002

CMD ["expo", "start", "--tunnel", "--non-interactive"]
