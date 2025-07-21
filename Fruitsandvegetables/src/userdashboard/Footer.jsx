import React from 'react';
import './Footer.css'; // Link to external CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Beauty Store</h3>
        <p>Your one-stop shop for beauty and wellness products.</p>
        <ul className="footer-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
        <p className="footer-copy">&copy; 2025 Beauty Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
