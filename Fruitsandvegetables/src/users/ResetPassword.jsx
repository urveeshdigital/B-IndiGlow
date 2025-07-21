import React, { useState } from 'react';
import "./Users.css";
import MyImage from "../assets/images/form.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post("http://192.168.29.136:8000/reset", {
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      console.log(response.data);
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='main'>
      <div className='left'>
        <img src={MyImage} alt="" />
      </div>
      <div className='right'>
        <div className="reg-form">

        <form onSubmit={handleReset}>
          <h1>Reset Password</h1>

          <label>New Password</label>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <div className="error">{error}</div>}

          <button type='submit'>Reset Password</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
