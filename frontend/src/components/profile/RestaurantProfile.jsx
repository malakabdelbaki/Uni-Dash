import React from "react";
import { useRestaurantProfile } from "../../hooks/useRestaurantProfile";
import ProfileField from "./ProfileField";
import ActionButtons from "./ActionButtons";
import './Profile.css';
function RestaurantProfile() {
  const { data, loading, error } = useRestaurantProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <div className="welcome-banner">
        <div className="restaurant-logo-container">
          <img src={data.logo || "/placeholder.svg"} alt={`${data.name} logo`} className="restaurant-logo" />
        </div>
        <h1 className="welcome-text">Welcome, {data.name}</h1>
      </div>

      <div className="profile-content">
        <div className="profile-fields">
          <div className="field-row">
            <ProfileField label="Username" value={data.username} icon="user" />
            <ProfileField label="Email Address" value={data.email} icon="email" />
          </div>
          <div className="field-row">
            <ProfileField label="Phone Number" value={data.phone} icon="phone" />
            <ProfileField label="Account Type" value={data.accountType} icon="account" />
          </div>
        </div>
        <ActionButtons />
      </div>
    </div>
  );
}

export default RestaurantProfile; 