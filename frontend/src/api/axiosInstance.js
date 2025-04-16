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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (logout user, redirect, etc.)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;