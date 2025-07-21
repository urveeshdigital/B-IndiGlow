import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ChangePassword.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      setMessage("New Password and Confirm Password do not match.");
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      setMessage("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.patch('http://192.168.29.136:8000/userprofile',
        {
          current_password: formData.current_password,
          new_password: formData.new_password,
          confirm_password: formData.confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage('Password changed successfully.');
        setFormData({ current_password: '', new_password: '', confirm_password: '' });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.detail || "Error changing password. Please try again."
      );
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Change Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
