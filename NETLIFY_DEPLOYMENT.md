# Deploying to Netlify

This guide walks you through deploying your Motor Logos application to Netlify.

## Prerequisites

- A Netlify account. [Sign up here](https://app.netlify.com/signup) if you don't have one.
- Node.js and npm installed.

## Deployment Options

### Option 1: Automatic Deployment with Script

1. Make the deployment script executable:
   ```
   chmod +x deploy-to-netlify.sh
   ```

2. Run the deployment script:
   ```
   ./deploy-to-netlify.sh
   ```

3. Follow the prompts in the terminal to complete the deployment.

### Option 2: Manual Deployment

1. Install Netlify CLI globally (if not already installed):
   ```
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```
   netlify login
   ```

3. Initialize your Netlify site (if not already done):
   ```
   netlify init
   ```

4. Deploy to Netlify:
   ```
   netlify deploy --build
   ```

## Important: Environment Variables

After deployment, you need to set up the following environment variables in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Build & deploy > Environment
3. Add the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL database connection string

## Testing Your Deployment

1. After deployment, Netlify will provide you with a unique URL to access your site.
2. Make sure all functionality works correctly in the production environment.
3. Test the admin functionality for logo management.
4. Verify that the API endpoints are working properly.

## Troubleshooting

- **API Connections**: If your frontend can't connect to the API, check if the Netlify redirects in `netlify.toml` are working properly.
- **Database Issues**: Verify that your DATABASE_URL is correctly set in Netlify's environment variables.
- **Build Errors**: Check Netlify's deploy logs for any build or compilation errors.

## Continuous Deployment

To enable continuous deployment:

1. Connect your Netlify site to your GitHub repository.
2. Configure the build settings in Netlify dashboard.
3. Set up the correct branch for deployment.

Now your site will automatically deploy whenever you push changes to the specified branch.