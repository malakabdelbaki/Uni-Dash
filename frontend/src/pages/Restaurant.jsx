// src/pages/Restaurant.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/restaurants");
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleClick = (restaurant) => {
    navigate(`/menu/${restaurant._id}`, {
      state: {
        restaurantName: restaurant.name,
        restaurantImage: restaurant.image,
      },
    });
  };

  return (
    <>
      <style>
        {`
          .container {
            min-height: 100vh;
            background-color: #f9fafb;
            padding: 40px 20px;
          }
          .title {
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 40px;
            background-color: #fef3c7;
            padding: 20px;
            border-radius: 12px;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          }
          .card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          .card h2 {
            font-size: 20px;
            font-weight: bold;
            margin: 16px 0;
            color: #333;
          }
        `}
      </style>

      <div className="container">
        <h1 className="title">Available Restaurants</h1>

        <div className="grid">
          {restaurants.map((rest) => (
            <div
              key={rest._id}
              className="card"
              onClick={() => handleClick(rest)}
            >
              <img
                src={rest.image || "/placeholder.jpg"}
                alt={rest.name}
              />
              <h2>{rest.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurant;
