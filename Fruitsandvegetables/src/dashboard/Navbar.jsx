import React from 'react';
import './NavbarAdmin.css'
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token'); // or whatever your token cookie is named

      await axios.post('http://192.168.29.136:8000/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Cookies.remove('token'); // remove token from cookies
      navigate('/login'); // navigate to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar">
      <h2>Admin Dashboard</h2>
      <ul className="nav-menu">
        <li><FaHome /> Home</li>
        <li><FaUser /> Users</li>
        <li><FaCog /> Settings</li>
        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
