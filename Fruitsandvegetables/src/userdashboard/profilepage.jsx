import React, { useState, useEffect } from 'react';
import './profilepage.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import UserHeader from './UserHeader';
import Tabs from './Tabs';
import OverviewTab from './OverviewTab';
import EditProfileTab from './EditProfileTab';
import PaymentTab from './PaymentTab';
import ProfileSidebar from './ProfileSidebar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '', email: '', phone: '', address: '', profile_pic: ''
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) return console.error('No token in cookies');
      const response = await axios.get('http://192.168.29.136:8000/userprofile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = response.data.data[0];
      setUserData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profile_pic: user.image
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div className="main">
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="content">
        <UserHeader userData={userData} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'edit' && <EditProfileTab />}
        {activeTab === 'payment' && <PaymentTab />}
      </div>
    </div>
  );
};

export default ProfilePage;
