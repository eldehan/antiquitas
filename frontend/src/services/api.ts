import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response.data.tokenExpired && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        processQueue(new Error('No refresh token available'));
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
        processQueue(null, data.accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const response = await axiosInstance.post('/auth/change-password', { currentPassword, newPassword });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  setAuthToken(response.data.accessToken);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  setAuthToken(null);
};

export const register = async (username: string, email: string, password: string) => {
  const response = await axiosInstance.post('/auth/register', { username, email, password });
  return response.data;
};

export const getAllPersonas = async () => {
  const response = await axiosInstance.get('/personas');
  return response.data;
};

export const getPersonaById = async (id: string) => {
  const response = await axiosInstance.get(`/personas/${id}`);
  return response.data;
};

export const chatWithPersona = async (personaId: string, message: string) => {
  const response = await axiosInstance.post('/chat/chat', { personaId, message });
  return response.data;
};

export const getChatHistory = async (personaId: string) => {
  const response = await axiosInstance.get(`/chat/history/${personaId}`);
  return response.data;
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const token = localStorage.getItem('token');
setAuthToken(token);