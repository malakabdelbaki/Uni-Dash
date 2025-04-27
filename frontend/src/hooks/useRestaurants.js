import { useState, useEffect } from "react";
import { fetchRestaurants } from "../api/restaurantApi";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setLoading(true);
        const data = await fetchRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (error) {
        console.error("Error in useRestaurants hook:", error);
        setError("Failed to fetch restaurants");
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, []);

  return { restaurants, loading, error };
}; 