import axios from "axios";

const API_URL = "http://localhost:5050/api";

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${API_URL}/restaurants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const fetchRestaurantById = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/restaurants`);
    const restaurants = response.data;
    const restaurant = restaurants.find((r) => r._id === restaurantId);
    return restaurant;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
};

export const fetchMenuByRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/restaurants/${restaurantId}/menu`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};
