#!/bin/bash

# Add executable permission to this script
# chmod +x deploy-to-netlify.sh

echo "🚀 Starting Netlify deployment process..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "ℹ️ Netlify CLI is not installed. Installing..."
    npm install -g netlify-cli
fi

# Login to Netlify (if not already logged in)
echo "🔑 Please login to your Netlify account..."
netlify login

# Initialize Netlify site if not already initialized
if [ ! -f ".netlify/state.json" ]; then
    echo "🏗️ Initializing Netlify site..."
    netlify init
else
    echo "✅ Netlify site already initialized"
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --build

echo "✨ Deployment process completed! Check the URLs above for your site."
echo "⚠️ Note: Make sure to set up DATABASE_URL in Netlify environment variables"
echo "   You can do this in the Netlify dashboard under Site settings > Build & deploy > Environment"