import React from 'react';
import Slider from 'react-slick';
import './Slider.css'; // Your custom styles

// Import slick-carousel default styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Image imports
import img1 from './images/beauty1.jpg';
import img2 from './images/beauty2.jpg';  // Change to different images
import img3 from './images/beauty3.jpg';

const BeautyProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div><img src={img1} alt="Beauty Product 1" /></div>
        <div><img src={img2} alt="Beauty Product 2" /></div>
        <div><img src={img3} alt="Beauty Product 3" /></div>
      </Slider>
    </div>
  );
};

export default BeautyProductSlider;
