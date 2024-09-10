import express from 'express';
import { chatWithPersona, getChatHistory } from '../controllers/chatController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.use(authenticateToken);

router.post('/chat', chatWithPersona);
router.get('/history/:personaId', getChatHistory);

export default router;