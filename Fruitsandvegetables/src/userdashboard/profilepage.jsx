import React, { useState, useEffect } from 'react';
import './profilepage.css';

import Cookies from 'js-cookie';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';


const tabs = ['overview', 'edit', 'orders', 'payment'];

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profile_pic: ''
  });

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found in cookies');
        return;
      }

      const response = await axios.get('http://192.168.29.136:8000/userprofile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data) {
        const user = response.data.data[0];
        setUserData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          profile_pic: user.image
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };


  return (
    <div className="main">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>My Account</h2>
        <ul>
          <li className="active">Overview</li>
          <li>Orders</li>
          <li>Wishlist</li>
          <li>Addresses</li>
          <li>Payment Methods</li>
          <li>Change Password</li>
          <li>Help & Support</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">
        <div className="header">
          <div className="user-info">
            <img src={userData.profile_pic} alt="Profile" />
            <div>
              <h3>{userData.name}</h3>
              <p>{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'edit' && 'Edit Profile'}
              {tab === 'orders' && 'Orders'}
              {tab === 'payment' && 'Payment'}
            </div>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <div className="section">
            <h4>Quick Stats</h4>
            <div className="stats">
              <div className="card">
                <div className="icon">🛒</div>
                <div className="info">
                  <div className="label">Total Orders</div>
                  <div className="value">0</div>
                </div>
              </div>
              <div className="card">
                <div className="icon">💖</div>
                <div className="info">
                  <div className="label">Wishlist</div>
                  <div className="value">0</div>
                </div>
              </div>
              <div className="card">
                <div className="icon">💵</div>
                <div className="info">
                  <div className="label">Total Spent</div>
                  <div className="value">₹</div>
                </div>
              </div>
            </div>

            <div className="recent-orders">
              <h4>Recent Orders</h4>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#987654</td>
                    <td>15 July 2025</td>
                    <td>Delivered</td>
                    <td>₹1,999</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="section">
            <h4>Edit Profile</h4>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value="" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value="" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" value="" />
            </div>
            <button>Save Changes</button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="section">
            <h4>My Orders</h4>
            <p>Order history will be displayed here...</p>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="section">
            <h4>Payment Methods</h4>
            <p>Saved cards and payment options will show here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
