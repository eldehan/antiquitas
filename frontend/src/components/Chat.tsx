import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Paper, Box, Avatar, CircularProgress, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { chatWithPersona, getChatHistory, getPersonaById } from '../services/api';

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
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (personaId) {
      fetchPersona(personaId);
      fetchChatHistory(personaId);
    }
  }, [personaId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {persona && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar src={persona.avatarUrl} alt={persona.name} sx={{ width: 56, height: 56, mr: 2 }} />
          <Box>
            <Typography variant="h5" component="h2" sx={{ color: 'primary.main' }}>
              {persona.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {persona.description}
            </Typography>
          </Box>
        </Box>
      )}
      <Paper elevation={3} sx={{ height: '60vh', overflow: 'auto', p: 2, mb: 2 }}>
        {messages.map((message) => (
          <Box key={message._id} sx={{ mb: 2, textAlign: message.role === 'user' ? 'right' : 'left' }}>
            <Paper elevation={1} sx={{ display: 'inline-block', p: 1, maxWidth: '70%', backgroundColor: message.role === 'user' ? 'primary.light' : 'background.paper' }}>
              <Typography variant="body1">{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSend}
          sx={{ backgroundColor: 'primary.main', color: 'background.paper' }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;