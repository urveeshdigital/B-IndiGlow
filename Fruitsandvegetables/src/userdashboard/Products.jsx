import React, { useEffect, useState } from 'react';
import './Products.css';
import Navbar from './Navbar';

const Products = () => {
  const [products, setProducts] = useState([]);

  const dummyProducts = [
    { id: 1, name: 'Product A', price: 100, description: 'High-quality Product A' },
    { id: 2, name: 'Product B', price: 200, description: 'Reliable Product B' },
    { id: 3, name: 'Product C', price: 150, description: 'Affordable Product C' },
    { id: 4, name: 'Product D', price: 250, description: 'Premium Product D' },
    { id: 5, name: 'Product E', price: 300, description: 'Exclusive Product E' },
  ];

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  return (
    <>
    <Navbar />
    <div className="products-container">
    
      <h2 className="products-title">Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p className="price">Price: ₹{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Products;
