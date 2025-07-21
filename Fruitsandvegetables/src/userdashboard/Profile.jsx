// Profile.js
// import React, { useState, useEffect } from 'react';
// import './Profile.css';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Nav from 'react-bootstrap/Nav';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ProfileEdit from './ProfileEdit';
// import ChangePassword from './ChangePassword';

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     profile_pic: ''
//   });

//   const [activeTab, setActiveTab] = useState('profile');

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const token = Cookies.get('token');
//       if (!token) {
//         console.error('No token found in cookies');
//         return;
//       }

//       const response = await axios.get('http://192.168.29.136:8000/userprofile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data) {
//         const user = response.data.data[0];
//         setUserData({
//           name: user.username,
//           email: user.email,
//           phone: user.phone,
//           address: user.address,
//           profile_pic: user.image
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="dashboard-profile-container container mt-4">
//         <div className="row">
//           <div className="col-md-4 text-center profile-summary">
//             <img
//               src={userData.profile_pic}
//               alt="Profile"
//               className="profile-pic-large mb-3"
//             />
//             <h4>{userData.name}</h4>
//             <p><strong>Email:</strong> {userData.email}</p>
//             <p><strong>Phone:</strong> {userData.phone}</p>
//             <p><strong>Address:</strong> {userData.address}</p>
//           </div>

//           <div className="col-md-8">
//             <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)} className="mb-3">
//               <Nav.Item>
//                 <Nav.Link eventKey="profile">Profile</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link eventKey="edit">Edit Profile</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link eventKey="password">Change Password</Nav.Link>
//               </Nav.Item>
//             </Nav>

//             <div className="profile-details p-3 shadow rounded bg-light">
//               {activeTab === 'profile' && (
//                 <>
//                   <h4>Full Profile Details</h4>
//                   <hr />
//                   <p><strong>Name:</strong> {userData.name}</p>
//                   <p><strong>Email:</strong> {userData.email}</p>
//                   <p><strong>Phone:</strong> {userData.phone}</p>
//                   <p><strong>Address:</strong> {userData.address}</p>
//                 </>
//               )}

//               {activeTab === 'edit' && (
//                 <ProfileEdit onProfileUpdated={fetchUserData} />
//               )}

//               {activeTab === 'password' && (
//                 <ChangePassword />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import './Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Cookies from 'js-cookie';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileEdit from './ProfileEdit';
import ChangePassword from './ChangePassword';
import ProfileSidebar from './ProfileSidebar'; // import the Sidebar

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profile_pic: ''
  });

  const [activeTab, setActiveTab] = useState('profile');

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
          name: user.username,
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
    <>
      <Navbar />

      <div className="dashboard-profile-container container mt-4">
        <div className="row">
          <div className="col-md-3">
            <ProfileSidebar />
          </div>

          <div className="col-md-3 text-center profile-summary">
            <img
              src={userData.profile_pic}
              alt="Profile"
              className="profile-pic-large mb-3"
            />
            <h4>{userData.name}</h4>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Address:</strong> {userData.address}</p>
          </div>

          <div className="col-md-6">
            <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)} className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="edit">Edit Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="password">Change Password</Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="profile-details p-3 shadow rounded bg-light">
              {activeTab === 'profile' && (
                <>
                  <h4>Full Profile Details</h4>
                  <hr />
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Phone:</strong> {userData.phone}</p>
                  <p><strong>Address:</strong> {userData.address}</p>
                </>
              )}

              {activeTab === 'edit' && (
                <ProfileEdit onProfileUpdated={fetchUserData} />
              )}

              {activeTab === 'password' && (
                <ChangePassword />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
