import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

// Change this to default export
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to get user data from the server
        const response = await axiosInstance.get('/users/me');
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (userData) => {
    try {
      // The token will be automatically handled by the browser as a cookie
      setUser(userData);
      // Fetch fresh user data after login
      const response = await axiosInstance.get('/users/me');
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Keep this as named export
export const useAuth = () => useContext(AuthContext);
// Add default export
export default AuthProvider;