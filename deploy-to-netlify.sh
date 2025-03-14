#!/bin/bash

# Add executable permission to this script
# chmod +x deploy-to-netlify.sh

set -e  # Exit immediately if a command exits with a non-zero status
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

# Make netlify-build.js executable
echo "📜 Making build script executable..."
chmod +x netlify-build.js

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

# Check if DATABASE_URL is set and warn if not
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️ Warning: DATABASE_URL environment variable is not set locally."
    echo "   Make sure to set it in Netlify's environment variables after deployment."
fi

# Deploy to Netlify (non-interactive)
echo "🚀 Deploying to Netlify..."
netlify deploy --build --prod

DEPLOYMENT_STATUS=$?

if [ $DEPLOYMENT_STATUS -eq 0 ]; then
    echo "✅ Deployment successful!"
    
    # Get the site URL from the Netlify config
    SITE_URL=$(netlify status | grep -oE 'https://[^ ]+' | head -1)
    
    echo "🌐 Your site is live at: $SITE_URL"
    echo ""
    echo "⚠️ Important: Set up environment variables in Netlify"
    echo "1. Go to Netlify dashboard > Site settings > Build & deploy > Environment"
    echo "2. Add the following environment variables:"
    echo "   - DATABASE_URL: Your PostgreSQL database connection string"
    echo ""
    echo "🔄 To connect this site to your GitHub repository for continuous deployment:"
    echo "1. Go to Netlify dashboard > Site settings > Build & deploy > Continuous Deployment"
    echo "2. Connect to GitHub and select your repository"
else
    echo "❌ Deployment failed with status: $DEPLOYMENT_STATUS"
    echo "Check the logs above for more details or try running 'netlify build' for more verbose output."
fi