import axios from 'axios';
import axiosInstance from './axiosInstance';
export const getRestaurantProfile = async () => {
  try {
    const response = await axiosInstance.get("profile/restaurant");
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant profile:', error);
    throw error;
  }
}; 