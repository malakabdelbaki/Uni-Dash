import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordApi } from '../api/auth';

export const useResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError(null);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await resetPasswordApi(token, newPassword);
      navigate('/login', { state: { message: 'Password reset successfully' } });
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return {
    newPassword,
    confirmPassword,
    loading,
    error,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
}; 