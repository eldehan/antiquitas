import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';

const app = express();
const port = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Historical Persona Chat API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});