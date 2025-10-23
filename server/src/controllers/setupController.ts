import { Request, Response } from 'express';
import { db } from '../database/mysql';
import fs from 'fs';
import path from 'path';

export class SetupController {
  async setupDatabase(req: Request, res: Response) {
    try {
      // Read schema file
      const schemaPath = path.join(__dirname, '../../../client/src/db.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Split and execute statements
      const statements = schema.split(';').filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'));
      
      for (const statement of statements) {
        if (statement.trim()) {
          await db.execute(statement.trim());
        }
      }
      
      // Read and execute seeds
      const seedsPath = path.join(__dirname, '../../../client/src/seeds.sql');
      const seeds = fs.readFileSync(seedsPath, 'utf8');
      const seedStatements = seeds.split(';').filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'));
      
      for (const statement of seedStatements) {
        if (statement.trim()) {
          await db.execute(statement.trim());
        }
      }
      
      res.json({ message: 'Database setup completed successfully' });
    } catch (error) {
      console.error('Database setup error:', error);
      res.status(500).json({ error: 'Database setup failed', details: error });
    }
  }
}