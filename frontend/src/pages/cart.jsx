// src/pages/Cart.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const restaurantId = location.state?.restaurantId; // get restaurantId passed from Menu

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === itemId) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmitOrder = () => {
    alert("Order submitted successfully!");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>My Cart</h1>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Cart Items Section */}
        <div style={{ flex: 2 }}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "20px",
                minWidth: "350px"
              }}>
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginRight: "20px"
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => handleQuantityChange(item._id, -1)} style={{
                    border: "none",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    fontSize: "18px",
                    cursor: "pointer"
                  }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, 1)} style={{
                    border: "none",
                    backgroundColor: "#d4a017",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "white"
                  }}>+</button>
                </div>
                <div style={{ marginLeft: "20px", fontWeight: "bold" }}>{item.price} egp</div>
                <button onClick={() => handleRemoveItem(item._id)} style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "red",
                  marginLeft: "15px",
                  cursor: "pointer",
                  fontSize: "20px"
                }}>
                  🗑️
                </button>
              </div>
            ))
          )}
          {/* Add more items link */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => navigate(restaurantId ? `/menu/${restaurantId}` : "/")}
              style={{
                backgroundColor: "transparent",
                color: "red",
                border: "none",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              &lt; Add more items
            </button>
          </div>
        </div>

        {/* Cart Summary Section */}
        <div style={{
          flex: 1,
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "white",
          height: "fit-content",
          minWidth: "300px"
        }}>
          <h2 style={{ marginBottom: "10px" }}>Subtotal</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{subtotal} egp</p>
          <p style={{ marginTop: "10px" }}>Wait time</p>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>20min</p>
          <button
            onClick={handleSubmitOrder}
            style={{
              marginTop: "20px",
              backgroundColor: "#d4a017",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Submit order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
