import React from 'react';
import './ProfileSidebar.css';

const ProfileSidebar = () => {
  return (
    <div className="sidebar shadow-sm p-3 rounded bg-white">

      <ul className="list-unstyled sidebar-list">
        <li><a href="/">🏠 Dashboard</a></li>
        <li><a href="/profile">🙍‍♂️ My Profile</a></li>
        <li><a href="/settings">⚙️ Settings</a></li>
        <li><a href="/logout">🚪 Logout</a></li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
