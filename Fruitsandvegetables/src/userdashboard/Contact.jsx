import React from 'react';
import './Contact.css';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <>
    <Navbar />
    <div className="contact-container">
      <h2>Contact Us</h2>
      
      <div className="contact-details">
        <form className="contact-form">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Message</label>
          <textarea placeholder="Write your message here..."></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-map">
          <h3>Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019044329529!2d144.96305831531666!3d-37.81362797975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f30c497b%3A0xb1c1574eec9bfa11!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614685392343!5m2!1sen!2sau"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            title="map"
          ></iframe>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
