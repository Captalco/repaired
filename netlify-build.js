// Netlify build script to prepare the project for deployment
const { execSync } = require('child_process');

try {
  console.log('🏗️ Starting Netlify build process...');
  
  // Build the frontend with Vite
  console.log('📦 Building frontend with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy the netlify/functions directory to dist/netlify/functions
  console.log('📂 Setting up Netlify functions...');
  execSync('mkdir -p dist/netlify/functions', { stdio: 'inherit' });
  execSync('cp -r netlify/functions/* dist/netlify/functions/', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}