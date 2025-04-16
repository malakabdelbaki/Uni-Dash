import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/restaurants/${restaurantId}/menu`);
        setMenu(res.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    const fetchRestaurantDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/restaurants");
        const found = res.data.find((r) => r._id === restaurantId);
        setRestaurant(found);
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      }
    };

    fetchMenu();
    fetchRestaurantDetails();
  }, [restaurantId]);

  return (
    <div className="p-6">
      {restaurant && (
        <div className="mb-6">
          <img src={restaurant.image || "/placeholder.jpg"} alt={restaurant.name} className="h-40 w-40 object-cover rounded-full mx-auto" />
          <h1 className="text-3xl font-semibold text-center mt-4">{restaurant.name}</h1>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <div className="space-y-4">
        {menu.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow flex items-center gap-4">
            <img
              src={item.image || "/placeholder_food.jpg"}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-base font-semibold mt-1">{item.price} egp</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;