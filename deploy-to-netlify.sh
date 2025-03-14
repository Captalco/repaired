#!/bin/bash

# Add executable permission to this script
# chmod +x deploy-to-netlify.sh

echo "🚀 Starting Netlify deployment process..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "ℹ️ Netlify CLI is not installed. Installing..."
    npm install -g netlify-cli
fi

# Check if NETLIFY_AUTH_TOKEN is set
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "⚠️ NETLIFY_AUTH_TOKEN environment variable is not set."
    echo "Please set it by running: export NETLIFY_AUTH_TOKEN=your_personal_access_token"
    echo "You can create a personal access token at: https://app.netlify.com/user/applications#personal-access-tokens"
    exit 1
fi

# Use the token for non-interactive authentication
echo "🔑 Authenticating with Netlify using token..."
netlify login --auth $NETLIFY_AUTH_TOKEN

# Initialize Netlify site if not already initialized (non-interactive)
if [ ! -f ".netlify/state.json" ]; then
    echo "🏗️ Creating new Netlify site..."
    # Create a new site with auto-generated name
    netlify sites:create --name electric-motor-logos-$(date +%s) --with-ci
else
    echo "✅ Netlify site already initialized"
fi

# Deploy to Netlify (non-interactive)
echo "🚀 Deploying to Netlify..."
netlify deploy --build --prod

echo "✨ Deployment process completed! Check the URLs above for your site."
echo "⚠️ Note: Make sure to set up DATABASE_URL in Netlify environment variables"
echo "   You can do this in the Netlify dashboard under Site settings > Build & deploy > Environment"