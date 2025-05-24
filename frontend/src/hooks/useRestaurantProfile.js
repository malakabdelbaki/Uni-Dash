import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from './useAuth';

export const useRestaurantProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for user:', user); // Debug log
        setLoading(true);
        
        if (!user) {
          setError('No user found');
          setLoading(false);
          return;
        }

        // First check if user is a restaurant owner
        if (user.role !== 'restaurant_owner') {
          setError('User is not a restaurant owner');
          setLoading(false);
          return;
        }

        console.log('Making API request...'); // Debug log
        const response = await axiosInstance.get('/profile/restaurant');
        console.log('API Response:', response.data); // Debug log

        if (!response.data) {
          setError('No restaurant found for this user');
          setLoading(false);
          return;
        }
        
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching restaurant profile:', err);
        setError(err.response?.data?.message || 'Could not load restaurant profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { data, loading, error };
}; 