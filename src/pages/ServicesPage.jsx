import React from 'react'
import { motion } from 'framer-motion'
import { Car, Shield, Clock, MapPin, Phone, Star } from 'lucide-react'

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      icon: <Car size={48} />,
      title: "All India Taxi Service",
      description: "Complete taxi service covering all major cities and tourist destinations across India",
      features: ["Local city rides", "Outstation trips", "Airport transfers", "Multi-city tours"]
    },
    {
      id: 2,
      icon: <Shield size={48} />,
      title: "Safe & Reliable",
      description: "Professional drivers with verified documents and well-maintained vehicles",
      features: ["Verified drivers", "GPS tracking", "24/7 support", "Insurance covered"]
    },
    {
      id: 3,
      icon: <Clock size={48} />,
      title: "24/7 Availability",
      description: "Round the clock service for all your travel needs, including emergency trips",
      features: ["24/7 booking", "Emergency service", "Night travel", "Instant confirmation"]
    },
    {
      id: 4,
      icon: <MapPin size={48} />,
      title: "Wide Coverage",
      description: "Covering 200+ cities and towns across India with local expertise",
      features: ["200+ cities", "Tourist destinations", "Hill stations", "Remote locations"]
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
            <h1>हमारी सेवाएं / Our Services</h1>
            <p>YatraWheels की comprehensive taxi services के बारे में जानें</p>
            
            <div className="services-priority-banner">
              <div className="priority-highlight">
                <span className="icon">🚺</span>
                <strong>Women Safety First:</strong> Special priority booking & female drivers available
                <span className="icon">👵</span>
                <strong>Senior Citizen Care:</strong> Extra assistance & comfortable rides
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <Star size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="pricing-info"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2>Transparent Pricing</h2>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h4>Local Rides</h4>
                <p>₹10-15 per km</p>
                <small>City rides and short trips</small>
              </div>
              <div className="pricing-card">
                <h4>Outstation</h4>
                <p>₹13-22 per km</p>
                <small>Inter-city and long distance</small>
              </div>
              <div className="pricing-card">
                <h4>Premium</h4>
                <p>₹19-25 per km</p>
                <small>Luxury vehicles and VIP service</small>
              </div>
            </div>
            <p className="pricing-note">
              *Night charges (10 PM - 6 AM): Extra 10% • Toll charges: Actual • Driver allowance: ₹500/day for outstation
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage