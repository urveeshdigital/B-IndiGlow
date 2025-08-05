import React, { useEffect, useState } from 'react';
import './Products.css';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaHeart, FaCheck } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [cartItems, setCartItems] = useState([]);

  // ✅ Fetch products, wishlist & cart on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://192.168.29.136:8000/products');

        // ✅ Filter products where status is NOT "0"
        const filteredProducts = res.data.data.filter(
          product => product.status !== "0"
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchWishlist = async () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const res = await axios.get('http://192.168.29.136:8000/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const wishlistState = {};
        res.data.data.forEach(item => {
          wishlistState[item.product_id] = item.active;
        });
        setWishlist(wishlistState);
      } catch (error) {
        console.error('Error fetching wishlist:', error.response?.data || error);
      }
    };

    const fetchCart = async () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const res = await axios.get('http://192.168.29.136:8000/add_cart', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const ids = res.data.data.map(item => item.product_id);
        setCartItems(ids);
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error);
      }
    };

    fetchProducts();
    fetchWishlist();
    fetchCart();
  }, []);

  // ✅ Update quantity
  const updateQuantity = (productId, change) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const newQty = Math.max(1, current + change);
      return { ...prev, [productId]: newQty };
    });
  };

  // ✅ Add to cart with "already added" alert & error handling
  const handleAddToCart = async (product_id) => {
    const token = Cookies.get('token');
    if (!token) {
      alert('You must be logged in to add to cart.');
      return;
    }

    if (cartItems.includes(product_id)) {
      alert('This product is already in your cart!');
      return;
    }

    const quantity = quantities[product_id] || 1;

    try {
      const res = await axios.post(
        'http://192.168.29.136:8000/add_cart',
        { product_id, quantity, qty: quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success === false) {
        alert(res.data.message || 'Failed to add product to cart.');
        return;
      }

      alert(res.data.message || 'Product added to cart successfully!');
      setCartItems(prev => [...prev, product_id]);
    } catch (error) {
      console.error('Error adding to cart:', error);

      if (error.response) {
        alert(error.response.data.message || 'Failed to add product to cart.');
      } else if (error.request) {
        alert('No response from server. Please try again.');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  // ✅ Wishlist add/remove
  const handleWishlist = async (product_id) => {
    const token = Cookies.get('token');
    if (!token) {
      alert('You must be logged in to manage wishlist.');
      return;
    }

    try {
      if (wishlist[product_id] === 1) {
        await axios.delete(
          'http://192.168.29.136:8000/wishlist',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            data: { product_id }
          }
        );

        setWishlist(prev => ({ ...prev, [product_id]: 0 }));
        alert('Removed from wishlist!');
      } else {
        await axios.post(
          'http://192.168.29.136:8000/wishlist',
          { product_id, active: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );

        setWishlist(prev => ({ ...prev, [product_id]: 1 }));
        alert('Added to wishlist!');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error.response?.data || error);
      alert('Failed to update wishlist.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="products-container">
        <h2 className="products-title">Our Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.product_id} className="product-card">
              <div className="card-image">
                <img 
                  src={product.product_image} 
                  alt={product.product_name} 
                />
                <FaHeart 
                  className={`wishlist-icon ${wishlist[product.product_id] === 1 ? 'active' : ''}`} 
                  onClick={() => handleWishlist(product.product_id)} 
                />
              </div>

              <div className="card-content">
                <h4 className="card-title">{product.product_name}</h4>
                <p className="card-price">Rs.{product.product_price}</p>

                <div className="quantity-container">
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(product.product_id, -1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{quantities[product.product_id] || 1}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(product.product_id, 1)}
                  >
                    +
                  </button>
                </div>

                <button 
                  className={`add-to-cart ${cartItems.includes(product.product_id) ? 'already-cart' : ''}`}
                  onClick={() => handleAddToCart(product.product_id)}
                  disabled={cartItems.includes(product.product_id)}
                >
                  {cartItems.includes(product.product_id) ? (
                    <>
                     Already Add to cart <FaCheck className="tick-icon" /> 
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
