import React from 'react'
import { motion } from 'framer-motion'
import { Users, Award, MapPin, Clock } from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { icon: <Users size={48} />, number: "50,000+", label: "खुश ग्राहक / Happy Customers" },
    { icon: <MapPin size={48} />, number: "200+", label: "शहर / Cities Covered" },
    { icon: <Award size={48} />, number: "1000+", label: "टैक्सी / Taxi Fleet" },
    { icon: <Clock size={48} />, number: "24/7", label: "सेवा / Service Available" }
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
            <h1>हमारे बारे में / About YatraWheels</h1>
            <p>India's most trusted taxi service provider since 2023</p>
          </motion.div>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Story</h2>
              <p>
                YatraWheels की शुरुआत 2023 में हुई थी एक simple vision के साथ - 
                India में safe, reliable और affordable taxi service provide करना। 
                आज हम 200+ cities में अपनी services देते हैं।
              </p>
              
              <div className="highlight-quote-box">
                <p>"महिलाओं और बुजुर्गों की सुरक्षा हमारी सर्वोच्च प्राथमिकता है"</p>
                <span>- YatraWheels Promise</span>
              </div>
              
              <p>
                हमारा mission है कि हर traveler को comfortable और hassle-free 
                journey का experience मिले। चाहे आप business trip पर जा रहे हों, 
                family vacation plan कर रहे हों, या emergency में travel करना हो - 
                YatraWheels हमेशा आपके साथ है।
              </p>
              
              <h3>Why Choose YatraWheels?</h3>
              <ul className="feature-list">
                <li>✓ Verified and experienced drivers</li>
                <li>✓ Well-maintained and clean vehicles</li>
                <li>✓ Transparent pricing with no hidden charges</li>
                <li>✓ 24/7 customer support</li>
                <li>✓ Real-time GPS tracking</li>
                <li>✓ Multiple payment options</li>
                <li>🚺 <strong>Priority booking for women travelers</strong></li>
                <li>👴 <strong>Special assistance for senior citizens</strong></li>
              </ul>
            </motion.div>

            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop" 
                alt="YatraWheels team and vehicles"
                className="about-img"
              />
            </motion.div>
          </div>

          <motion.div 
            className="stats-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2>Our Achievements</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="mission-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2>Our Mission & Vision</h2>
            <div className="mission-grid">
              <div className="mission-card">
                <h4>Mission</h4>
                <p>
                  हमारा mission है India में हर traveler को safe, comfortable 
                  और affordable taxi service provide करना। हम technology और 
                  human touch का perfect combination बनाकर exceptional 
                  customer experience देने में committed हैं।
                </p>
              </div>
              <div className="mission-card">
                <h4>Vision</h4>
                <p>
                  YatraWheels को India की #1 taxi service बनाना है जहाँ 
                  customers को complete peace of mind मिले। हमारा vision है 
                  कि हर journey memorable और stress-free हो।
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage