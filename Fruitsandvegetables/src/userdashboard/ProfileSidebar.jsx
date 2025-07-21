import React from 'react';
import './ProfileSidebar.css';

const ProfileSidebar = () => {
  return (
    <div className="sidebar shadow p-3 rounded bg-white">
      <h5>Quick Links</h5>
      <ul className="list-unstyled">
        <li><a href="/">Dashboard</a></li>
        <li><a href="/profile">My Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
