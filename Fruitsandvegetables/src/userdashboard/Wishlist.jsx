import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Wishlist.css';
import ProfileLayout from './ProfileLayout';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch wishlist items from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = Cookies.get('token'); // ✅ Get token from cookies
        const response = await axios.get('http://192.168.29.136:8000/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token in header
          },
        });
        setWishlistItems(response.data.data); // ✅ API response data
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Remove item from wishlist
  const removeFromWishlist = async (id) => {
    try {
      const token = Cookies.get('token');

      await axios.delete(`http://192.168.29.136:8000/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { product_id: id }, // ✅ Properly pass data
      });

      // ✅ Update state after deletion
      setWishlistItems(prevItems => prevItems.filter(item => item.product_id !== id));
    } catch (error) {
      console.error('Error removing item:', error.response?.data || error.message);
    }
  };

  return (
    <ProfileLayout>
      <div className="wishlist-container">
        <h2>My Wishlist</h2>

        {loading ? (
          <p>Loading...</p>
        ) : wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div key={item.product_id} className="wishlist-card">
                <img src={item.product_image} alt={item.Product_name} />
                <h4>{item.Product_name}</h4>
                <p>₹{item.product_price}</p>
                <button onClick={() => removeFromWishlist(item.product_id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default Wishlist;
