import React from 'react';
import './Cards.css'; // External CSS
import beauty1 from './images/card1.jpg';
import beauty2 from './images/card2.jpg';
import beauty3 from './images/card3.jpg';

const Cards = () => {
  const products = [
    {
      id: 1,
      name: 'Lipstick Matte',
      price: '₹499',
      image: beauty1
    },
    {
      id: 2,
      name: 'Foundation Glow',
      price: '₹899',
      image: beauty2
    },
    {
      id: 3,
      name: 'Kajal',
      price: '₹299',
      image: beauty3
    }
  ];

  return (
    <div className="cards-container">
      {products.map(product => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.name} className="card-image" />
          <h3>{product.name}</h3>
          <p className="price">{product.price}</p>
          <button className="buy-btn">Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default Cards;
