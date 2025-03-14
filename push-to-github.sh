#!/bin/bash

# Script to push code to GitHub using a personal access token
# Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN

if [ $# -lt 2 ]; then
  echo "❌ Error: Missing required parameters"
  echo "Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN"
  exit 1
fi

GITHUB_USERNAME=$1
GITHUB_TOKEN=$2
REPO_NAME="repaired"
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

# Stage any unstaged changes
echo "📦 Staging any changes..."
git add -A

# Check if there are changes to commit
if ! git diff --cached --quiet; then
  echo "💾 Committing changes..."
  git commit -m "Update project files before GitHub push"
fi

# Push to GitHub with token (no interactive password prompt)
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Push completed! Your code should now be available at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"