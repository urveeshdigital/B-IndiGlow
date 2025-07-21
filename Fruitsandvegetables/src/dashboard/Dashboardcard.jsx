import React, { useEffect, useState } from 'react';
import './Dashboardcard.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaUserCheck,FaUsers,FaUserTimes,FaUserFriends} from 'react-icons/fa';

const Dashboardcard = () => {
  const [data, setData] = useState({
    Total_users: 0,
    Active_users: 0,
    Inactive_users: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token'); // Ensure token is stored in cookies

      try {
        const response = await axios.get('http://192.168.29.136:8000/admin/users_data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the API returns something like { total_users: 1500, active_users: 1200, ... }
        setData(response.data.data);
      
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-cards">
      <div className="card">
        <h3>Total Users</h3>
        
        <p><FaUsers />{" "} {data.Total_users }  </p>
        {/* <FontAwesomeIcon icon="fa-solid fa-user-check" /> */}
      </div>
      <div className="card">
        <h3>Active Users</h3>
        
        <p><FaUserFriends />{" "}{data.Active_users}</p>
      </div>
      <div className="card">
        <h3>Inactive Users</h3>
      
        <p><FaUsers />{" "}{data.Inactive_users}</p>
      </div>
     
      <div className="card">
        <h3>Verified User</h3>
       
        <p><FaUserCheck />{" "}{data.New_signups}</p>
      </div>
      <div className="card">
        <h3>UnVerified User</h3>
        
        <p><FaUserTimes />{" "}{data.New_signups}</p>
      </div>
    </div>
  );
};

export default Dashboardcard;
