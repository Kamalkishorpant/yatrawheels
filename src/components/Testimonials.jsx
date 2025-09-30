import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Business Traveler, Mumbai", 
    rating: 5,
    comment: "Had a conference in Mumbai and needed reliable transport from Delhi. The driver was professional, car was clean, and we reached 15 minutes early! The AC worked perfectly throughout the 18-hour journey. Will definitely book again for business trips.",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Family Trip, Jaipur",
    rating: 4,
    comment: "Took the family to Rajasthan for our vacation. Booked a Scorpio and it was spacious enough for all 6 of us plus luggage. Driver bhai was very helpful - he knew all the good local restaurants and even waited while we shopped at Johari Bazaar. Only issue was the GPS wasn't working properly, but driver knew the routes well.",
    avatar: "https://images.unsplash.com/photo-1664574654529-b60630f33fdb?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Wedding Function, Ahmedabad",
    rating: 5,
    comment: "Booked an Innova for my cousin's wedding in Ahmedabad. Car arrived exactly on time, was decorated beautifully, and the driver even helped with loading the gifts. The best part? The fare was 20% less than other operators I called. Definitely recommending to all my relatives!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Sunita Reddy",
    role: "Airport Transfer, Hyderabad",
    rating: 5,
    comment: "My flight was delayed till 1 AM and I was worried about getting home safely. The driver waited patiently without any extra charges and drove very carefully through the empty roads. He even had water bottles and phone charger in the car. Such thoughtful service!",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Hill Station Trip, Shimla",
    rating: 4,
    comment: "Went to Shimla with friends in a Bolero. The driver was experienced with hill driving which was important for us city folks! He took us to some amazing viewpoints that weren't in our itinerary. Car handled the mountain roads perfectly. Just wish they had provided some snacks for the long journey!",
    avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Kavita Joshi",
    role: "Daily Office Commute, Pune",
    rating: 5,
    comment: "I book with YatraWheels for my office commute 3 times a week. The drivers are always punctual and the cars are well-maintained. The booking app is simple to use and they send SMS confirmations. Much better than dealing with auto rickshaw hassles every day!",
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