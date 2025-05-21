import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import path from

dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable cross-origin resource sharing

app.use(express.static(path.join(__dirname, "../kitsup-front/dist")));

app.get("*",(req,res) =>{
  res.sendFile(path.join(__dirname,".../kitsup-front/dist/index.html"))
});
// API Routes
app.use('/api/auth', authRoutes); 

 
// Start server on specified port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
