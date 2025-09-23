import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { MapPin, Calendar, Search } from 'lucide-react'
import { locations, carTypes } from '../data/carsData'
import "react-datepicker/dist/react-datepicker.css"

const Hero = ({ onSearch }) => {
  const { register, handleSubmit, setValue, watch } = useForm()
  const [pickupDate, setPickupDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  
  const watchedLocation = watch('location')
  const watchedCarType = watch('carType')

  const locationOptions = locations.map(location => ({
    value: location,
    label: location
  }))

  const onSubmit = (data) => {
    const searchCriteria = {
      location: data.location?.value || '',
      pickupDate,
      returnDate,
      carType: data.carType?.value || 'all'
    }
    onSearch(searchCriteria)
  }

  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          India's Most Trusted Taxi Service
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Safe, comfortable and affordable taxi service for all India travel
        </motion.p>

        <motion.div 
          className="search-form-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <div className="form-group">
              <MapPin className="form-icon" size={20} />
              <Select
                options={locationOptions}
                placeholder="Pick-up City"
                className="location-select"
                classNamePrefix="select"
                onChange={(option) => setValue('location', option)}
                value={watchedLocation}
              />
            </div>

            <div className="form-group">
              <Calendar className="form-icon" size={20} />
              <DatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                placeholderText="Travel Date"
                className="date-input"
                minDate={new Date()}
              />
            </div>

            <div className="form-group">
              <Calendar className="form-icon" size={20} />
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                placeholderText="Return Date"
                className="date-input"
                minDate={pickupDate || new Date()}
              />
            </div>

            <div className="form-group">
              <Select
                options={carTypes}
                placeholder="Vehicle Type"
                className="car-type-select"
                classNamePrefix="select"
                onChange={(option) => setValue('carType', option)}
                value={watchedCarType}
                defaultValue={carTypes[0]}
              />
            </div>

            <motion.button 
              type="submit" 
              className="search-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} />
              Search Taxi
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero