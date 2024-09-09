import React from 'react';
import { Link } from 'react-router-dom';
import { personas } from '../data/personaData';
import '../styles/PersonaDashboard.css';

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
