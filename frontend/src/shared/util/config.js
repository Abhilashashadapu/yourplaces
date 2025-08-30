// Configuration for API endpoints and app settings
const config = {
  // Backend API URL - uses environment variable or fallback for production
  API_BASE_URL: process.env.REACT_APP_BACKEND_URL || '/api',
  
  // Google Maps API Key
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  
  // App Information
  APP_NAME: process.env.REACT_APP_NAME || 'YourPlaces',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  
  // File Upload Configuration
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  
  // API Endpoints
  ENDPOINTS: {
    USERS: '/users',
    PLACES: '/places',
    AUTH: {
      SIGNUP: '/users/signup',
      LOGIN: '/users/login'
    }
  },
  
  // Validation Rules
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500
  },
  
  // Environment checks
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
};

// Validate required environment variables in production
if (config.IS_PRODUCTION) {
  const requiredEnvVars = ['REACT_APP_BACKEND_URL'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Missing required environment variable: ${envVar}`);
    }
  }
}

export default config;
