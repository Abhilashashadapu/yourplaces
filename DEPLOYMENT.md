# YourPlaces - Deployment Guide

## 🚀 Production Deployment Checklist

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account or MongoDB server
- Google Maps API key with required permissions
- Domain name (for production)

### 1. Environment Variables Setup

#### Backend (.env)
Create a `.env` file in the `backend` directory:
```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yourplaces

# JWT Secret (Generate a strong random key)
JWT_KEY=your_super_secret_jwt_key_minimum_32_characters_long

# Google Maps API Key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
FRONTEND_URL=https://your-frontend-domain.com

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/images

# Security Configuration
BCRYPT_ROUNDS=12
JWT_EXPIRES_IN=1h
```

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```bash
# Backend API URL
REACT_APP_BACKEND_URL=https://your-backend-domain.com/api

# Google Maps API Key (for frontend)
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# App Configuration
REACT_APP_NAME=YourPlaces
REACT_APP_VERSION=1.0.0

# Build Configuration
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
```

### 2. Security Measures Implemented

#### Backend Security
- ✅ Environment variables for sensitive data
- ✅ CORS configuration with origin restrictions
- ✅ Input validation and sanitization
- ✅ JWT token authentication
- ✅ File upload restrictions and validation
- ✅ Error handling without information leakage

#### Frontend Security
- ✅ Environment variables for API endpoints
- ✅ Security headers in HTML (XSS, CSRF protection)
- ✅ Dynamic Google Maps API loading
- ✅ Input validation on forms
- ✅ No sensitive data in client-side code

### 3. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key:
   - For backend: Restrict by IP address
   - For frontend: Restrict by HTTP referrer (your domain)

### 4. Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist your server IP address
5. Get the connection string and add to MONGODB_URI

### 5. Build and Deploy

#### Backend Deployment
```bash
cd backend
npm install --production
npm start
```

#### Frontend Deployment
```bash
cd frontend
npm install
npm run build
# Deploy the 'build' folder to your hosting service
```

### 6. Hosting Recommendations

#### Backend Hosting
- **Heroku**: Easy deployment with environment variables
- **Railway**: Modern platform with Git integration
- **DigitalOcean App Platform**: Scalable with database integration
- **AWS Elastic Beanstalk**: Enterprise-grade with auto-scaling

#### Frontend Hosting
- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **AWS S3 + CloudFront**: Enterprise solution
- **GitHub Pages**: Free for public repositories

### 7. Environment-Specific Configurations

#### Development
```bash
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

#### Production
```bash
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
REACT_APP_BACKEND_URL=https://api.your-domain.com/api
```

### 8. Post-Deployment Checklist

- [ ] Test user registration and login
- [ ] Test place creation with image upload
- [ ] Test Google Maps functionality
- [ ] Verify CORS settings work correctly
- [ ] Test file upload size limits
- [ ] Check error handling and logging
- [ ] Verify environment variables are loaded
- [ ] Test responsive design on mobile devices

### 9. Monitoring and Maintenance

#### Recommended Tools
- **Backend Monitoring**: PM2, New Relic, or DataDog
- **Frontend Monitoring**: Google Analytics, Sentry
- **Database Monitoring**: MongoDB Atlas built-in monitoring
- **Uptime Monitoring**: UptimeRobot, Pingdom

#### Regular Maintenance
- Update dependencies regularly
- Monitor server logs for errors
- Backup database regularly
- Rotate JWT secrets periodically
- Monitor API usage and costs

### 10. Troubleshooting

#### Common Issues
1. **CORS Errors**: Check FRONTEND_URL in backend .env
2. **Database Connection**: Verify MONGODB_URI and network access
3. **Google Maps Not Loading**: Check API key and enabled services
4. **File Upload Fails**: Check file size limits and upload directory permissions
5. **JWT Errors**: Ensure JWT_KEY is properly set and consistent

#### Debug Commands
```bash
# Check environment variables
node -e "console.log(process.env)"

# Test MongoDB connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(console.error)"

# Check API endpoints
curl https://your-backend-domain.com/api/users
```

### 11. Security Best Practices

- Never commit .env files to version control
- Use strong, unique passwords for all services
- Enable 2FA on all accounts (MongoDB, hosting, domain)
- Regularly update dependencies
- Use HTTPS for all production deployments
- Implement rate limiting for APIs
- Monitor for security vulnerabilities
- Keep backups of your database

---

## 📞 Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Review server logs for specific error messages
3. Verify all environment variables are correctly set
4. Test each component individually (database, backend, frontend)

Remember to keep your API keys and secrets secure! 🔐
