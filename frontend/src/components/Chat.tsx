import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { chatWithPersona, getChatHistory, getPersonaById } from '../services/api';
import '../styles/Chat.css';

interface Message {
  _id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface Persona {
  _id: string;
  name: string;
  description: string;
  avatarUrl: string;
  context: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { personaId } = useParams<{ personaId: string }>();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (personaId) {
      fetchPersona(personaId);
      fetchChatHistory(personaId);
    }
  }, [personaId]);

  const fetchPersona = async (id: string) => {
    try {
      const fetchedPersona = await getPersonaById(id);
      setPersona(fetchedPersona);
    } catch (error) {
      console.error('Error fetching persona:', error);
    }
  };

  const fetchChatHistory = async (id: string) => {
    setIsLoading(true);
    try {
      const history = await getChatHistory(id);
      setMessages(history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim() && persona) {
      const userMessage: Message = { _id: Date.now().toString(), role: 'user', content: input, timestamp: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      try {
        const response = await chatWithPersona(persona._id, input);
        const aiMessage: Message = { _id: (Date.now() + 1).toString(), role: 'ai', content: response.response, timestamp: new Date().toISOString() };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (isLoading || !persona) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={persona.avatarUrl} alt={persona.name} className="persona-avatar" />
        <h2>Chat with {persona.name}</h2>
        <p>{persona.description}</p>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message._id} className={`message ${message.role}`}>
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