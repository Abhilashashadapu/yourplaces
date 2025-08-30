// API Configuration for YourPlaces
// This ensures the correct API URL is used in all environments

const getApiUrl = () => {
  // Force production API URL when deployed on Vercel
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return '/api';
  }
  
  // Use environment variable if available
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // Development fallback
  return 'http://localhost:5000/api';
};

export const API_URL = getApiUrl();

export default {
  API_URL,
  ENDPOINTS: {
    USERS: `${API_URL}/users`,
    LOGIN: `${API_URL}/login`,
    PLACES: `${API_URL}/places`
  }
};
