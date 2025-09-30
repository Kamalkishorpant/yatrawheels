import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CarCard from './CarCard'
import { Filter, SortDesc } from 'lucide-react'

const FeaturedCars = ({ cars, onBookCar }) => {
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const sortCars = (cars, sortBy) => {
    switch (sortBy) {
      case 'price-low':
        return [...cars].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...cars].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...cars].sort((a, b) => b.rating - a.rating)
      case 'newest':
        return [...cars].sort((a, b) => b.year - a.year)
      default:
        return cars
    }
  }

  const sortedCars = sortCars(cars, sortBy)

  return (
    <section className="featured-cars" id="cars">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>हमारी टैक्सी / Our Taxi Fleet</h2>
          <p>All India travel के लिए best vehicles</p>
        </motion.div>

        <motion.div 
          className="charges-disclaimer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="disclaimer-content">
            <h4>💰 Charges Information</h4>
            <ul>
              <li><strong>Base Rate:</strong> Per km charges shown below (minimum 300 km billing)</li>
              <li><strong>Night Charges:</strong> Extra 10% on base rate (10 PM - 6 AM)</li>
              <li><strong>Toll Charges:</strong> Actual toll charges will be added to your bill</li>
              <li><strong>Driver Allowance:</strong> ₹500 per day for outstation trips</li>
              <li><strong>Fuel:</strong> Included in per km rate</li>
            </ul>
            <p className="disclaimer-note">
              Final bill = (Distance × Per KM Rate) + Night Charges + Toll Charges + Driver Allowance
            </p>
          </div>
        </motion.div>

        <div className="cars-controls">
          <div className="cars-count">
            <span>{sortedCars.length} taxis उपलब्ध</span>
          </div>
          
          <div className="cars-actions">
            <button 
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
            </button>
            
            <div className="sort-dropdown">
              <SortDesc size={18} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div 
            className="car-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sortedCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
              >
                <CarCard car={car} onBookCar={onBookCar} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {sortedCars.length === 0 && (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>कोई टैक्सी नहीं मिली</h3>
            <p>अपना search criteria बदल कर देखें</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default FeaturedCars