import React from 'react';
import './Profile.css';
function ProfileField({ label, value, icon }) {
  const renderIcon = () => {
    switch (icon) {
      case "user":
        return (
          <svg className="field-icon" viewBox="0 0 24 24">
            <path d="M12 12C14.8 12 17 9.8 17 7s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5Z" stroke="currentColor" strokeWidth="2" />
            <path d="M12 14.5C7 14.5 3 17.4 3 21c0 .6.4 1 1 1h16c.6 0 1-.4 1-1 0-3.6-4-6.5-9-6.5Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case "email":
        return (
          <svg className="field-icon" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="2" />
            <path d="M22 6 12 13 2 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case "phone":
        return (
          <svg className="field-icon" viewBox="0 0 24 24">
            <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.1 0-.2 0-.3.1L13.2 17.4c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1.1-.3-1.1-.5-2.4-.5-3.6 0-.5-.5-1-1-1H4c-.5 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.5-.5-1-1-1Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case "account":
        return (
          <svg className="field-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm0 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3Zm0 14.2c-2.5 0-4.7-1.3-6-3.2.1-2 4-3.1 6-3.1s5.9 1.1 6 3.1c-1.3 1.9-3.5 3.2-6 3.2Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      default:
        return null;
    }
  };

  return (
    <div className="profile-field">
      <label className="field-label">{label}</label>
      <div className="field-input-container">
        {renderIcon()}
        <input type="text" className="field-input" value={value || ""} readOnly />
      </div>
    </div>
  );
}

export default ProfileField; 