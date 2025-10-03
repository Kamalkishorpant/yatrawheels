import React from 'react'
import Hero from '../components/Hero'
import FeaturedCars from '../components/FeaturedCars'
import Testimonials from '../components/Testimonials'

const HomePage = ({ cars, onSearch, onBookCar }) => {
  return (
    <main id="main-content">
      <Hero onSearch={onSearch} />
      <FeaturedCars cars={cars} onBookCar={onBookCar} />
      <Testimonials />
    </main>
  )
}

export default HomePage