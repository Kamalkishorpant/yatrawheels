import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { locations } from '../data/carsData'
import DatePicker from 'react-datepicker'
import { X, Calendar, User, Phone, Mail, CreditCard, Check, Banknote, Smartphone } from 'lucide-react'
import odooAPI from '../services/odooAPI'

const BookingModal = ({ car, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [pickupDate, setPickupDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('cash-on-visit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookingId, setBookingId] = useState(null)
  const [error, setError] = useState(null)

  const calculateDays = () => {
    if (pickupDate && returnDate) {
      const diffTime = Math.abs(returnDate - pickupDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays || 1
    }
    return 1
  }

  const calculateAdvance = () => {
    if (paymentMethod === 'half-payment') {
      return Math.round(totalPrice / 2)
    } else if (paymentMethod === 'advance-booking') {
      return Math.min(500, Math.round(totalPrice * 0.2)) // 20% or max ₹500
    }
    return 0
  }

  const totalDays = calculateDays()
  const totalPrice = car.price * totalDays * 100 // Convert to rupees
  const advanceAmount = calculateAdvance()

  // Helper function to format date for Odoo
  const formatDateForOdoo = (date) => {
    if (!date) return new Date().toISOString().slice(0, 19).replace('T', ' ');
    // Convert to YYYY-MM-DD HH:MM:SS format expected by Odoo
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Prepare booking data for Odoo
      const bookingData = {
        name: data.fullName || data.name,
        email: data.email,
        phone: data.phone,
        mobile: data.phone, // Using phone as mobile
        address: data.address || '',
        pickupLocation: data.pickupLocation || car.location,
        dropLocation: data.dropLocation || 'To be confirmed',
        pickupDate: formatDateForOdoo(pickupDate),
        returnDate: formatDateForOdoo(returnDate),
        vehicleType: `${car.make} ${car.model}`,
        totalAmount: totalPrice,
        paymentMethod: paymentMethod,
        advanceAmount: advanceAmount,
        notes: `Booking for ${car.make} ${car.model} - ${car.type} - License: ${car.licensePlate || 'TBD'}`
      }

      // Send booking to Odoo
      console.log('Submitting bookingData to Odoo:', bookingData)
      const result = await odooAPI.createBooking(bookingData)
      
      if (result.success) {
        setBookingId(result.bookingId)
        setIsSuccess(true)
        
        // Store both booking and lead info
        if (result.leadId) {
          console.log('✅ Both booking and lead created:', {
            bookingId: result.bookingId,
            leadId: result.leadId
          });
        }
        
        // Auto close after success
        setTimeout(() => {
          onClose()
        }, 5000)
      } else {
        // Save failed booking locally so it can be retried
        console.warn('Booking failed, saving payload to localStorage for retry', result.error)
        try {
          const failed = JSON.parse(localStorage.getItem('failedBookings') || '[]')
          failed.push({ bookingData, error: result.error, ts: Date.now() })
          localStorage.setItem('failedBookings', JSON.stringify(failed))
        } catch (lsErr) {
          console.error('Failed to save booking locally:', lsErr)
        }
        throw new Error(result.error || 'Failed to create booking in Odoo')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      setError(`Booking failed: ${error.message}. Please try again or contact support.`)
    }
    
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="booking-modal success"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className="success-content">
            <motion.div 
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Check size={48} />
            </motion.div>
            <h2>Booking Confirmed!</h2>
            <p>Your {car.make} {car.model} has been booked successfully.</p>
            {bookingId && (
              <p><strong>Booking ID:</strong> #{bookingId}</p>
            )}
            <p>Confirmation details will be sent via WhatsApp.</p>
            <p>📞 Help: +91-9876543210</p>
            <div className="booking-summary">
              <p><strong>Vehicle:</strong> {car.make} {car.model}</p>
              <p><strong>Total Amount:</strong> ₹{totalPrice.toLocaleString()}</p>
              <p><strong>Payment Method:</strong> {paymentMethod.replace('-', ' ')}</p>
              {advanceAmount > 0 && (
                <p><strong>Advance Required:</strong> ₹{advanceAmount.toLocaleString()}</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="booking-modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Book Your Taxi</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="modal-content">
            <div className="car-summary">
              <img src={car.image} alt={`${car.make} ${car.model}`} />
              <div className="car-info">
                <h3>{car.make} {car.model}</h3>
                <p>{car.year} • {car.seats} seats • {car.fuel} • Driver included</p>
                <div className="price-breakdown">
                  <span>₹{car.price * 100}/day × {totalDays} days</span>
                  <strong>₹{totalPrice} total</strong>
                  {advanceAmount > 0 && (
                    <div className="advance-info">
                      <span>Advance: ₹{advanceAmount}</span>
                      <span>Balance: ₹{totalPrice - advanceAmount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
              {error && (
                <div className="error-message">
                  <p style={{ color: '#e53e3e', background: '#fed7d7', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                    {error}
                  </p>
                </div>
              )}
              
              <div className="form-section">
                <h4>यात्रा की तारीख / Travel Dates</h4>
                <div className="date-inputs">
                  <div className="form-group">
                    <Calendar className="form-icon" size={18} />
                    <DatePicker
                      selected={pickupDate}
                      onChange={(date) => setPickupDate(date)}
                      placeholderText="यात्रा शुरू / Start Date"
                      className="date-input"
                      minDate={new Date()}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Calendar className="form-icon" size={18} />
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      placeholderText="वापसी / Return Date"
                      className="date-input"
                      minDate={pickupDate || new Date()}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>व्यक्तिगत जानकारी / Personal Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <User className="form-icon" size={18} />
                    <input
                      type="text"
                      placeholder="पूरा नाम / Full Name"
                      {...register('fullName', { required: 'Name is required' })}
                    />
                    {errors.fullName && <span className="error">{errors.fullName.message}</span>}
                  </div>
                  <div className="form-group">
                    <Mail className="form-icon" size={18} />
                    <input
                      type="email"
                      placeholder="ईमेल / Email Address"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <Phone className="form-icon" size={18} />
                  <input
                    type="tel"
                    placeholder="मोबाइल नंबर / Mobile Number"
                    {...register('phone', { required: 'Mobile number is required' })}
                  />
                  {errors.phone && <span className="error">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="form-section">
                <h4>पिकअप / Drop Locations</h4>
                <div className="form-row">
                  <div className="form-group">
                    <select {...register('pickupLocation')} defaultValue={car.location}>
                      <option value="">Select pickup location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <select {...register('dropLocation')}>
                      <option value="">Select drop location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>भुगतान विकल्प / Payment Options</h4>
                
                <div className="payment-methods">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cash-on-visit"
                      name="paymentMethod"
                      value="cash-on-visit"
                      checked={paymentMethod === 'cash-on-visit'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="cash-on-visit">
                      <Banknote size={20} />
                      <div>
                        <strong>Cash on Visit</strong>
                        <p>दुकान पर आकर पूरा पैसा दें / Pay full amount when you visit our office</p>
                      </div>
                    </label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="half-payment"
                      name="paymentMethod"
                      value="half-payment"
                      checked={paymentMethod === 'half-payment'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="half-payment">
                      <CreditCard size={20} />
                      <div>
                        <strong>Half Payment Now</strong>
                        <p>अभी आधा पैसा, बाकी बाद में / Pay 50% now, rest later</p>
                      </div>
                    </label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="advance-booking"
                      name="paymentMethod"
                      value="advance-booking"
                      checked={paymentMethod === 'advance-booking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="advance-booking">
                      <Smartphone size={20} />
                      <div>
                        <strong>Advance Booking</strong>
                        <p>केवल बुकिंग के लिए एडवांस / Small advance to confirm booking</p>
                      </div>
                    </label>
                  </div>
                </div>

                {paymentMethod !== 'cash-on-visit' && (
                  <div className="payment-details">
                    <h5>Payment Details</h5>
                    <div className="upi-options">
                      <p><strong>UPI Options:</strong></p>
                      <p>📱 PhonePe: 9876543210@paytm</p>
                      <p>📱 Google Pay: yatrawheels@oksbi</p>
                      <p>📱 Paytm: 9876543210@paytm</p>
                    </div>
                    
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="UPI Transaction ID / Reference Number"
                        {...register('transactionId', { 
                          required: paymentMethod !== 'cash-on-visit' ? 'Transaction ID is required' : false 
                        })}
                      />
                      {errors.transactionId && <span className="error">{errors.transactionId.message}</span>}
                    </div>
                  </div>
                )}

                <div className="office-address">
                  <h5>Our Office / हमारा ऑफिस:</h5>
                  <p>📍 YatraWheels Taxi Service</p>
                  <p>Shop No. 15, Transport Nagar,</p>
                  <p>Near Railway Station, Jaipur, Rajasthan</p>
                  <p>📞 Phone: +91-9876543210</p>
                  <p>🕐 Timing: 24x7 Available</p>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  रद्द करें / Cancel
                </button>
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Processing...' : 
                    paymentMethod === 'cash-on-visit' ? `बुक करें ₹${totalPrice}` :
                    `₹${advanceAmount} Pay करें`
                  }
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BookingModal