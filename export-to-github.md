# Exporting Your Project to GitHub

This guide provides instructions on how to export your Electric Motor Logos application from Replit to GitHub, which can be used for source control and continuous deployment with Netlify.

## Prerequisites

- A GitHub account ([Sign up here](https://github.com/signup) if you don't have one)
- A GitHub Personal Access Token (classic) with `repo` scope
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Click "Generate new token" and select "Generate new token (classic)"
  - Give it a name, select at least the `repo` scope, and click "Generate token"
  - **Save the token** immediately, as GitHub will only show it once!

## Option 1: Using the Automated Script (Recommended)

We've created a helper script that simplifies the process of pushing your code to GitHub:

1. Make the script executable (if not already):
   ```bash
   chmod +x push-to-github.sh
   ```

2. Run the script with your GitHub username and personal access token:
   ```bash
   ./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN
   ```

3. The script will:
   - Check if Git is initialized (and initialize it if needed)
   - Configure your Git identity (if not already configured)
   - Create a repository on GitHub if it doesn't exist
   - Add a remote pointing to your GitHub repository
   - Push your code to GitHub

## Option 2: Manual Export Steps

If you prefer more control or the script doesn't work for your situation, you can manually push your code to GitHub:

1. Initialize Git (if not already initialized):
   ```bash
   git init
   ```

2. Configure your Git identity:
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

3. Add all files to the staging area:
   ```bash
   git add .
   ```

4. Create an initial commit:
   ```bash
   git commit -m "Initial commit"
   ```

5. Create a new repository on GitHub:
   - Go to [GitHub](https://github.com/new)
   - Name your repository (e.g., "electric-motor-logos")
   - Set it to Public or Private
   - Do not initialize it with a README, .gitignore, or license
   - Click "Create repository"

6. Connect your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/USERNAME/REPOSITORY.git
   ```

7. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
   
   Note: If you're asked for authentication, use your GitHub username and the personal access token as your password.

## Setting Up Continuous Deployment with Netlify

After your code is on GitHub, you can set up continuous deployment with Netlify:

1. Log in to your Netlify account and go to the dashboard
2. Navigate to your site's settings
3. Under "Build & deploy" → "Continuous Deployment"
4. Click "Link a Git repository"
5. Select GitHub and authorize Netlify
6. Choose your repository from the list
7. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
8. Click "Deploy site"

Now, whenever you push changes to your GitHub repository, Netlify will automatically build and deploy your site.

## Important: Environment Variables

Remember to set up environment variables in Netlify:

1. Go to your site dashboard in Netlify
2. Navigate to Site settings → Build & deploy → Environment
3. Add your DATABASE_URL and any other required environment variables

## Workflow for Future Updates

After the initial push, here's how to update your GitHub repository:

1. Make changes to your code in Replit
2. Stage your changes:
   ```bash
   git add .
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to GitHub:
   ```bash
   git push
   ```

Netlify will automatically detect the changes and deploy your updated site.