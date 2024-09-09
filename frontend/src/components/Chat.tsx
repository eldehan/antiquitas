import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { chatWithPersona } from '../services/api';
import { personas, Persona } from '../data/personaData';
import '../styles/Chat.css';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { personaId } = useParams<{ personaId: string }>();
  const [persona, setPersona] = useState<Persona | undefined>(undefined);

  useEffect(() => {
    const selectedPersona = personas.find(p => p.id === personaId);
    setPersona(selectedPersona);
    if (selectedPersona) {
      setMessages([{ role: 'ai', content: `Hello, I am ${selectedPersona.name}. How may I assist you?` }]);
    }
  }, [personaId]);

  const handleSend = async () => {
    if (input.trim() && persona) {
      const userMessage: Message = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      try {
        const response = await chatWithPersona(persona.name, persona.context, input);
        const aiMessage: Message = { role: 'ai', content: response.response };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  if (!persona) {
    return <div>Persona not found</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={persona.avatarUrl} alt={persona.name} className="persona-avatar" />
        <h2>Chat with {persona.name}</h2>
        <p>{persona.description}</p>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;