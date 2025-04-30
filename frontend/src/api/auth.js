import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

export const forgetPasswordApi = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/users/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reset email');
  }
};

export const resetPasswordApi = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/users/reset-password/${token}`, {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
}; 