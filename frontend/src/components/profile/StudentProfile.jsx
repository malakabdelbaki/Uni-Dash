import React from "react";
import { useStudentProfile } from "../../hooks/useStudentProfile";
import ProfileField from "./ProfileField";
import ActionButtons from "./ActionButtons";
import './Profile.css';
import Header from "../Header";
function StudentProfile() {
  const { data, loading, error } = useStudentProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

export default StudentProfile; 