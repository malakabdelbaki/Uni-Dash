import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import AuthProvider from './hooks/useAuth';
import OrdersPage from './pages/ViewOrders';
import Restaurant from './pages/Restaurant'; // <-- ✅ import Restaurant page
import Menu from './pages/Menu';
import Cart from "./pages/cart";

<Route path="/cart" element={<Cart />} />

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/orders/restaurant/:restaurantId" element={<OrdersPage />} />
          <Route path="/restaurants" element={<Restaurant />} /> {/* <-- ✅ add this */}
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
