
import React, { useEffect, useState } from 'react';
import "../userdashboard/Navbar.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaUserCircle, FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    console.log("hello")
    setShowDropdown(!showDropdown);
    console.log("hey..")
  };

  const handleProfile = () => {
    navigate('/profileview');
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>B-IndiGlow</h2>
      </div>

      <div className="navbar-center">
        <NavLink to="/dashboard" className="nav-link" activeclassname="active-link">
          <FaHome /> Home
        </NavLink>
        <NavLink to="/about" className="nav-link" activeclassname="active-link">
          <FaHome /> About Us
        </NavLink>
        <NavLink to="/contact" className="nav-link" activeclassname="active-link">
          <FaHome /> Contact Us
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/products" className="nav-link" activeclassname="active-link">
            <FaHome /> Products
          </NavLink>
        )}
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="dropdown__">
            <FaUserCircle size={24} className="dropdown-icon__" onClick={toggleDropdown} />

            {showDropdown && (
              <div className="dropdown-menu__">
                <button onClick={handleProfile}><FaUser /> Profile</button>
                <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="logout-btn" onClick={handleLogin}>
              <FaSignInAlt /> Login
            </button>
            <button className="logout-btn" onClick={handleRegister}>
              <FaUserPlus /> Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
