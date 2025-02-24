import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

export default pool;
