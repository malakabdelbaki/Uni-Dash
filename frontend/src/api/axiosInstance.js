import axios from 'axios';

// axiosInstance.js
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5050/api', // Keep this
  withCredentials: true, // Only if using cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Axios request interceptor, token:', token ? 'Token exists' : 'No token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Axios request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios response interceptor, status:', response.status);
    return response;
  },
  (error) => {
    console.error('Axios response interceptor error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      // Handle unauthorized (logout user, redirect, etc.)
      console.log('Unauthorized access, clearing token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;