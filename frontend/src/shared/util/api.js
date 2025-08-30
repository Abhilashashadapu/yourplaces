// API Configuration for YourPlaces
// Backend server configuration

// Use environment variable for API URL with fallback to localhost
const getApiUrl = () => {
  // In production, use the deployed backend URL
  // In development, use localhost:5000
  return process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";
};

// Get the base URL for the backend server (without /api)
const getBackendUrl = () => {
  return process.env.REACT_APP_BACKEND_URL?.replace('/api', '') || "http://localhost:5000";
};

export const API_URL = getApiUrl();
export const BACKEND_URL = getBackendUrl();

// Helper function to construct image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/300x200";
  if (imagePath.startsWith('http')) return imagePath;
  return `${BACKEND_URL}/${imagePath}`;
};

// Log the API URL being used (for debugging)
console.log("YourPlaces API_URL:", API_URL);
console.log("YourPlaces BACKEND_URL:", BACKEND_URL);

const apiConfig = {
  API_URL,
  BACKEND_URL,
  getImageUrl,
  ENDPOINTS: {
    USERS: `${API_URL}/users`,
    LOGIN: `${API_URL}/users/login`,
    PLACES: `${API_URL}/places`,
  },
};

export default apiConfig;
