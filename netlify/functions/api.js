const express = require('express');
const serverless = require('serverless-http');
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Define paths to look for schema
const possiblePaths = [
  path.join(__dirname, '../../dist/shared/schema.js'),
  path.join(__dirname, '../dist/shared/schema.js'),
  path.join(__dirname, '/dist/shared/schema.js'),
  path.join(__dirname, '../shared/schema.js'),
  path.join(__dirname, 'dist/shared/schema.js'),
  path.join(__dirname, 'shared/schema.js')
];

// Import schema - handle ES Module schema with dynamic import fallback
let schema = {};
let schemaPath = null;

// First check which paths exist
for (const checkPath of possiblePaths) {
  try {
    if (fs.existsSync(checkPath)) {
      schemaPath = checkPath;
      console.log('Found schema file at:', checkPath);
      break;
    }
  } catch (e) {
    // Continue checking other paths
  }
}

// Try to load the schema if we found a path
if (schemaPath) {
  try {
    const schemaModule = require(schemaPath);
    schema = schemaModule.default || schemaModule;
    console.log('Successfully loaded schema');
  } catch (e) {
    console.warn('Found schema file but failed to import it:', e.message);
    schemaPath = null; // Reset so we fall back to manual schema
  }
}

// Fall back to manual schema if needed
if (!schemaPath) {
  console.warn('Using manually defined schema');
  
  // Define schema manually for Netlify function to avoid ESM/CommonJS conflicts
  const { pgTable, text, serial, integer, boolean } = require('drizzle-orm/pg-core');
  
  schema = {
    users: pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull(),
    }),
    
    companyLogos: pgTable("company_logos", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      imageUrl: text("image_url").notNull(),
      darkModeUrl: text("dark_mode_url"),
      altText: text("alt_text"),
      displayOrder: integer("display_order").notNull(),
      isActive: boolean("is_active").default(true),
    })
  };
}

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());

// Database connection
let pool, db;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
}

// Logos endpoints
app.get('/api/logos/active', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    const logos = await db.query.companyLogos.findMany({
      where: (logos, { eq }) => eq(logos.isActive, true)
    });
    res.json({ logos });
  } catch (error) {
    console.error('Error fetching active logos:', error);
    res.status(500).json({ error: 'Failed to fetch logos' });
  }
});

app.get('/api/logos', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    const logos = await db.query.companyLogos.findMany();
    res.json({ logos });
  } catch (error) {
    console.error('Error fetching logos:', error);
    res.status(500).json({ error: 'Failed to fetch logos' });
  }
});

// Any other routes can be added here

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export the serverless handler
module.exports.handler = serverless(app);