import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPersonas } from '../services/api';
import '../styles/PersonaDashboard.css';

interface Persona {
  _id: string;
  name: string;
  description: string;
  avatarUrl: string;
}

const PersonaDashboard: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const fetchedPersonas = await getAllPersonas();
      setPersonas(fetchedPersonas);
    } catch (error) {
      console.error('Error fetching personas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading personas...</div>;
  }

  return (
    <div className="persona-dashboard">
      <h2>Choose a Historical Persona to Chat With</h2>
      <div className="persona-grid">
        {personas.map((persona) => (
          <Link to={`/chat/${persona._id}`} key={persona._id} className="persona-card">
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