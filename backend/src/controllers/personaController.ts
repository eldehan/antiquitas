import { Request, Response } from 'express';
import Persona from '../models/Persona';

export const getAllPersonas = async (req: Request, res: Response): Promise<void> => {
  try {
    const personas = await Persona.find({});
    res.status(200).json(personas);
  } catch (error) {
    console.error('Error fetching personas:', error);
    res.status(500).json({ message: 'An error occurred while fetching personas' });
  }
};

export const getPersonaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const persona = await Persona.findOne({ id: req.params.id });
    if (!persona) {
      res.status(404).json({ message: 'Persona not found' });
      return;
    }
    res.status(200).json(persona);
  } catch (error) {
    console.error('Error fetching persona:', error);
    res.status(500).json({ message: 'An error occurred while fetching the persona' });
  }
};