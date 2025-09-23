import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Business Traveler, Mumbai",
    rating: 5,
    comment: "Excellent service! Delhi to Mumbai trip was very comfortable. Driver was experienced and reached on time. Highly recommend YatraWheels!",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Family Trip, Jaipur",
    rating: 5,
    comment: "Booked Scorpio for family Rajasthan tour. Very spacious and comfortable. Driver showed us all famous places. Value for money!",
    avatar: "https://images.unsplash.com/photo-1664574654529-b60630f33fdb?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Wedding Function, Ahmedabad",
    rating: 5,
    comment: "Booked Innova for wedding. Very clean and well-maintained car. On-time service and reasonable price. YatraWheels is the best!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Sunita Reddy",
    role: "Airport Transfer, Hyderabad",
    rating: 5,
    comment: "Had to go home from Hyderabad airport late night. Driver was punctual and drove safely. AC was also good. Thank you YatraWheels team!",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Hill Station Trip, Shimla",
    rating: 5,
    comment: "Delhi to Shimla trip in Mahindra Bolero. Got expert hill driving driver. Very good experience. Value for money service!",
    avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Kavita Joshi",
    role: "Daily Office Commute, Pune",
    rating: 5,
    comment: "Book daily taxi for office. Always comes on time and polite drivers. Booking process is also simple. Recommended!",
    avatar: "https://images.unsplash.com/photo-1594736797933-d0f06ba42378?w=100&h=100&fit=crop&crop=face"
  }
]

const TestimonialCard = ({ testimonial, index }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'star filled' : 'star'} 
      />
    ))
  }

  return (
    <motion.div 
      className="testimonial-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="testimonial-header">
        <Quote className="quote-icon" size={24} />
        <div className="rating">
          {renderStars(testimonial.rating)}
        </div>
      </div>
      
      <p className="testimonial-text">"{testimonial.comment}"</p>
      
      <div className="testimonial-author">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="author-avatar"
        />
        <div className="author-info">
          <h4>{testimonial.name}</h4>
          <span>{testimonial.role}</span>
        </div>
      </div>
    </motion.div>
  )
}

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>हमारे ग्राहकों की राय / Customer Reviews</h2>
          <p>Satisfied customers ki authentic reviews देखिये</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>

        <div className="testimonials-grid">
          {testimonials.slice(3, 6).map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index + 3}
            />
          ))}
        </div>

        <motion.div 
          className="testimonial-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="stat">
            <h3>4.8/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat">
            <h3>50,000+</h3>
            <p>खुश ग्राहक / Happy Customers</p>
          </div>
          <div className="stat">
            <h3>200+</h3>
            <p>शहर / Cities Covered</p>
          </div>
          <div className="stat">
            <h3>1000+</h3>
            <p>टैक्सी / Taxi Fleet</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials