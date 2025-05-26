import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Unified configuration for both local and Cloud Run
const dbConfig = {
  // Use socketPath for Cloud SQL, TCP for local
  ...(process.env.DB_SOCKET_PATH ? { 
    socketPath: process.env.DB_SOCKET_PATH 
  } : {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306
  }),
  
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'kitsupskill',
  
  // Pool settings
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // 10 seconds
};

// Debugging output (remove in production)
console.log('Database Config:', {
  ...dbConfig,
  password: '***' // Mask password in logs
});

export const db = mysql.createPool(dbConfig);

// Test connection immediately
try {
  const conn = await db.getConnection();
  console.log('✅ Database connected successfully');
  conn.release();
} catch (err) {
  console.error('❌ Database connection failed:', {
    error: err.message,
    code: err.code,
    config: {
      ...dbConfig,
      password: '***' // Mask password in error logs
    }
  });
  process.exit(1);
}