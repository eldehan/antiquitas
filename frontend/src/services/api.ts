import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const chatWithPersona = async (personaId: string, message: string) => {
  const headers = getAuthHeader();
  console.log('Sending chat request with headers:', headers);
  try {
    const response = await axios.post(`${API_URL}/chat/chat`, { personaId, message }, { headers });
    console.log('Chat response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in chatWithPersona:', error);
    throw error;
  }
};

export const getChatHistory = async (personaId: string) => {
  const headers = getAuthHeader();
  const response = await axios.get(`${API_URL}/chat/history/${personaId}`, { headers });
  return response.data;
};

export const getAllPersonas = async () => {
  const response = await axios.get(`${API_URL}/personas`, { headers: getAuthHeader() });
  return response.data;
};

export const getPersonaById = async (id: string) => {
  const response = await axios.get(`${API_URL}/personas/${id}`, { headers: getAuthHeader() });
  return response.data;
};