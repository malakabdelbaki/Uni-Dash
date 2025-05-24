import React from "react";
import { useRestaurantProfile } from "../../hooks/useRestaurantProfile";
import ProfileField from "./ProfileField";
import ActionButtons from "./ActionButtons";
import './Profile.css';
import { useAuth } from "../../hooks/useAuth";
import Header from "../Header";
import { FaUser, FaEnvelope, FaPhone, FaUserTag } from 'react-icons/fa';

function RestaurantProfile() {
  const { data, loading, error } = useRestaurantProfile();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profile-container">
        <Header />
        <div>Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Header />
      <div className="welcome-banner">
        <div className="avatar-container">
          <div className="avatar">
            <FaUser size={40} color="#1F2937" />
          </div>
        </div>
        <h1 className="welcome-text">Welcome, {user.name}</h1>
      </div>

      <div className="profile-content">
        <div className="profile-fields">
          <div className="field-row">
            <ProfileField
              icon={<FaUser className="field-icon" />}
              label="Name"
              value={user.name}
            />
            <ProfileField
              icon={<FaEnvelope className="field-icon" />}
              label="Email"
              value={user.email}
            />
          </div>
          <div className="field-row">
            <ProfileField
              icon={<FaPhone className="field-icon" />}
              label="Phone"
              value={user.phone || 'Not provided'}
            />
            <ProfileField
              icon={<FaUserTag className="field-icon" />}
              label="Account Type"
              value={user.role || 'Restaurant Owner'}
            />
          </div>
        </div>
        
        <div className="action-buttons-container">
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}

export default RestaurantProfile; 