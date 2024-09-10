import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/HomePage.css';

interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="home-page">
      <h1>Welcome to Historical Persona Chat</h1>
      <p>Step into the past and converse with history's most fascinating figures!</p>
      <div className="feature-grid">
        <div className="feature">
          <img src="/path-to-image1.jpg" alt="Historical figure" />
          <h3>Chat with Historical Figures</h3>
          <p>Engage in conversations with famous personalities from the past.</p>
        </div>
        <div className="feature">
          <img src="/path-to-image2.jpg" alt="AI technology" />
          <h3>Powered by AI</h3>
          <p>Experience intelligent responses crafted by advanced AI technology.</p>
        </div>
        <div className="feature">
          <img src="/path-to-image3.jpg" alt="Learning" />
          <h3>Learn History Interactively</h3>
          <p>Gain insights into historical events and perspectives through dialogue.</p>
        </div>
      </div>
      <div className="cta">
        <Link to="/login" className="cta-button">Get Started</Link>
      </div>
    </div>
  );
};

export default HomePage;