# YourPlaces - Vercel Deployment Guide

## Project Structure

```
YOURPLACES/
├── api/                    # Vercel serverless functions
│   ├── places.js          # Places CRUD operations
│   ├── users.js           # User registration
│   └── login.js           # User authentication
├── frontend/              # React application
├── backend/               # Original backend (for reference)
├── package.json           # API dependencies
└── vercel.json           # Vercel configuration
```

## Deployment Steps

### 1. Set up MongoDB

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `<password>` and `<cluster>` in the connection string

### 2. Configure Vercel Environment Variables

In your Vercel dashboard, go to Settings → Environment Variables and add:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/yourplaces?retryWrites=true&w=majority
JWT_SECRET = your_super_secret_jwt_key_here_make_it_long_and_random
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 4. API Endpoints

After deployment, your API will be available at:

- `GET /api/users` - Get all users
- `POST /api/users` - Register new user
- `POST /api/login` - User login
- `GET /api/places` - Get all places
- `GET /api/places?uid=USER_ID` - Get places by user
- `POST /api/places` - Create new place
- `PATCH /api/places?pid=PLACE_ID` - Update place
- `DELETE /api/places?pid=PLACE_ID` - Delete place

### 5. Frontend Configuration

The frontend is configured to use `/api` endpoints which will automatically route to your Vercel functions.

## Local Development

```bash
# Install dependencies
npm install

# Start frontend
cd frontend
npm start

# For local API testing, you can use Vercel CLI
vercel dev
```

## Notes

- Image uploads are currently using base64 encoding for Vercel compatibility
- For production, consider using cloud storage (AWS S3, Cloudinary) for images
- MongoDB connection is handled per request in serverless functions
- CORS is configured to allow all origins (adjust for production security)
