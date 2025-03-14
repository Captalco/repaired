import express from 'express';
import serverless from 'serverless-http';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import cors from 'cors';

const { Pool } = pg;

// Import schema - handle both ESM and CommonJS
let schema = {};
try {
  // Dynamic import for ES modules
  const schemaModule = await import('../../dist/shared/schema.js');
  schema = schemaModule.default || schemaModule;
} catch (e) {
  console.warn('Failed to import schema from dist, falling back to source:', e.message);
  try {
    const schemaModule = await import('../../shared/schema.js');
    schema = schemaModule.default || schemaModule;
  } catch (e) {
    console.error('Failed to import schema:', e.message);
  }
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
      where: (logos, { eq }) => eq(logos.active, true)
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
export const handler = serverless(app);