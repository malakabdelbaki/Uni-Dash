import React from 'react';
import './Profile.css';

function ActionButtons() {
  return (
    <div className="action-buttons">
      <button className="btn btn-reset">Reset Password</button>
      <button className="btn btn-logout">Logout</button>
      <button className="btn btn-delete">Delete Account</button>
    </div>
  );
}

export default ActionButtons; 