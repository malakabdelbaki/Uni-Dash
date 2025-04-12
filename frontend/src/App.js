import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup'; // Add this import
import AuthProvider from './hooks/useAuth'; // Use default export

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Add other routes later */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;