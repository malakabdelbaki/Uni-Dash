import React from 'react';
import './Profile.css';

function ProfileField({ label, value, icon }) {
  return (
    <div className="profile-field">
      <label className="field-label">{label}</label>
      <div className="field-input-container">
        <span className="field-icon-wrapper">
          {icon}
        </span>
        <input 
          type="text" 
          className="field-input" 
          value={value || ""} 
          readOnly 
        />
      </div>
    </div>
  );
}

export default ProfileField; 