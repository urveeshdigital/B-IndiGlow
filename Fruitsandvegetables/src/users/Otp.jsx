import React, { useState } from 'react';
import "./Users.css";
import MyImage from "../assets/images/form.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const User = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("Please enter OTP");
      toast.error("Please enter OTP");
      return;
    }

    try {
      const token = Cookies.get("resetToken"); // ✅ get token from cookies
alert(token)
      const response = await axios.post(
        "http://192.168.29.136:8000/otp",
        { otp: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token in header
          },
        }
      );

      if (response.data.status) {
        toast.success("OTP Verified Successfully!", {
          onClose: () => navigate("/reset"),
          autoClose: 1500
        });
      } else {
        setError(response.data.message || "Invalid OTP");
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='main'>
      <div className='left'>
        <img src={MyImage} alt="" />
      </div>
      <div className='right'>
        <div className="reg-form">
          <form onSubmit={User}>
            <h1>Verify OTP</h1>
            <label>OTP</label>
            <input
              type='number'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {error && <div className="error">{error}</div>}
            <button type='submit'>Verify OTP</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Otp;
