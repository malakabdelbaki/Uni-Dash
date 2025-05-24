import { createContext, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const login = async (userData) => {
    try {
      const response = await axiosInstance.get('/users/me');
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;