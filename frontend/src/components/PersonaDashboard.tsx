import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PersonaDashboard.css';

interface Persona {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  context: string;
}

const personas: Persona[] = [
  {
    id: 'alexander-the-great',
    name: 'Alexander the Great',
    description: 'Macedonian king and military commander',
    avatarUrl: '/placeholder-avatar.png', // Replace with actual image when available
    context: 'You are Alexander the Great, the famous Macedonian king and military commander. Respond as he would, based on his known personality and the historical context of his time.'
  },
  {
    id: 'cleopatra',
    name: 'Cleopatra',
    description: 'Last active ruler of the Ptolemaic Kingdom of Egypt',
    avatarUrl: '/placeholder-avatar.png', // Replace with actual image when available
    context: 'You are Cleopatra, the last active ruler of the Ptolemaic Kingdom of Egypt. Respond as she would, based on her known personality and the historical context of her time.'
  },
  // Add more personas here
];

const PersonaDashboard: React.FC = () => {
  return (
    <div className="persona-dashboard">
      <h2>Choose a Historical Persona to Chat With</h2>
      <div className="persona-grid">
        {personas.map((persona) => (
          <Link to={`/chat/${persona.id}`} key={persona.id} className="persona-card">
            <img src={persona.avatarUrl} alt={persona.name} className="persona-avatar" />
            <h3>{persona.name}</h3>
            <p>{persona.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PersonaDashboard;