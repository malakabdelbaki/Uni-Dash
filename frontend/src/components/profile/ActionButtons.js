import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axiosInstance from '../../api/axiosInstance';
import { FaKey, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import './Profile.css';

function ActionButtons() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleResetPassword = () => {
    navigate('/forgot-password');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?._id) {
      console.error('No user ID found');
      return;
    }

    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await axiosInstance.delete(`/users/${user._id}`);
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Delete account failed:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  console.log('Current user:', user);

  return (
    <div className="action-buttons">
      <button 
        className="btn btn-reset" 
        onClick={handleResetPassword}
      >
        <FaKey className="button-icon" />
        Reset Password
      </button>
      
      <button 
        className="btn btn-logout" 
        onClick={handleLogout}
      >
        <FaSignOutAlt className="button-icon" />
        Logout
      </button>
      
      <button 
        className="btn btn-delete" 
        onClick={handleDeleteAccount}
        disabled={isDeleting || !user?._id}
      >
        <FaTrash className="button-icon" />
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
}

export default ActionButtons; 