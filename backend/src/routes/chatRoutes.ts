import express from 'express';
import { chatWithPersona } from '../controllers/chatController';

const router = express.Router();

router.post('/chat', chatWithPersona);

export default router;