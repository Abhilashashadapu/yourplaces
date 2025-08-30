# 🚀 YourPlaces Deployment Guide
## Railway Backend + Vercel Frontend

This is the **OFFICIAL** deployment guide for YourPlaces using Railway for backend and Vercel for frontend.

---

## 🚂 Railway Backend Deployment

### 1. Setup Railway Project

1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `yourplaces` repository
6. Railway will automatically detect the `railway.toml` configuration

### 2. Set Environment Variables in Railway

In your Railway dashboard, go to the **Variables** tab and add:

```bash
MONGODB_URI=mongodb+srv://ashadapuabhilash:placeguide@placeguide.rpkcnfk.mongodb.net/
JWT_KEY=9dc85da6f489467189a9edd398694f8cd0216d31766bb591ed284d9e9cf231cbd1dec55cddd8450c25bdf3ceebaaea813f729a8666e3c3fff95aa7534fc3d469
GOOGLE_MAPS_API_KEY=AIzaSyBmuWNQs8-6Hce-TScTY4KbKfYPbmfFQMg
PORT=5000
NODE_ENV=production
```

### 3. Deploy Backend

- Railway will automatically deploy when you push to GitHub
- Your backend will be available at: `https://yourapp-production.up.railway.app`
- Copy this URL - you'll need it for frontend deployment

---

## 🎨 Vercel Frontend Deployment

### 1. Setup Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Import Project"**
4. Select your `yourplaces` repository
5. Set **Root Directory** to `frontend`

### 2. Configure Build Settings

Vercel will automatically detect React. Ensure:
- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`

### 3. Set Environment Variables in Vercel

In Vercel dashboard, go to **Settings > Environment Variables** and add:

```bash
REACT_APP_BACKEND_URL=https://your-railway-app-url.railway.app/api
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBmuWNQs8-6Hce-TScTY4KbKfYPbmfFQMg
REACT_APP_NAME=YourPlaces
REACT_APP_VERSION=1.0.0
```

**Replace `your-railway-app-url` with your actual Railway URL!**

### 4. Deploy Frontend

- Click **"Deploy"**
- Vercel will build and deploy your frontend
- Your frontend will be available at: `https://yourapp.vercel.app`

---

## ✅ Post-Deployment Checklist

### Test All Features:
- [ ] User registration/login
- [ ] Place creation with image upload
- [ ] Place editing
- [ ] Place deletion
- [ ] Map functionality
- [ ] Image display

### Configure CORS (if needed):
If you get CORS errors, add this to your backend `app.js`:

```javascript
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://yourapp.vercel.app');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});
```

---

## 🔄 Continuous Deployment

Both platforms support automatic deployment:

- **Railway:** Automatically deploys backend when you push to `main` branch
- **Vercel:** Automatically deploys frontend when you push to `main` branch

---

## 🐛 Troubleshooting

### Backend Issues:
- Check Railway logs in dashboard
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct

### Frontend Issues:
- Check Vercel deployment logs
- Verify backend URL is correct in environment variables
- Ensure CORS is properly configured

### Authentication Issues:
- Generate new JWT secret if needed: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- Users may need to log out and log back in after JWT secret changes

---

## 💰 Cost

- **Railway:** Free tier with $5 credit monthly
- **Vercel:** Free tier for personal projects
- **Total:** $0 for development/portfolio projects

---

## 🎯 Final URLs

After deployment, you'll have:
- **Backend:** `https://yourapp-production.up.railway.app`
- **Frontend:** `https://yourapp.vercel.app`

**Your YourPlaces app is now live! 🚀**
