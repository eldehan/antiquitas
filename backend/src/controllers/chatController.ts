import { Request, Response } from 'express';
import { generateResponse } from '../services/openAIService';

export const chatWithPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const { persona, context, message } = req.body;

    if (!persona || !context || !message) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const response = await generateResponse(persona, context, message);

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};