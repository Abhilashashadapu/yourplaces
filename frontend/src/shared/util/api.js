// API Configuration for YourPlaces
// Force production API URL for Vercel deployment

// Always use /api for production builds
export const API_URL = "/api";

export default {
  API_URL,
  ENDPOINTS: {
    USERS: `${API_URL}/users`,
    LOGIN: `${API_URL}/login`,
    PLACES: `${API_URL}/places`,
  },
};
