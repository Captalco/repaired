#!/bin/bash

# Helper script to push your Replit project to GitHub
# Usage: ./push-to-github.sh USERNAME TOKEN [REPO_NAME]

# Text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check for required arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo "Usage: ./push-to-github.sh USERNAME TOKEN [REPO_NAME]"
    echo "  USERNAME: Your GitHub username"
    echo "  TOKEN: Your GitHub personal access token with repo scope"
    echo "  REPO_NAME: (Optional) The name of the repository to create (defaults to 'electric-motor-logos')"
    exit 1
fi

# Assign arguments to variables
GH_USERNAME="$1"
GH_TOKEN="$2"
REPO_NAME="${3:-electric-motor-logos}"

echo -e "${BLUE}=== Preparing to push to GitHub ===${NC}"

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}Git repository not initialized. Initializing now...${NC}"
    git init
    
    # Add .git folder to .gitignore
    if ! grep -q ".git" .gitignore 2>/dev/null; then
        echo ".git" >> .gitignore
        echo "Added .git to .gitignore"
    fi
else
    echo -e "${GREEN}Git repository already initialized${NC}"
fi

# Check if git user is configured
GIT_USER_NAME=$(git config user.name || echo "")
GIT_USER_EMAIL=$(git config user.email || echo "")

if [ -z "$GIT_USER_NAME" ] || [ -z "$GIT_USER_EMAIL" ]; then
    echo -e "${YELLOW}Git user not configured. Using default values...${NC}"
    git config user.name "Replit User"
    git config user.email "user@replit.com"
    echo "Set git user to: Replit User <user@replit.com>"
else
    echo -e "${GREEN}Git user already configured: $GIT_USER_NAME <$GIT_USER_EMAIL>${NC}"
fi

# Check if we have any uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${YELLOW}You have uncommitted changes. Staging and committing them now...${NC}"
    git add .
    git commit -m "Prepare for GitHub export"
    echo -e "${GREEN}Changes committed${NC}"
else
    # Check if we need an initial commit
    if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
        echo -e "${YELLOW}Creating initial commit...${NC}"
        git add .
        git commit -m "Initial commit"
        echo -e "${GREEN}Initial commit created${NC}"
    else
        echo -e "${GREEN}No uncommitted changes${NC}"
    fi
fi

# Temporarily store credentials
echo -e "${BLUE}Setting up credentials for GitHub...${NC}"
git config --local credential.helper store
echo "https://$GH_USERNAME:$GH_TOKEN@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials

# Check if the repository exists
echo -e "${BLUE}Checking if repository exists on GitHub...${NC}"
REPO_EXISTS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $GH_TOKEN" "https://api.github.com/repos/$GH_USERNAME/$REPO_NAME")

if [ "$REPO_EXISTS" = "200" ]; then
    echo -e "${GREEN}Repository $REPO_NAME already exists${NC}"
else
    echo -e "${YELLOW}Repository $REPO_NAME does not exist. Creating it now...${NC}"
    curl -s -X POST -H "Authorization: token $GH_TOKEN" -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos -d "{\"name\":\"$REPO_NAME\",\"private\":false}" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Repository created successfully${NC}"
    else
        echo -e "${RED}Failed to create repository. Please check your token permissions.${NC}"
        # Clean up
        rm -f ~/.git-credentials
        exit 1
    fi
fi

# Check if remote exists and add/update it
if git remote | grep -q "^origin$"; then
    CURRENT_REMOTE=$(git remote get-url origin)
    EXPECTED_REMOTE="https://github.com/$GH_USERNAME/$REPO_NAME.git"
    
    if [ "$CURRENT_REMOTE" != "$EXPECTED_REMOTE" ]; then
        echo -e "${YELLOW}Updating remote origin from $CURRENT_REMOTE to $EXPECTED_REMOTE${NC}"
        git remote set-url origin "$EXPECTED_REMOTE"
    else
        echo -e "${GREEN}Remote origin already set correctly${NC}"
    fi
else
    echo -e "${YELLOW}Adding remote origin...${NC}"
    git remote add origin "https://github.com/$GH_USERNAME/$REPO_NAME.git"
fi

# Check current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}Current branch: $CURRENT_BRANCH${NC}"

# Push to GitHub
echo -e "${BLUE}Pushing to GitHub...${NC}"
git push -u origin "$CURRENT_BRANCH"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully pushed to GitHub!${NC}"
    echo -e "${GREEN}Your repository is available at: https://github.com/$GH_USERNAME/$REPO_NAME${NC}"
    
    # Provide next steps
    echo ""
    echo -e "${BLUE}==== Next Steps ====${NC}"
    echo -e "1. Set up Netlify continuous deployment by connecting to this GitHub repository"
    echo -e "2. Configure environment variables in Netlify (DATABASE_URL, etc.)"
    echo -e "3. For more details, refer to the NETLIFY_DEPLOYMENT.md file"
else
    echo -e "${RED}Failed to push to GitHub. Please check your credentials and try again.${NC}"
fi

# Clean up credentials
rm -f ~/.git-credentials
git config --local --unset credential.helper

echo -e "${BLUE}==== GitHub Push Complete ====${NC}"