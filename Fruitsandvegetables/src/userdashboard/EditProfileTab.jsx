import React from 'react';

const EditProfileTab = () => (
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
);

export default EditProfileTab;
