import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import personaRoutes from './routes/personaRoutes';

const app = express();
const port = process.env.PORT || 5001;

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', // or whatever URL your frontend is running on
  credentials: true
}));
app.use(express.json());

// Add this logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/personas', personaRoutes);

app.get('/', (req, res) => {
  res.send('Historical Persona Chat API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});