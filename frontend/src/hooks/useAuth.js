import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Change this to default export
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token logic here
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser({
      token: userData.token,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  };
  
  const logout = () => {
    localStorage.removeItem('token');
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