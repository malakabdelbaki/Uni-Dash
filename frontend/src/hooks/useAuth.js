import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { loginUser } from '../api/authApi'; // Import the existing loginUser function

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for existing session on mount/refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/users/me');
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        // Don't log error for auth check - it's normal when not logged in
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // Use the existing loginUser function from authApi
      const loginResponse = await loginUser(credentials);
      
      if (loginResponse) {
        // Get fresh user data after login
        const userResponse = await axiosInstance.get('/users/me');
        if (userResponse.data) {
          setUser(userResponse.data);
          return userResponse.data;
        }
      }
    } catch (error) {
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      setUser(null);
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear user state on logout attempt
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
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