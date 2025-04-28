import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup'; // Add this import
import AuthProvider from './hooks/useAuth'; // Use default export
import OrdersPage from './pages/ViewOrders';
import Restaurant from './pages/restraunt';
import Menu from './pages/menu';
import MyOrders from './pages/myOrders';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/orders/restaurant/:restaurantId" element={<OrdersPage />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;