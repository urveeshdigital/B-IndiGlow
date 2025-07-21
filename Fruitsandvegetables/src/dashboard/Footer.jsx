import React from 'react';
import './FooterAdmin.css';  // External CSS file

const Footer = () => {
  return (
    <footer className="admin-footer">
      <p>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Support</a>
      </div>
    </footer>
  );
}

export default Footer;
