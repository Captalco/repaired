/**
 * Netlify build script to prepare the project for deployment
 * This file must be CommonJS to ensure maximum compatibility with Netlify build process
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('🏗️ Starting Netlify build process...');
  
  // Build the frontend with Vite
  console.log('📦 Building frontend with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy the netlify/functions directory to dist/netlify/functions
  console.log('📂 Setting up Netlify functions...');
  execSync('mkdir -p dist/netlify/functions', { stdio: 'inherit' });
  execSync('cp -r netlify/functions/* dist/netlify/functions/', { stdio: 'inherit' });
  
  // Create shared directory in functions directory to store schema
  console.log('📂 Setting up schema for Netlify functions...');
  execSync('mkdir -p dist/netlify/functions/shared', { stdio: 'inherit' });
  
  // Convert the schema to CommonJS and save it directly in the function directory
  console.log('🔄 Converting and copying schema to functions directory...');
  
  // Read the schema file from dist/shared/schema.js
  if (fs.existsSync('dist/shared/schema.js')) {
    const schemaPath = path.join(process.cwd(), 'dist/shared/schema.js');
    let schemaContent = fs.readFileSync(schemaPath, 'utf8');
    
    // Create a CommonJS version of the schema
    let commonJsSchema = `
/**
 * CommonJS version of schema for Netlify Functions
 * Auto-generated during build process - DO NOT EDIT
 */

const { pgTable, text, serial, integer, boolean } = require('drizzle-orm/pg-core');

// Define schema tables
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

const companyLogos = pgTable("company_logos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  darkModeUrl: text("dark_mode_url"),
  altText: text("alt_text"),
  displayOrder: integer("display_order").notNull(),
  isActive: boolean("is_active").default(true),
});

// Export tables
module.exports = {
  users,
  companyLogos
};
`;
    
    // Write the CommonJS version to the shared directory
    fs.writeFileSync('dist/netlify/functions/shared/schema.js', commonJsSchema);
    console.log('✅ Schema converted and copied successfully!');
  } else {
    console.warn('⚠️ Schema file not found in dist/shared/schema.js. Using fallback in API function.');
  }
  
  // Install dependencies in the functions directory
  console.log('📦 Installing function dependencies...');
  execSync('cd dist/netlify/functions && npm install --no-package-lock', { stdio: 'inherit' });
  
  // Verify the build structure
  console.log('🔍 Verifying build structure...');
  execSync('find dist -type f | sort', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}