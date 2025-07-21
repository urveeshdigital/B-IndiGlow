import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import url from '../Config';
import Cookies from 'js-cookie'; // <-- Import js-cookie
import { jwtDecode  } from 'jwt-decode';
import { useState,useEffect } from 'react';
import Navbar from '../dashboard/Navbar';
import Sidebar from '../dashboard/Sidebar';
import Dashboardcard from '../dashboard/Dashboardcard';
import "./Dashboard.css";
import BarGraph from '../dashboard/Graph';
import Footer from '../dashboard/Footer';


const Dashboard = () => {

  const navigate = useNavigate();
const token = Cookies.get('token');
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime,decoded.exp)

        if (decoded.exp < currentTime) {
          toast.error('Token Expired');
          Cookies.remove('token');
          localStorage.clear();
          setTimeout(() => {
            navigate('/login');
          }, 1500);
          setIsTokenValid(false);
        }
      } catch (err) {
        toast.error('Invalid token');
        Cookies.remove('token');
        localStorage.clear();
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);
  const handleLogout = async () => {
    try {
//       const token = Cookies.get('token'); // <-- Get token from cookies
// console.log("token:",token)
    
      const response = await axios.post(
        `${url}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json" // <-- Send token if required
          },
          withCredentials: true, // If your backend uses HTTP-only cookies
        }
      );

      toast.success('Logout successful');
      Cookies.remove('token'); // <-- Optional: remove token from cookies
      localStorage.clear();

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout Error:', error);
    }
  };
if (!isTokenValid) return null;
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          {/* <h1>Welcome to the Dashboard</h1> */}
          {/* Add your dashboard cards or charts here */}
          <Dashboardcard />
          <BarGraph/>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
