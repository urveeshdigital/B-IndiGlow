import React, { useState } from 'react';
import './Address.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Address = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    alert(token);

    try {
      const response = await axios.post(
        'http://192.168.29.136:8000/address',
        {
          full_name: formData.full_name,
          add_id: Date.now(), // You can replace this with your actual logic
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Address saved successfully!');

      // ✅ Reset form after success
      setFormData({
        full_name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
      });
    } catch (error) {
      console.error('Failed to save address:', error);
      alert('Error saving address');
    }
  };

  return (
    <div className="address-container">
      <h1 className="address-title">Shipping Address</h1>
      <form className="address-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            placeholder="Enter your full name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Street, Apartment, etc."
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            placeholder="Enter your city"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            placeholder="Enter your state"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            placeholder="Enter pincode"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Enter phone number"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Save Address</button>
      </form>
    </div>
  );
};

export default Address;
