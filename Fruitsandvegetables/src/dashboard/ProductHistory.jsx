import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaEdit } from "react-icons/fa";
import './ProductHistory.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const ProductHistory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_price: '',
    product_image: null,
  });
  const [preview, setPreview] = useState(null);

  // ✅ Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get('http://192.168.29.136:8000/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data); // adjust if API returns array directly
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, product_image: file });
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Edit product
  const handleEdit = (product) => {
    setEditingId(product.product_id);
    setNewProduct({
      product_name: product.product_name,
      product_price: product.product_price,
      product_image: null,
    });
    setPreview(product.product_image);
    setShowModal(true);
  };

  // ✅ Toggle product status
  const handleToggleStatus = async (product) => {
    try {
      const token = Cookies.get('token');
      await axios.patch(
        'http://192.168.29.136:8000/products',
        {
          product_id: product.product_id,
          status: product.status, // ✅ send same status value
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (err) {
      console.error('Error updating product status:', err);
    }
  };

  // ✅ Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const formData = new FormData();
      formData.append('product_name', newProduct.product_name);
      formData.append('product_price', newProduct.product_price);
      if (newProduct.product_image) {
        formData.append('product_image', newProduct.product_image);
      
      // else (
      //   formData.append("product_image":343)
      // )
      }
      

      if (editingId) {
        // ✅ Append product_id for update
        formData.append('product_id', editingId);

        await axios.put('http://192.168.29.136:8000/products', formData, {
          
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://192.168.29.136:8000/products', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setShowModal(false);
      setEditingId(null);
      setNewProduct({ product_name: '', product_price: '', product_image: null });
      setPreview(null);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  if (loading) return <p className="loading-text">Loading products...</p>;

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content">
          <div className="product-history-container">
            <h2 className="product-history-title">Admin Product List</h2>

            <button className="add-product-btn" onClick={() => {
              setEditingId(null);
              setNewProduct({ product_name: '', product_price: '', product_image: null });
              setPreview(null);
              setShowModal(true);
            }}>+ Add Product</button>

            {products.length === 0 ? (
              <p className="empty-text">No products found.</p>
            ) : (
              <table className="product-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod.product_id}>
                      <td>{prod.product_id}</td>
                      <td>{prod.product_name}</td>
                      <td>₹{prod.product_price}</td>
                      <td>
                        {prod.product_image ? (
                          <img src={prod.product_image} alt={prod.product_name} className="product-img" />
                        ) : (
                          'No Image'
                        )}
                      </td>
                      <td>{prod.status === "1" ? 'Enabled' : 'Disabled'}</td>
                      <td className="action-col">
                        <button className="edit-btn" onClick={() => handleEdit(prod)}><FaEdit /></button>
                        <button
                          className={prod.status === "1" ? 'disable-btn' : 'enable-btn'}
                          onClick={() => handleToggleStatus(prod)}
                        >
                          {prod.status === "1" ? 'Disable' : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {showModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.product_name}
                      onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newProduct.product_price}
                      onChange={(e) => setNewProduct({ ...newProduct, product_price: e.target.value })}
                      required
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {preview && <img src={preview} alt="Preview" className="preview-img" />}
                    <div className="modal-actions">
                      <button type="submit" className="save-btn">{editingId ? 'Update' : 'Save'}</button>
                      <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHistory;
