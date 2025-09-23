import React from 'react'
import { motion } from 'framer-motion'
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'हमारी टैक्सी / Our Fleet', href: '#taxis' },
      { label: 'All India Routes', href: '#routes' },
      { label: 'Franchise', href: '#franchise' }
    ],
    services: [
      { label: 'Local Taxi', href: '#local' },
      { label: 'Outstation Travel', href: '#outstation' },
      { label: 'Airport Transfer', href: '#airport' },
      { label: 'Wedding/Events', href: '#wedding' }
    ],
    support: [
      { label: '24x7 Help', href: '#help' },
      { label: 'WhatsApp Support', href: '#whatsapp' },
      { label: 'Complaint', href: '#complaint' },
      { label: 'Driver Registration', href: '#driver' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#facebook', label: 'Facebook' },
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Instagram, href: '#instagram', label: 'Instagram' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-section brand-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo">
              <Car size={32} />
              <span>YatraWheels</span>
            </div>
            <p>Bharat की सबसे bharosemand taxi service. Safe, comfortable aur affordable travel के लिए हमेशा ready.</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} />
                <span>+91-9876543210</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>info@yatrawheels.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Transport Nagar, Near Railway Station, Jaipur</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4>Company</h4>
            <ul>
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Services</h4>
            <ul>
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Support</h4>
            <ul>
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-section newsletter-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>Stay Connected</h4>
            <p>Special offers aur updates के लिए subscribe करें</p>
            <div className="newsletter-form">
              <input type="email" placeholder="अपना email डालें" />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} YatraWheels. All rights reserved. | Regd. Office: Jaipur, Rajasthan</p>
          <div className="footer-bottom-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer