import axios from 'axios';
import axiosInstance from './axiosInstance';

export const getStudentProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/profile/student");
    return response.data;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error;
  }
};

export const getRestaurantProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/profile/restaurant");
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant profile:', error);
    throw error;
  }
};