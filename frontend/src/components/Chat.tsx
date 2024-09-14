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
  contextualExplanations?: { [key: string]: string };
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
  const [selectedExplanation, setSelectedExplanation] = useState<string | null>(null);
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
        const aiMessage: Message = {
          _id: (Date.now() + 1).toString(),
          role: 'ai',
          content: response.response,
          timestamp: new Date().toISOString(),
          contextualExplanations: response.contextualExplanations
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.role === 'user' || !message.contextualExplanations) {
      return <span>{message.content}</span>;
    }

    const explanations = message.contextualExplanations;
    let content = message.content;

    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    Object.keys(explanations).forEach(key => {
      let found = false; // Track if the key has already been found
      const regex = new RegExp(`(${key})(?![^<]*>)`, 'gi');
      const escapedExplanation = escapeHtml(explanations[key]);

      content = content.replace(regex, (match) => {
        if (!found) {
          found = true; // Set found to true after first replacement
          return `<span class="context-word" data-explanation="${escapedExplanation}" style="text-decoration: underline; cursor: pointer;">${match}</span>`;
        }
        return match; // Return the match unaltered if already found
      });
    });

    return (
      <span
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('context-word')) {
            setSelectedExplanation(target.dataset.explanation || null);
          }
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {persona && (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
          {/* Avatar Section */}
          <Box sx={{ mr: 3 }}>
            <Avatar
              src={persona.avatarUrl}
              alt={persona.name}
              sx={{ width: 150, height: 150, mb: 0 }}
              variant="rounded"
            />
          </Box>

          {/* Text Section (Name and Description) */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3" // Larger size for name
              component="h2"
              sx={{
                mb: 1,
                borderBottom: '2px solid white',
                pb: 0.5
              }}
            >
              {persona.name}
            </Typography>
            <Typography variant="body1">
              {persona.description}
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        {/* Main Chat Window */}
        <Box sx={{ flexGrow: 1, width: { xs: '100%', md: '70%' } }}>
          <Paper elevation={3} sx={{ height: '60vh', overflow: 'auto', p: 2, mb: 2 }}>
            {messages.map((message) => (
              <Box key={message._id} sx={{ mb: 2, textAlign: message.role === 'user' ? 'right' : 'left' }}>
                <Paper elevation={1} sx={{ display: 'inline-block', p: 1, maxWidth: '70%', backgroundColor: message.role === 'user' ? 'primary.light' : 'background.paper' }}>
                  <Typography variant="body1">{renderMessageContent(message)}</Typography>
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
        </Box>

        {/* Historical Context */}
        <Paper elevation={3} sx={{ width: { xs: '100%', md: '30%' }, height: '70vh', overflow: 'auto', p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Historical Context
          </Typography>
          {selectedExplanation ? (
            <Typography variant="body1">{selectedExplanation}</Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Click on underlined words in the chat to see historical explanations.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Chat;
