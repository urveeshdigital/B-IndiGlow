import React from 'react';
import './profilepage.css'; // Ensure CSS is imported here
import ProfileLayout from './ProfileLayout';

const OverviewTab = () => {
  return (
    <div className="section">
      <h4>Quick Stats</h4>
      <div className="stats">
        <div className="card">
          <div className="icon">🛒</div>
          <div className="info">
            <div className="label">Total Orders</div>
            <div className="value">12</div>
          </div>
        </div>
        <div className="card">
          <div className="icon">💖</div>
          <div className="info">
            <div className="label">Wishlist</div>
            <div className="value">8</div>
          </div>
        </div>
        <div className="card">
          <div className="icon">💵</div>
          <div className="info">
            <div className="label">Total Spent</div>
            <div className="value">₹23,450</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
