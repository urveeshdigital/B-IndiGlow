import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileSidebar.css';

const ProfileSidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="profile-sidebar">
      <h2>My Account</h2>
      <ul>
        <li className={isActive('/profileview')} onClick={() => navigate('/profileview')}>Overview</li>
        <li className={isActive('/order')} onClick={() => navigate('/order')}>Orders</li>
        <li className={isActive('/wishlist')} onClick={() => navigate('/wishlist')}>Wishlist</li>
        <li className={isActive('/paymentmethod')} onClick={() => navigate('/paymentmethod')}>Payment Method</li>
        <li className={isActive('/changepassword')} onClick={() => navigate('/changepassword')}>Change Password</li>
        <li className={isActive('/help')} onClick={() => navigate('/help')}>Help & Support</li>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
