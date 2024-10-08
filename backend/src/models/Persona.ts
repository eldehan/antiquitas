import mongoose from 'mongoose';

const PersonaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  context: { type: String, required: true }
});

export default mongoose.model('Persona', PersonaSchema);