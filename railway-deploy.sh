#!/bin/bash
# Railway deployment script for backend only
# This script ensures clean deployment from backend directory

echo "🚂 Starting Railway Backend Deployment..."

# Navigate to backend directory
cd backend

echo "📦 Installing backend dependencies..."
npm ci --production

echo "🚀 Starting backend server..."
npm start
