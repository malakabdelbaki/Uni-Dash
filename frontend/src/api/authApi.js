import axiosInstance from './axiosInstance';

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const registerUser = async (userData) => {
  try {
    console.log(userData);
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error); // Log the error for debugging
    throw error.response?.data?.message || 'Registration failed';
  }
};