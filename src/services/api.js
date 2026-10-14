import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://the-lens-hut-backend-freelance.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('thelenshut_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to unwrap data and normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.data) {
      return Promise.resolve(error.response.data);
    }
    return Promise.resolve({
      success: false,
      message: error.message || 'Network error: Server is unreachable',
      errorCode: 'NETWORK_ERROR',
    });
  }
);

export { api };
export default api;
