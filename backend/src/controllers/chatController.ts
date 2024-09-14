import { Request, Response } from 'express';
import { generateResponse } from '../services/openaiService';
import ChatMessage from '../models/ChatMessage';
import Persona from '../models/Persona';

export const chatWithPersona = async (req: Request, response: Response): Promise<void> => {
  console.log('Chat request received');
  try {
    const { personaId, message } = req.body;
    console.log('Request body:', { personaId, message });
    const userId = req.user?.id;
    console.log('User ID:', userId);

    if (!userId) {
      console.log('User not authenticated');
      response.status(401).json({ message: 'User not authenticated' });
      return;
    }

    if (!personaId || !message) {
      console.log('Missing required fields');
      response.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Fetch the persona from the database
    const persona = await Persona.findOne({ _id: personaId });
    if (!persona) {
      console.log('Persona not found');
      response.status(404).json({ message: 'Persona not found' });
      return;
    }

    // Save user message
    await ChatMessage.create({
      userId,
      personaId: persona._id,
      role: 'user',
      content: message
    });

    const { response: aiResponse, contextualExplanations } = await generateResponse(persona.name, persona.context, message);

    // Save AI response
    await ChatMessage.create({
      userId,
      personaId: persona._id,
      role: 'ai',
      content: aiResponse,
      contextualExplanations
    });

    console.log('Chat response sent');
    response.status(200).json({ response: aiResponse, contextualExplanations });
  } catch (error) {
    console.error('Error in chat controller:', error);
    response.status(500).json({ message: 'An error occurred while processing your request' });
  }
};

export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
  console.log('Fetching chat history');
  try {
    const userId = req.user?.id;
    const { personaId } = req.params;

    console.log('User ID:', userId);
    console.log('Persona ID:', personaId);

    if (!userId) {
      console.log('User not authenticated');
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Verify that the persona exists
    const persona = await Persona.findOne({ _id: personaId });
    if (!persona) {
      console.log('Persona not found');
      res.status(404).json({ message: 'Persona not found' });
      return;
    }

    const messages = await ChatMessage.find({
      userId,
      personaId
    }).sort('timestamp');

    console.log('Found messages:', messages.length);

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'An error occurred while fetching chat history' });
  }
};