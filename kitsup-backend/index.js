import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Configure CORS to allow requests from your frontend URL
app.use(cors({
  origin: 'https://kitsup-front-132946936245.asia-south1.run.app', // Your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Debug logging middleware (optional, remove in production)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


// API routes
app.get('/api/auth/harsh', (req, res) => {  
  res.json({ message: 'Welcome Harsh kya seva kar sakta mai aapki' });
});

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('ERROR:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl
  });
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something broke!'
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
