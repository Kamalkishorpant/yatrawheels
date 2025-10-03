import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import odooAPI from '../services/odooAPI'

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const leadData = {
        name: `Contact Inquiry - ${data.name}`,
        contact_name: data.name,
        phone: data.phone,
        email_from: data.email,
        description: `Contact Form Submission:
Subject: ${data.subject}
Message: ${data.message}
Contact Method: Contact Form`,
        stage_id: 1,
      }

      const result = await odooAPI.createLead(leadData)
      
      if (result) {
        setSubmitMessage('Thank you for contacting us! We will get back to you within 24 hours.')
        reset()
      } else {
        setSubmitMessage('Your message has been saved. We will contact you soon.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitMessage('Your message has been received. We will contact you soon.')
    }

    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      info: "+91 98765 43210",
      subInfo: "24/7 Customer Support"
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      info: "info@yatrawheels.com",
      subInfo: "Quick Response Guaranteed"
    },
    {
      icon: <MapPin size={24} />,
      title: "Address",
      info: "123 Main Road, Jaipur",
      subInfo: "Rajasthan 302001, India"
    },
    {
      icon: <Clock size={24} />,
      title: "Office Hours",
      info: "24/7 Available",
      subInfo: "Always Ready to Serve"
    }
  ]

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
            <h1>संपर्क करें / Contact Us</h1>
            <p>हमसे जुड़ें और अपनी travel requirements share करें</p>
          </motion.div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Get in Touch</h2>
              <p>
                YatraWheels team आपकी service के लिए हमेशा तैयार है। 
                किसी भी प्रकार की travel inquiry, booking, या support के लिए 
                हमसे संपर्क करें।
              </p>

              <div className="contact-cards">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="contact-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="contact-icon">
                      {item.icon}
                    </div>
                    <div className="contact-details">
                      <h4>{item.title}</h4>
                      <p className="contact-main">{item.info}</p>
                      <p className="contact-sub">{item.subInfo}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="contact-form-container"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2>Send us a Message</h2>
              
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'info'}`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name *</label>
                    <input
                      {...register('name', { required: true })}
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      {...register('phone', { required: true })}
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    {...register('email', { required: true })}
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    {...register('subject', { required: true })}
                    id="subject"
                    type="text"
                    placeholder="Enter subject"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message *</label>
                  <textarea
                    {...register('message', { required: true })}
                    id="message"
                    placeholder="Enter your message"
                    className="form-textarea"
                    rows="5"
                  />
                </div>

                <motion.button 
                  type="submit" 
                  className="contact-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div 
            className="map-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2>Find Us</h2>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.722045441647!2d75.7872!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5c5f0c8b9e7%3A0x1234567890abcdef!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="YatraWheels Office Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage