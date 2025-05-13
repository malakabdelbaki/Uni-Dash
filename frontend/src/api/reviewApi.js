import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:5050/api";

export const getReviewsByRestaurant = async (restaurantId, page, limit) => {
  try {
    console.log("Fetching reviews for restaurant:", restaurantId);
    const response = await axiosInstance.get(`${API_URL}/restaurants/${restaurantId}/reviews?page=${page}&limit=${limit}`);
    console.log("Response from API:", response);
    if (!response.data) {
      throw new Error("No data received");
    }
    console.log("Reviews data:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}