import React from 'react';
import './Sidebar.css';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
          >
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/users" 
            className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
          >
            <FaUser /> Users
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
          >
            <FaCog /> Settings
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/logout" 
            className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
