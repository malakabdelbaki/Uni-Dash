import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup'; // Add this import
import AuthProvider from './hooks/useAuth'; // Use default export
import OrdersPage from './pages/ViewOrders';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Add other routes later */}
          <Route path="/orders/restaurant/:restaurantId" element={<OrdersPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;