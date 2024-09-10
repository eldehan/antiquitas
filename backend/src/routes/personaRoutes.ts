import express from 'express';
import { getAllPersonas, getPersonaById } from '../controllers/personaController';

const router = express.Router();

router.get('/', getAllPersonas);
router.get('/:id', getPersonaById);

export default router;
