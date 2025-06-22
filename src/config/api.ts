
// Configuration API pour l'environnement local
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://votre-backend-prod.com/api'
    : 'http://localhost:8000/api', // Backend local Docker
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VISITES: '/visites',
    GUIDES: '/guides'
  }
};

// Helper pour construire les URLs complètes
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
