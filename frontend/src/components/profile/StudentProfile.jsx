import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import ProfileField from './ProfileField';
import { FaUser, FaEnvelope, FaPhone, FaUserTag } from 'react-icons/fa';
import './Profile.css';
import Header from "../Header";

const StudentProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Header />
      <div className="welcome-banner">
        <div className="avatar-container">
          <div className="avatar">
            <svg viewBox="0 0 24 24" fill="#1F2937">
              <path d="M12 12C14.8 12 17 9.8 17 7S14.8 2 12 2 7 4.2 7 7s2.2 5 5 5Z"/>
              <path d="M12 14.5C7 14.5 3 17.4 3 21c0 .6.4 1 1 1h16c.6 0 1-.4 1-1 0-3.6-4-6.5-9-6.5Z"/>
            </svg>
          </div>
        </div>
        <h1 className="welcome-text">Welcome, {user.name}</h1>
      </div>

      <div className="profile-content">
        <div className="profile-fields">
          <div className="field-row">
            <ProfileField
              icon={<FaUser className="text-blue-500" />}
              label="Name"
              value={user.name}
            />
            <ProfileField
              icon={<FaEnvelope className="text-blue-500" />}
              label="Email"
              value={user.email}
            />
          </div>
          <div className="field-row">
            <ProfileField
              icon={<FaPhone className="text-blue-500" />}
              label="Phone"
              value={user.phone || 'Not provided'}
            />
          </div>
          <div className="field-row">
            <ProfileField
              icon={<FaUserTag className="text-blue-500" />}
              label="Account Type"
              value={user.role}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 