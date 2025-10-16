import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://test1-navy-omega.vercel.app/';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const casesAPI = {
  create: (caseData) => api.post('/cases', caseData),
  getMyCases: () => api.get('/cases/my-cases'),
  getById: (id) => api.get(`/cases/${id}`),
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
};

export const purchaseAPI = {
  createOrder: (orderData) => api.post('/purchase/commande', orderData),
  processPayment: (paymentData) => api.post('/purchase/paiement', paymentData),
};

export default api;
