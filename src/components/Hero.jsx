import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { MapPin, Calendar, Phone, User, MessageSquare } from 'lucide-react'
import { locations, carTypes } from '../data/carsData'
import odooAPI from '../services/odooAPI'
import "react-datepicker/dist/react-datepicker.css"

const Hero = ({ onSearch }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm()
  const [pickupDate, setPickupDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  
  const watchedPickupLocation = watch('pickupLocation')
  const watchedDropLocation = watch('dropLocation')
  const watchedCarType = watch('carType')

  const locationOptions = locations.map(location => ({
    value: location,
    label: location
  }))

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const leadData = {
        name: `Travel Inquiry - ${data.customerName}`,
        contact_name: data.customerName,
        phone: data.phone,
        email_from: data.email || '',
        description: `Travel Details:
Pickup: ${data.pickupLocation?.value || 'Not specified'}
Drop: ${data.dropLocation?.value || 'Not specified'}
Travel Date: ${pickupDate ? pickupDate.toLocaleDateString() : 'Not specified'}
Return Date: ${returnDate ? returnDate.toLocaleDateString() : 'Not specified'}
Vehicle Type: ${data.carType?.value || 'Not specified'}
Special Requirements: ${data.requirements || 'None'}`,
        stage_id: 1, // New lead stage
      }

      const result = await odooAPI.createLead(leadData)
      
      if (result) {
        setSubmitMessage('Thank you! Your travel inquiry has been submitted successfully. We will contact you soon.')
        reset()
        setPickupDate(null)
        setReturnDate(null)
      } else {
        // Store in localStorage as fallback
        const failedInquiries = JSON.parse(localStorage.getItem('failedInquiries') || '[]')
        failedInquiries.push({ ...leadData, timestamp: new Date().toISOString() })
        localStorage.setItem('failedInquiries', JSON.stringify(failedInquiries))
        
        setSubmitMessage('Your inquiry has been saved. We will process it and contact you soon.')
      }
    } catch (error) {
      console.error('Inquiry submission error:', error)
      setSubmitMessage('Your inquiry has been saved locally. We will contact you soon.')
    }

    setIsSubmitting(false)
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
          <h2 className="form-title">Plan Your Journey - Get Instant Quote</h2>
          
          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'info'}`}>
              {submitMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="inquiry-form">
            <div className="form-group full-width">
              <User className="form-icon" size={20} />
              <input
                {...register('customerName', { required: true })}
                type="text"
                placeholder="Your Full Name *"
                className="form-input prominent-field"
              />
            </div>

            <div className="form-group full-width">
              <Phone className="form-icon" size={20} />
              <input
                {...register('phone', { required: true })}
                type="tel"
                placeholder="Your Phone Number *"
                className="form-input prominent-field"
              />
            </div>

            <div className="form-divider"></div>

            <div className="form-row">
              <div className="form-group">
                <MapPin className="form-icon" size={20} />
                <Select
                  options={locationOptions}
                  placeholder="Pick-up City *"
                  className="location-select"
                  classNamePrefix="select"
                  onChange={(option) => setValue('pickupLocation', option)}
                  value={watchedPickupLocation}
                />
              </div>

              <div className="form-group">
                <MapPin className="form-icon" size={20} />
                <Select
                  options={locationOptions}
                  placeholder="Drop City *"
                  className="location-select"
                  classNamePrefix="select"
                  onChange={(option) => setValue('dropLocation', option)}
                  value={watchedDropLocation}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <Calendar className="form-icon" size={20} />
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  placeholderText="Travel Date *"
                  className="date-input"
                  minDate={new Date()}
                />
              </div>

              <div className="form-group">
                <Calendar className="form-icon" size={20} />
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  placeholderText="Return Date (Optional)"
                  className="date-input"
                  minDate={pickupDate || new Date()}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <Select
                  options={carTypes}
                  placeholder="Vehicle Type *"
                  className="car-type-select"
                  classNamePrefix="select"
                  onChange={(option) => setValue('carType', option)}
                  value={watchedCarType}
                />
              </div>

              <div className="form-group">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email (Optional)"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <MessageSquare className="form-icon" size={20} />
              <textarea
                {...register('requirements')}
                placeholder="Special Requirements (Optional)"
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="charges-note">
              <p><strong>Note:</strong> Rates displayed are base charges per km. Night charges (10 PM - 6 AM) and toll charges are additional and will be added to the final bill.</p>
            </div>

            <motion.button 
              type="submit" 
              className="inquiry-btn"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
              {isSubmitting ? 'Submitting...' : 'Get Quote & Book Now'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero