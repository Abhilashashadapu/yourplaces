// API Configuration for YourPlaces
// CRITICAL: Force production API URL for Vercel deployment
// This MUST always use /api to prevent localhost fallbacks

// Completely bypass environment variables to prevent build-time issues
const getApiUrl = () => {
  // Always return /api for production builds
  // This prevents any localhost fallbacks during Vercel builds
  return "/api";
};

export const API_URL = getApiUrl();

// Double-check: Log the API URL being used (for debugging)
console.log("YourPlaces API_URL:", API_URL);

export default {
  API_URL,
  ENDPOINTS: {
    USERS: `${API_URL}/users`,
    LOGIN: `${API_URL}/login`,
    PLACES: `${API_URL}/places`,
  },
};
