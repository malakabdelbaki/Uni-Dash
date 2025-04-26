import { useState, useEffect } from "react";
import { fetchMenuByRestaurant, fetchRestaurantById } from "../api/restaurantApi";

export const useMenu = (restaurantId) => {
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMenuAndRestaurant = async () => {
      if (!restaurantId) return;
      
      try {
        setLoading(true);
        
        // Fetch menu and restaurant details in parallel
        const [menuData, restaurantData] = await Promise.all([
          fetchMenuByRestaurant(restaurantId),
          fetchRestaurantById(restaurantId)
        ]);
        
        setMenu(menuData);
        setRestaurant(restaurantData);
        setError(null);
      } catch (err) {
        console.error("Error in useMenu hook:", err);
        setError("Failed to fetch menu or restaurant details");
      } finally {
        setLoading(false);
      }
    };

    getMenuAndRestaurant();
  }, [restaurantId]);

  return { menu, restaurant, loading, error };
}; 