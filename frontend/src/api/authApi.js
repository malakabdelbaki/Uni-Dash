import axiosInstance from './axiosInstance';

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/users/login', credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
    throw error.response?.data?.message || 'Login failed';
  }
};

export const registerUser = async (userData) => {
  try {
    console.log('Registering user:', userData);
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error);
    throw error.response?.data?.message || 'Registration failed';
  }
};