# Heroku Deployment Configuration

# For backend deployment only

# Frontend should be deployed separately to Vercel/Netlify

# Required files:

# 1. Procfile (in backend folder)

# 2. package.json (in backend folder)

# Heroku Commands:

# heroku create yourplaces-backend

# heroku config:set MONGODB_URI="your_connection_string"

# heroku config:set JWT_KEY="your_jwt_secret"

# heroku config:set GOOGLE_MAPS_API_KEY="your_api_key"

# git subtree push --prefix backend heroku main

# Environment Variables needed:

MONGODB_URI=mongodb+srv://ashadapuabhilash:placeguide@placeguide.rpkcnfk.mongodb.net/
JWT_KEY=your_super_secret_jwt_key_here_change_this_in_production
GOOGLE_MAPS_API_KEY=AIzaSyBmuWNQs8-6Hce-TScTY4KbKfYPbmfFQMg
PORT=5000
NODE_ENV=production

# Frontend should set:

REACT_APP_BACKEND_URL=https://yourplaces-backend.herokuapp.com/api
