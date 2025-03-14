#!/bin/bash

# Script to set up Netlify CLI and prepare for deployment
# Author: Electric Motor Logos Team
# Date: March 14, 2025

set -e  # Exit immediately if a command exits with non-zero status

echo "🔧 Setting up Netlify CLI for deployment..."

# Check if netlify-cli is already installed globally
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI globally..."
    npm install -g netlify-cli
else
    echo "✅ Netlify CLI is already installed."
    echo "Current version: $(netlify --version)"
fi

# Check if the user already has a Netlify account
echo ""
echo "ℹ️ You'll need a Netlify account to deploy your application."
echo "   If you don't have one yet, you can sign up at https://app.netlify.com/signup"
echo ""

# Ask if they want to login now
read -p "Would you like to log in to Netlify now? (y/n): " login_choice

if [[ $login_choice =~ ^[Yy]$ ]]; then
    echo "🔑 Logging in to Netlify..."
    netlify login
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully logged in to Netlify."
    else
        echo "❌ Failed to log in to Netlify. You can try again later with 'netlify login'."
    fi
else
    echo "ℹ️ You can log in later with 'netlify login'"
fi

# Explain environment variables
echo ""
echo "🌐 IMPORTANT: Environment Variables"
echo "======================================"
echo "When deploying to Netlify, you'll need to set these environment variables:"
echo ""
echo "1. DATABASE_URL (Required)"
echo "   - Format: postgresql://username:password@hostname:port/database"
echo "   - You can use:"
echo "     * Neon (https://neon.tech) - Recommended for serverless"
echo "     * Supabase (https://supabase.com)"
echo "     * Any PostgreSQL provider with connection string support"
echo ""
echo "To set environment variables in Netlify:"
echo "1. Go to your Netlify site dashboard"
echo "2. Navigate to Site settings > Build & deploy > Environment"
echo "3. Add the required variables"
echo ""

# Create a local .env file for development
if [ ! -f .env ]; then
    echo "📝 Creating a sample .env file for local development..."
    cat > .env << EOF
# Local development environment variables
# DO NOT commit this file to version control

# Database connection string (required)
# Format: postgresql://username:password@hostname:port/database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/motorlogos

# Netlify personal access token (optional, for CI/CD)
# NETLIFY_AUTH_TOKEN=your_token_here
EOF
    echo "✅ Created .env file with sample configuration."
    echo "   Please edit it with your actual database credentials."
else
    echo "ℹ️ .env file already exists."
fi

# Make sure .env is in .gitignore
if ! grep -q "^\.env$" .gitignore; then
    echo "" >> .gitignore
    echo "# Environment variables" >> .gitignore
    echo ".env" >> .gitignore
    echo "✅ Added .env to .gitignore"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit your .env file with your actual database credentials"
echo "2. Run your application locally with 'npm run dev'"
echo "3. Deploy to Netlify with './deploy-to-netlify.sh'"
echo ""
echo "For detailed deployment instructions, see NETLIFY_DEPLOYMENT.md"