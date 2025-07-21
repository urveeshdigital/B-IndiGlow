import React from 'react'
import Navbar from '../userdashboard/Navbar'
import BeautyProductSlider from '../userdashboard/slider'
import Cards from '../userdashboard/cards'
import Footer from '../userdashboard/Footer'

const User = () => {
  return (
    <div>
        <Navbar />
        <BeautyProductSlider />
        <Cards />
        <Footer />
    </div>
  )
}

export default User