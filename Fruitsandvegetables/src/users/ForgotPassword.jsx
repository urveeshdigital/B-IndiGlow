import React, { useState } from 'react';
import "./Users.css";
import MyImage from "../assets/images/form.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://192.168.29.136:8000/forgot", { email });
      console.log("Response:", response.data);

      toast.success(response.data.message || "OTP sent successfully");

      // Navigate after a short delay to allow user to see the toast
      setTimeout(() => {
        navigate("/otp");
      }, 1500);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please check your email and try again."
      );
    }
  };

  return (
    <div className='main'>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='left'>
        <img src={MyImage} alt="form" />
      </div>
      <div className='right'>
        <div className="reg-form">

        <form onSubmit={handleForgotPassword}>
          <h1>Forgot Password</h1>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type='submit'>Send OTP</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
