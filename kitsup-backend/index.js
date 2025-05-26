import express from 'express';
import dotenv from 'dotenv';
 import cors from 'cors';
import { db } from './kitsup-backend/database.js';
import authRoutes from './kitsup-backend/routes/authRoutes.js'; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  // origin: 'https://kitsup-front-132946936245.asia-south1.run.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// DB Test Route
app.get('/api/db-test', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const [rows] = await conn.query('SELECT 1+1 AS result');
    conn.release();
    res.json({ 
      success: true, 
      result: rows[0].result,
      dbConfig: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME
      }
    });
  } catch (err) {
    console.error("Database Error:", {
      code: err.code,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      error: "DB Connection Failed",
      details: {
        code: err.code,
        message: err.message,
        config: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_NAME
        }
      }
    });
  }
});

app.use('/api/auth',authRoutes);  


// Your other routes...
app.get('/api/auth/harsh', (req, res) => {  
  res.json({ message: 'Welcome Harsh kya seva kar sakta mai aapki' });
});



const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('DB Config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER
  });
}); 

// Handle startup errors
server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});