/**
 * Utility script to verify database connection before Netlify deployment
 * Run with node verify-db-connection.js
 */

const { Pool } = require('pg');

// Get the DATABASE_URL from environment variable or provide a fallback for testing
const dbUrl = process.env.DATABASE_URL || process.argv[2];

if (!dbUrl) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: No DATABASE_URL provided');
  console.log('Please provide a database connection string either through:');
  console.log('  1. The DATABASE_URL environment variable');
  console.log('     export DATABASE_URL=postgresql://username:password@hostname:port/database');
  console.log('  2. As a command line argument');
  console.log('     node verify-db-connection.js "postgresql://username:password@hostname:port/database"');
  process.exit(1);
}

console.log('\x1b[36m%s\x1b[0m', '🔍 Verifying database connection...');

// Create a new client
const pool = new Pool({
  connectionString: dbUrl,
  // Set a short timeout for the connection test
  connectionTimeoutMillis: 5000,
});

// Test the connection
async function testConnection() {
  let client;
  try {
    // Connect to the database
    client = await pool.connect();
    console.log('\x1b[32m%s\x1b[0m', '✅ Successfully connected to the database!');
    
    // Get PostgreSQL version to verify it's working
    const versionResult = await client.query('SELECT version()');
    console.log('\x1b[36m%s\x1b[0m', '📊 Database info:', versionResult.rows[0].version);
    
    // Check if tables exist
    console.log('\x1b[36m%s\x1b[0m', '📋 Checking for required tables...');
    
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    if (tablesResult.rows.length === 0) {
      console.log('\x1b[33m%s\x1b[0m', '⚠️ No tables found in the database.');
      console.log('You might need to run migrations using: npm run db:push');
    } else {
      console.log('\x1b[32m%s\x1b[0m', `✅ Found ${tablesResult.rows.length} tables:`);
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
      
      // Specifically check for required tables
      const requiredTables = ['users', 'company_logos'];
      const missingTables = requiredTables.filter(
        table => !tablesResult.rows.some(row => row.table_name === table)
      );
      
      if (missingTables.length > 0) {
        console.log('\x1b[33m%s\x1b[0m', `⚠️ Missing required tables: ${missingTables.join(', ')}`);
        console.log('Please run migrations using: npm run db:push');
      } else {
        console.log('\x1b[32m%s\x1b[0m', '✅ All required tables are present.');
        
        // Sample query to get company logo count
        const logoCountResult = await client.query('SELECT COUNT(*) FROM company_logos');
        console.log('\x1b[36m%s\x1b[0m', `📊 Found ${logoCountResult.rows[0].count} company logos in the database.`);
      }
    }
    
    console.log('\x1b[32m%s\x1b[0m', '✅ Database verification completed successfully!');
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to connect to the database:');
    console.error(error.message);
    
    // Provide helpful tips based on common errors
    if (error.code === 'ENOTFOUND') {
      console.log('\x1b[33m%s\x1b[0m', '🔍 The database host could not be found. Check hostname in connection string.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\x1b[33m%s\x1b[0m', '🔍 Connection refused. Check if database server is running and accessible.');
    } else if (error.code === '28P01') {
      console.log('\x1b[33m%s\x1b[0m', '🔍 Authentication failed. Check username and password.');
    } else if (error.code === '3D000') {
      console.log('\x1b[33m%s\x1b[0m', '🔍 Database does not exist. You might need to create it first.');
    }
    
    process.exit(1);
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
    
    // End the pool to allow the program to exit
    await pool.end();
  }
}

testConnection();