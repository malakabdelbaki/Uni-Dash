// src/pages/Cart.jsx

import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Read cart from localStorage when the page loads
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={{ marginBottom: "20px" }}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price} EGP</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
