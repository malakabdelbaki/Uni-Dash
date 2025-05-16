import axios from 'axios';
import axiosInstance from './axiosInstance';
export const getStudentProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile/student");
    return response.data;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error;
  }
}; 