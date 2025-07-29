// ProfileLayout.jsx
import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import './profilepage.css'; // Reuse your existing layout styles

const ProfileLayout = ({ children, onLogout }) => {
  return (
    <div className="main">
      <ProfileSidebar onLogout={onLogout} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
