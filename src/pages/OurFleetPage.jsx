import React from 'react'
import { motion } from 'framer-motion'
import FeaturedCars from '../components/FeaturedCars'

const OurFleetPage = ({ cars, onBookCar }) => {
  return (
    <main id="main-content" className="page-content">
      <section className="page-hero">
        <div className="container">
          <motion.div 
            className="page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>हमारी टैक्सी फ्लीट / Our Taxi Fleet</h1>
            <p>All India travel के लिए विभिन्न प्रकार की vehicles उपलब्ध हैं</p>
          </motion.div>
        </div>
      </section>
      
      <FeaturedCars cars={cars} onBookCar={onBookCar} />
    </main>
  )
}

export default OurFleetPage