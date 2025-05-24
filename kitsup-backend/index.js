import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
 app.use(cors({
  origin: 'https://kitsup-front-132946936245.asia-south1.run.app',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Debugging middleware (remove in production)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);

// ==================== CRITICAL CHANGES BELOW ====================
const frontendPath = path.join(__dirname, '../kitsup-front/dist');
console.log('Serving static files from:', frontendPath);

// Serve static files with proper error handling
app.use(express.static(frontendPath, {
  dotfiles: 'ignore',
  extensions: ['html', 'js', 'css', 'json'],
  fallthrough: false // Fail fast if file not found
}));

// SPA Fallback with enhanced error handling
app.get(/^(?!\/api).*/, (req, res, next) => {
  const indexPath = path.join(frontendPath, 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      next(err);
    }
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('ERROR:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl
  });
  
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something broke!',
    hint: 'Check server logs and verify frontend build exists at ' + frontendPath
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
   
});