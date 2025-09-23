import React from 'react'
import { motion } from 'framer-motion'
import { Star, Users, Fuel, Settings, MapPin, Heart } from 'lucide-react'

const CarCard = ({ car, onBookCar }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? 'star filled' : 'star'} 
      />
    ))
  }

  const getCarTypeIcon = (type) => {
    switch (type) {
      case 'suv':
        return '🚙'
      case 'luxury':
        return '🚗'
      case 'mpv':
        return '🚐'
      case 'hatchback':
        return '🚕'
      default:
        return '🚕'
    }
  }

  return (
    <motion.div 
      className="car-card"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="car-image-container">
        <img src={car.image} alt={`${car.make} ${car.model}`} />
        <div className="car-badge">
          <span>{getCarTypeIcon(car.type)}</span>
        </div>
        <button className="favorite-btn">
          <Heart size={18} />
        </button>
        {!car.availability && (
          <div className="unavailable-overlay">
            <span>अभी उपलब्ध नहीं</span>
          </div>
        )}
      </div>

      <div className="car-card-content">
        <div className="car-header">
          <h3>{car.make} {car.model}</h3>
          <span className="car-year">{car.year}</span>
        </div>

        <div className="car-rating">
          <div className="stars">
            {renderStars(car.rating)}
          </div>
          <span className="rating-text">
            {car.rating} ({car.reviews} reviews)
          </span>
        </div>

        <div className="car-specs">
          <div className="spec">
            <Users size={16} />
            <span>{car.seats} seats</span>
          </div>
          <div className="spec">
            <Fuel size={16} />
            <span>{car.fuel}</span>
          </div>
          <div className="spec">
            <Settings size={16} />
            <span>{car.transmission}</span>
          </div>
          <div className="spec">
            <MapPin size={16} />
            <span>{car.location}</span>
          </div>
        </div>

        <div className="car-features">
          {car.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="feature-tag more">
              +{car.features.length - 3} more
            </span>
          )}
        </div>

        <div className="car-footer">
          <div className="price">
            <span className="price-amount">₹{car.price * 100}</span>
            <span className="price-period">/day</span>
          </div>
          <motion.button 
            className={`book-btn ${!car.availability ? 'disabled' : ''}`}
            onClick={() => car.availability && onBookCar(car)}
            disabled={!car.availability}
            whileHover={car.availability ? { scale: 1.05 } : {}}
            whileTap={car.availability ? { scale: 0.95 } : {}}
          >
            {car.availability ? 'बुक करें' : 'उपलब्ध नहीं'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default CarCard