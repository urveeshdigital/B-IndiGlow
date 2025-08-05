import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://192.168.29.136:8000/address', {
          withCredentials: true, // ensures cookies are sent
        });
        setAddresses(response.data);
      } catch (err) {
        setError('Failed to fetch addresses.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <div className="address-container">
      <h1>User Addresses</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {addresses.length > 0 ? (
        <ul>
          {addresses.map((addr, index) => (
            <li key={index}>
              <strong>{addr.full_name}</strong><br />
              {addr.address}, {addr.city}, {addr.state} - {addr.pincode}<br />
              Phone: {addr.phone}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No addresses found.</p>
      )}
    </div>
  );
};

export default GetAddresses;
