import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Change this to default export
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('Initializing auth state:', { token, userData });
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Setting user from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData) => {
    console.log('Login called with:', userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  
  const logout = () => {
    console.log('Logout called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

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