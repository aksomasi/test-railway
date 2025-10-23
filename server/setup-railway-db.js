const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  try {
    // Create database
    await connection.execute('CREATE DATABASE IF NOT EXISTS dive_thru');
    await connection.execute('USE dive_thru');
    
    // Read and execute schema
    const schema = fs.readFileSync(path.join(__dirname, '../client/src/db.sql'), 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }
    
    // Read and execute seeds
    const seeds = fs.readFileSync(path.join(__dirname, '../client/src/seeds.sql'), 'utf8');
    const seedStatements = seeds.split(';').filter(stmt => stmt.trim());
    
    for (const statement of seedStatements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }
    
    console.log('✅ Database setup completed successfully');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await connection.end();
  }
}

setupDatabase();