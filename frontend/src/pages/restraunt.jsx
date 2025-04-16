// Restaurant.jsx
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

  const handleClick = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Available Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map((rest) => (
          <div
            key={rest._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleClick(rest._id)}
          >
            <img
              src={rest.image || "/placeholder.jpg"}
              alt={rest.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-bold">{rest.name}</h2>
            <p className="text-sm text-gray-600">{rest.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
