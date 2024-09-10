import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import PersonaDashboard from './components/PersonaDashboard';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Historical Persona Chat</h1>
          <nav>
            {isAuthenticated ? (
              <>
                <a href="/dashboard">Personas</a>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            )}
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <PersonaDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/chat/:personaId"
              element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
            />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 Historical Persona Chat. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;