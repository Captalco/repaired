# Exporting Your Replit Project to GitHub

## Method 1: Using the Included Script (Recommended)

The simplest way to push your code to GitHub is using our custom script:

1. First, create a personal access token on GitHub:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic)
   - Note: Select "classic" token
   - Give it a name (e.g., "Replit Export")
   - Set an expiration date
   - Select at least the "repo" scope
   - Click "Generate token" and copy the token

2. Run the push script with your GitHub username and token:
   ```bash
   ./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN
   ```

3. Check your GitHub repository at `https://github.com/YOUR_USERNAME/repaired`

## Method 2: Using Replit's GitHub Integration

If you prefer to use Replit's built-in integration:

1. Click on the version control icon in the left sidebar (Git icon)
2. Click "Connect to GitHub"
3. If prompted, authorize Replit
4. Select your existing repository (`repaired`)
5. Follow the prompts to commit and push

## Method 3: Using GitHub Import Feature

If you're still having trouble, you can export and import manually:

1. Download your Replit code as a ZIP file:
   - Click on the three dots (...) in the Replit file explorer
   - Select "Download as zip"

2. Go to https://github.com/Captalco/repaired (your existing repo)
   - Click "Add file" → "Upload files"
   - Drag and drop the ZIP contents or select them from your computer
   - Add a commit message
   - Click "Commit changes"

## Troubleshooting GitHub Push Issues in Replit

If you're experiencing timeout issues:

1. **Use HTTPS with Token in URL**:
   ```bash
   git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/Captalco/repaired.git
   git push -u origin main
   ```

2. **Reduce Repository Size**:
   - Add large files to .gitignore
   - Consider using Git LFS for large files
   
3. **Split Your Push**:
   - Push in smaller commits
   - Try pushing one folder at a time

## After Connecting to GitHub

Once your code is on GitHub, you can:
- Set up GitHub Actions for continuous integration
- Connect Netlify for continuous deployment (see NETLIFY_DEPLOYMENT.md)
- Share the repository with collaborators
- Make changes, commit, and push using standard Git workflows