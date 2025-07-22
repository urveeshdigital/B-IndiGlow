import React from 'react';
import './About.css';
import Navbar from './Navbar';

const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to Our Company! We are committed to providing the best services to our customers. 
        Our mission is to deliver high-quality products that bring value and satisfaction.
      </p>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To innovate and lead in our industry, ensuring that our customers always receive 
          the best solutions tailored to their needs.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          To be recognized as a leader in our field, making a positive impact on society 
          and contributing to sustainable development.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Team</h2>
        <p>
          Our dedicated team of professionals works tirelessly to meet customer expectations. 
          We believe in collaboration, integrity, and continuous growth.
        </p>
      </div>
    </div>
    </>
  );
};

export default About;
