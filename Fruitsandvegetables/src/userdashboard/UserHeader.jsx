import React from 'react';

const UserHeader = ({ userData }) => (
  <div className="header">
    <div className="user-info">
      <img src={userData.profile_pic} alt="Profile" />
      <div>
        <h3>{userData.name}</h3>
        <p>{userData.email}</p>
      </div>
    </div>
  </div>
);

export default UserHeader;
