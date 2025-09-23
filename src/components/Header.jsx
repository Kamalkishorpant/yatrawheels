import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Car } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#taxis', label: 'Our Fleet' },
    { href: '#routes', label: 'Routes' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
              <nav className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
          <a href="#services" className="text-gray-700 hover:text-orange-600 transition-colors">Services</a>
          <a href="#fleet" className="text-gray-700 hover:text-orange-600 transition-colors">Our Fleet</a>
          <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
          <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
        </nav>
    </motion.header>
  )
}

export default Header