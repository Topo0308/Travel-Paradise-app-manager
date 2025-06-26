import Constants from 'expo-constants';
import { Platform } from 'react-native';

const LOCALHOST_IP = '192.168.129.33'; // Ton IP locale visible par mobile
const API_PORT = '8000';
const API_PATH = 'api';

const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_BASE_URL || `http://${LOCALHOST_IP}:${API_PORT}/${API_PATH}`;
  }

  if (Platform.OS === 'web') {
    return `http://${LOCALHOST_IP}:${API_PORT}/${API_PATH}`;
  }

  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost || null;
  if (debuggerHost) {
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:${API_PORT}/${API_PATH}`;
  }

  return `http://${LOCALHOST_IP}:${API_PORT}/${API_PATH}`;
};

export const API_BASE_URL = getApiBaseUrl();

console.log('🌐 API_BASE_URL:', API_BASE_URL);
