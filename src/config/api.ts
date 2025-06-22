
// Configuration API pour l'environnement Docker
export const API_CONFIG = {
  BASE_URL: 'http://192.168.129.33:8000/api', // Backend Docker IP
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

// Configuration CORS pour les requêtes
export const API_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors' as RequestMode,
};