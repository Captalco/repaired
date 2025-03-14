# Deploying to Netlify

This guide provides comprehensive instructions for deploying your Electric Motor Logos application to Netlify.

## Prerequisites

- A Netlify account. [Sign up here](https://app.netlify.com/signup) if you don't have one.
- Node.js and npm installed (Node.js 18+ recommended).
- A GitHub repository to store your code (optional for CI/CD).
- A PostgreSQL database (see Database Connection Options below).

## Setup & Preparation

Before deploying, you can use our setup script to prepare your environment:

```bash
# Make the script executable
chmod +x setup-netlify-cli.sh

# Run the setup script
./setup-netlify-cli.sh
```

This script will:
- Install the Netlify CLI if needed
- Help you log in to Netlify
- Create a sample `.env` file for local development
- Add environment variables information

## Deployment Options

### Option 1: One-Click Deployment with Script (Recommended)

1. Ensure you have a Netlify personal access token:
   - Go to Netlify → User settings → Applications → Personal access tokens
   - Create a new token with appropriate permissions
   - Set it as an environment variable:
   ```bash
   export NETLIFY_AUTH_TOKEN=your_personal_access_token
   ```

2. Run the deployment script:
   ```bash
   ./deploy-to-netlify.sh
   ```

3. The script will handle everything automatically and provide a URL for your deployed site.

### Option 2: Step-by-Step Manual Deployment

1. Install and authenticate with Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. Initialize your Netlify site:
   ```bash
   netlify init
   ```

3. Build and deploy your application:
   ```bash
   npm run build  # Build the application
   netlify deploy --prod  # Deploy to production
   ```

## Critical: Database Configuration

Your application requires a PostgreSQL database to function properly.

### Setting Up Environment Variables

After deployment, you **must** configure these environment variables in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to Site settings → Build & deploy → Environment
3. Add the following environment variable:
   - `DATABASE_URL`: Your PostgreSQL connection string
     Format: `postgresql://username:password@hostname:port/database`

### Database Provider Options

#### Option 1: Neon (Recommended for Serverless)
- Visit [Neon.tech](https://neon.tech) and create a free account
- Create a new PostgreSQL database
- Enable the "Serverless Driver" option for better performance
- Copy the connection string with pooling enabled

#### Option 2: Supabase
- Visit [Supabase.com](https://supabase.com) and create a free project
- Navigate to Project Settings → Database
- Find and copy the PostgreSQL connection string
- Note: You may need to enable "Direct Connections" in settings

#### Option 3: Any PostgreSQL Provider
- You can use any PostgreSQL database that provides a standard connection string
- Examples include Render, Railway, Digital Ocean, AWS RDS, etc.

## Schema Migration

For the first deployment, you'll need to set up the database schema:

1. Connect to your database using the connection string
2. Initialize the schema using Drizzle:
   - In development: Run `npm run db:push`
   - For production: The application will handle migrations automatically

## Testing Your Deployment

1. Access your deployed site at the Netlify-provided URL
2. Verify that:
   - The homepage and all public pages load correctly
   - The admin login functionality works
   - Logo management in the admin area functions properly
   - API endpoints return correct data

## Troubleshooting Common Issues

### API Connection Problems
- Check that the redirects in `netlify.toml` are correct
- Verify API calls in browser developer tools to see response codes
- Ensure database connection is working in Netlify functions

### Database Connection Issues
- Verify your DATABASE_URL is correctly set in Netlify environment variables
- Make sure your database provider allows connections from Netlify's IP ranges
- Try testing the connection with a simple query in the Netlify function logs

### Build Failures
- Check Netlify's deploy logs for specific error messages
- Verify that all dependencies are correctly installed
- Ensure that Node.js version in `netlify.toml` matches your development environment

## Continuous Deployment (CI/CD)

To enable automatic deployments whenever you push to GitHub:

1. Push your code to GitHub using our helper script:
   ```bash
   ./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN
   ```

2. Connect your Netlify site to your GitHub repository:
   - Go to Netlify dashboard → Site settings → Build & deploy → Continuous Deployment
   - Connect to GitHub and select your repository
   - Configure build settings to match your project

3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Make sure environment variables are set up in Netlify

Now your site will automatically rebuild and deploy when you push changes to your repository.