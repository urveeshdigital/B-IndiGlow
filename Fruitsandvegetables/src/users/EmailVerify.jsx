import React, { useState } from 'react';
import "./Users.css";
import MyImage from "../assets/images/form.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';  // ✅ Import js-cookie

const EmailVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Get token from cookies
      const token = Cookies.get('token');  

      const response = await axios.post(
        "http://192.168.29.136:8000/verifyRegister",
        { otp: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token in header
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status) {
        navigate("/login");
      } else {
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className='main'>
      <div className='left'>
        <img src={MyImage} alt="" />
      </div>

      <div className='right'>
        <div className="reg-form">

        <form onSubmit={handleSubmit}>
          <h1>Register Successfully</h1>
          <h3>First, verify your email. The OTP has been sent to your registered email.</h3>

          <label>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          {error && <div className="error">{error}</div>}

          <button type='submit'>Verify & Go To Login</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
