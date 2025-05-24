import axios from 'axios';

// axiosInstance.js
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5050/api', // Keep this
  withCredentials: true, // Only if using cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Add specific cookie handling
  withXSRFToken: true
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  // No need to manually add token as it's handled by cookies
  return config;
}, (error) => {
  console.error('Axios request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to login if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;