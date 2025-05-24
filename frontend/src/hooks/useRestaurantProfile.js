import { useState, useEffect } from 'react';
import { getRestaurantProfile } from '../api/studentProfile';

export const useRestaurantProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await getRestaurantProfile();
        setData(profileData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { data, loading, error };
}; 