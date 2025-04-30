import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import AuthProvider from './hooks/useAuth';
import OrdersPage from './pages/ViewOrders';
import Restaurant from './pages/restraunt';
import Menu from './pages/menu';
import MyOrders from './pages/myOrders';
import ForgotPassword from './pages/forgot-password';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/restaurants/:restaurantId" element={<Restaurant />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/orders/restaurant/:restaurantId" element={<OrdersPage />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/:token" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;