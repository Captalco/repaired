#!/bin/bash

# Script to push code to GitHub using a personal access token
# Usage: 
#   - With command-line arguments: ./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN
#   - With environment variables: export GITHUB_USERNAME=your_username && export GITHUB_TOKEN=your_token && ./push-to-github.sh

set -e  # Exit immediately if a command exits with a non-zero status

# Check for environment variables first, then fall back to command-line arguments
if [ -z "$GITHUB_USERNAME" ] || [ -z "$GITHUB_TOKEN" ]; then
  if [ $# -lt 2 ]; then
    echo "❌ Error: Missing required GitHub credentials"
    echo "Either set GITHUB_USERNAME and GITHUB_TOKEN environment variables:"
    echo "   export GITHUB_USERNAME=your_username"
    echo "   export GITHUB_TOKEN=your_personal_access_token"
    echo "Or provide them as command-line arguments:"
    echo "   ./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN"
    exit 1
  else
    GITHUB_USERNAME=$1
    GITHUB_TOKEN=$2
  fi
fi

# Allow custom repository name through environment variable or default to "repaired"
REPO_NAME=${GITHUB_REPO_NAME:-"repaired"}
REMOTE_URL="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo "🔄 Setting up GitHub credentials..."
git config --global credential.helper store
git config --global user.name "$GITHUB_USERNAME"
git config --global user.email "$GITHUB_USERNAME@users.noreply.github.com"

# Check if remote exists
if git remote | grep -q "^origin$"; then
  echo "🔄 Updating origin remote..."
  git remote set-url origin "$REMOTE_URL"
else
  echo "🔄 Adding origin remote..."
  git remote add origin "$REMOTE_URL"
fi

# Ensure we're on main branch
git branch -M main

# Optional commit message
COMMIT_MESSAGE=${COMMIT_MESSAGE:-"Update project files before GitHub push"}

# Stage any unstaged changes
echo "📦 Staging any changes..."
git add -A

# Check if there are changes to commit
if ! git diff --cached --quiet; then
  echo "💾 Committing changes..."
  git commit -m "$COMMIT_MESSAGE"
fi

# Push to GitHub with token (no interactive password prompt)
echo "🚀 Pushing to GitHub..."
git push -u origin main

PUSH_STATUS=$?

if [ $PUSH_STATUS -eq 0 ]; then
  echo "✅ Push completed successfully!"
  echo "🌐 Your code is now available at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
  
  echo ""
  echo "🔄 To deploy this repository to Netlify:"
  echo "1. Run the deploy-to-netlify.sh script"
  echo "2. Or connect your GitHub repository to Netlify for continuous deployment"
else
  echo "❌ Push failed with status: $PUSH_STATUS"
  echo "Check the error messages above for details."
fi