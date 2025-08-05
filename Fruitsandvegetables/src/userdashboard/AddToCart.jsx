import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './AddToCart.css';
import Navbar from './Navbar';
import Sidebar from '../dashboard/Sidebar';
import { FaTrash } from 'react-icons/fa';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const res = await axios.get('http://192.168.29.136:8000/add_cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = res.data.data.map(item => ({
        ...item,
        quantity: parseInt(item.quantity, 10) || 1,
      }));

      setCartItems(items);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    }
  };

  const updateQuantity = async (product_id, qty, price) => {
    try {
      const token = Cookies.get('token');
      const quantity = Math.max(1, parseInt(qty, 10));
      const total_price = price * quantity;

      await axios.put(
        'http://192.168.29.136:8000/add_cart',
        { product_id, qty: quantity, total_price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCartItems();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const deleteItem = async (product_id) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      await axios.delete('http://192.168.29.136:8000/add_cart', {
        headers: { Authorization: `Bearer ${token}` },
        data: { product_id }
      });

      fetchCartItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const increaseQty = (item) => {
    updateQuantity(item.product_id, parseInt(item.quantity, 10) + 1, item.product_price);
  };

  const decreaseQty = (item) => {
    const currentQty = parseInt(item.quantity, 10);
    if (currentQty > 1) {
      updateQuantity(item.product_id, currentQty - 1, item.product_price);
    }
  };

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  // ✅ Handle Buy Now
  const handleBuyNow = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const orderData = cartItems.map(item => ({
        product_id: item.product_id,
        qty: item.quantity,
        price: item.product_price,
        total: item.product_price * item.quantity,
      }));

      await axios.post('http://192.168.29.136:8000/place_order', 
        { items: orderData, grand_total: grandTotal }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Order placed successfully!');
      setCartItems([]); // Clear cart after order
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2 className="cart-title">🛒 My Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">No items in cart</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item-card" key={item.product_id}>
                  <div className="cart-item-info">
                    <h3>{item.product_name}</h3>
                    <p>Price: ₹{item.product_price}</p>
                    <div className="quantity-control">
                      <button onClick={() => decreaseQty(item)}>-</button>
                      <span>{parseInt(item.quantity, 10)}</span>
                      <button onClick={() => increaseQty(item)}>+</button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-item-total">
                      Total: ₹{item.product_price * item.quantity}
                    </div>
                    <button
                      className="delete-btn1"
                      onClick={() => deleteItem(item.product_id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-grand-total">
              <h3>Grand Total: ₹{grandTotal}</h3>
              <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddToCart;
