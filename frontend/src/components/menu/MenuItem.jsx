import React, { useState } from "react";
import "./menu.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
const MenuItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const restaurantId = item.restaurantId
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "cart/cart",
        {
          menuItemId: item._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
     
      if (item) {
        // Get existing cart or create new one
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  
        const existingItemIndex = existingCart.findIndex(cartItem => cartItem._id === item._id);
  
        if (existingItemIndex !== -1) {
          existingCart[existingItemIndex].quantity += quantity;
        } else {
          existingCart.push({ ...item, quantity });
        }
  
        localStorage.setItem("cart", JSON.stringify(existingCart));
  
        console.log("Cart Updated:", existingCart);
        alert(`${item.name} added to cart`);
      }
  
      setQuantity(1);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error?.message || "Failed to add item to cart.");
    }
  };

  return (
    <div className="menu-card">
      {item.image ? (
        <img src={item.image} alt={item.name} className="menu-image" />
      ) : (
        <div className="restaurant-placeholder-logo">{item.name}</div>
      )}
  
      <div className="menu-content">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <p className="menu-item-price">{item.price} EGP</p>
      </div>
  
      <div className="menu-card-actions">
        <div className="quantity-controls">
          <button
            className="quantity-button"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <div className="quantity-number">{quantity}</div>
          <button
            className="quantity-button"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
  
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <button
  className="floating-cart-button"
  onClick={() => navigate("/cart", { state: { restaurantId } })}> 
  Cart
</button>
    </div>
  );
};
export default MenuItem;