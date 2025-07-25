import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSidebar.css';
const ProfileSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-sidebar">
      <h2>My Account</h2>
      <ul>
        <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
        <li onClick={() => navigate('/order')}>Orders</li>
        <li onClick={() => navigate('/wishlist')}>Wishlist</li>
        <li onClick={() => navigate('/paymentmethod')}>Payment Method</li>
        <li>Change Password</li>
        <li>Help & Support</li>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
