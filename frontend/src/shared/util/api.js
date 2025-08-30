// API Configuration for YourPlaces
// Backend server configuration

// Use environment variable for API URL with fallback to localhost
const getApiUrl = () => {
  // In production, use the deployed backend URL
  // In development, use localhost:5000
  return process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";
};

export const API_URL = getApiUrl();

// Log the API URL being used (for debugging)
console.log("YourPlaces API_URL:", API_URL);

export default {
  API_URL,
  ENDPOINTS: {
    USERS: `${API_URL}/users`,
    LOGIN: `${API_URL}/login`,
    PLACES: `${API_URL}/places`,
  },
};
