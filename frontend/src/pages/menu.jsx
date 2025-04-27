// src/pages/Menu.jsx

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const { restaurantId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantName, restaurantImage } = location.state || {};
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/restaurants/${restaurantId}/menu`);
        setMenuItems(res.data);

        const initialQuantities = {};
        res.data.forEach(item => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);

      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, prev[itemId] + change),
    }));
  };

  const handleAddToCart = (itemId) => {
    const item = menuItems.find(item => item._id === itemId);
    const quantity = quantities[itemId];

    if (item) {
      // Get existing cart or create new one
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItemIndex = existingCart.findIndex(cartItem => cartItem._id === itemId);

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push({ ...item, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

      console.log("Cart Updated:", existingCart);
      alert(`${item.name} added to cart!`);
    }
  };

  return (
    <>
      <style>
        {`
          .menu-container {
            min-height: 100vh;
            background-color: #f9fafb;
            padding: 20px;
            position: relative;
          }
          .header {
            background-color: #fef3c7;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
          }
          .header img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 10px;
          }
          .header h1 {
            font-size: 28px;
            font-weight: bold;
            color: #333;
          }
          .menu-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .menu-item {
            background: white;
            border: 1px solid #ddd;
            border-radius: 12px;
            display: flex;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .menu-item img {
            width: 150px;
            height: 150px;
            object-fit: cover;
          }
          .menu-details {
            padding: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .menu-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #111;
          }
          .menu-description {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
          }
          .menu-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
          }
          .price {
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .quantity-button {
            background-color: #f59e0b;
            color: white;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
          }
          .quantity-button:hover {
            background-color: #d97706;
          }
          .quantity-number {
            font-size: 16px;
            font-weight: bold;
            width: 20px;
            text-align: center;
          }
          .add-to-cart-button {
            background-color: #d97706;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .add-to-cart-button:hover {
            background-color: #b45309;
          }
          .floating-cart-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #f59e0b;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: background-color 0.3s;
            z-index: 1000;
          }
          .floating-cart-button:hover {
            background-color: #d97706;
          }
        `}
      </style>

      <div className="menu-container">
        <div className="header">
          <img src={restaurantImage || "/placeholder.jpg"} alt="Restaurant Logo" />
          <h1>{restaurantName || "Restaurant Menu"}</h1>
        </div>

        <div className="menu-list">
          {menuItems.map((item) => (
            <div className="menu-item" key={item._id}>
              <img src={item.image || "/placeholder.jpg"} alt={item.name} />
              <div className="menu-details">
                <div>
                  <div className="menu-title">{item.name}</div>
                  <div className="menu-description">{item.description}</div>
                </div>

                <div className="menu-bottom">
                  <div className="price">{item.price} EGP</div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    >
                      -
                    </button>
                    <div className="quantity-number">{quantities[item._id]}</div>
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(item._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Cart Button */}
        <button
          className="floating-cart-button"
          onClick={() => navigate("/cart")}
        >
          Cart
        </button>
      </div>
    </>
  );
};

export default Menu;
