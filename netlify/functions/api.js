const express = require('express');
const serverless = require('serverless-http');
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const cors = require('cors');
const path = require('path');

// Import schema - handle ES Module schema with dynamic import fallback
let schema = {};
try {
  // Attempt to load schema as CommonJS from dist
  const schemaModule = require('../../dist/shared/schema.js');
  schema = schemaModule.default || schemaModule;
  console.log('Successfully loaded schema from dist directory');
} catch (e) {
  console.warn('Failed to import schema from dist, falling back to manually defined schema:', e.message);
  
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