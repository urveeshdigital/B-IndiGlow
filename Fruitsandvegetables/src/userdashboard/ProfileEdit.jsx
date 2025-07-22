import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    profilepic: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilepic: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = Cookies.get('token');
    if (!token) {
      alert('User not authenticated!');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);

    if (formData.profilepic) {
      formDataToSend.append('profile_pic', formData.profilepic);
    }

    try {
      const response = await axios.post(
        'http://192.168.29.136:8000/userprofile',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Profile updated:', response.data);
      alert('Profile updated successfully!');

      // Refresh the page
      window.location.reload();

    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            name="profilepic"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {preview && (
          <div>
            <p>Profile Picture Preview:</p>
            <img src={preview} alt="Profile Preview" width="150" />
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
