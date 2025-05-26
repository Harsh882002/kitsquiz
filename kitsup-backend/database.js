import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// MySQL configuration for GCP VM (TCP connection)
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1', // IP of Cloud SQL instance
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'kitsupskill',

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
};

// Debug (optional, remove in production)
console.log('📦 DB Config:', {
  ...dbConfig,
  password: '***' // Mask password
});

export const db = mysql.createPool(dbConfig);

// Test DB connection
(async () => {
  try {
    const conn = await db.getConnection();
    console.log('✅ DB Connected successfully');
    conn.release();
  } catch (err) {
    console.error('❌ DB Connection error:', {
      code: err.code,
      message: err.message,
      config: {
        ...dbConfig,
        password: '***'
      }
    });
    process.exit(1);
  }
})();
