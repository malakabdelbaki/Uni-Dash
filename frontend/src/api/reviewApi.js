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

export const likeReview = async (reviewId) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Review ID to like:", reviewId);
    const response = await axiosInstance.post(
      `${API_URL}/reviews/like/${reviewId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from liking review:", response);
    return response.data;
  } catch (error) {
    console.error("Error liking review:", error);
    throw error;
  }
}

export const dislikeReview = async (reviewId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(
      `${API_URL}/reviews/dislike/${reviewId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from disliking review:", response);
    return response.data;
  } catch (error) {
    console.error("Error disliking review:", error);
    throw error;
  }
}

export const isAlreadyLiked = async (reviewId) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Review ID to check if already liked:", reviewId);
    const response = await axiosInstance.get(
      `${API_URL}/reviews/like/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from checking if review is already liked:", response);
    return response.data;
  } catch (error) {
    console.error("Error checking if review is already liked:", error);
    throw error;
  }
}

export const isAlreadyDisliked = async (reviewId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(
      `${API_URL}/reviews/dislike/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from checking if review is already disliked:", response);
    return response.data;
  } catch (error) {
    console.error("Error checking if review is already disliked:", error);
    throw error;
  }
}
