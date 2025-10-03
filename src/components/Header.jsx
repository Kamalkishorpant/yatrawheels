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

  // Handle escape key and focus management
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent background scrolling when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/fleet', label: 'Our Fleet' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Skip Navigation Link for Screen Readers */}
      <a 
        href="#main-content" 
        className="skip-nav"
        onFocus={(e) => e.target.style.transform = 'translateY(0)'}
        onBlur={(e) => e.target.style.transform = 'translateY(-100%)'}
      >
        Skip to main content
      </a>
      
      <motion.header 
        className={`header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        role="banner"
      >
      <nav className="nav" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link 
          to="/" 
          className="logo"
          aria-label="YatraWheels - Home page"
        >
          <img 
            src="/yatrawheels-logo.svg" 
            alt="YatraWheels Logo" 
            className="logo-image"
            width="40" 
            height="30" 
          />
          <span>YatraWheels</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-menu" role="menubar">
          {navItems.map((item, index) => (
            <li key={index} role="none">
              <Link
                to={item.href} 
                className="nav-link"
                role="menuitem"
                aria-label={`Navigate to ${item.label} page`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.target.click()
                  }
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onKeyDown={(e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
              setIsMobileMenuOpen(false)
            }
          }}
        >
          {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>

        {/* Mobile Navigation */}
        <motion.div 
          id="mobile-navigation"
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            x: isMobileMenuOpen ? '0%' : '100%'
          }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsMobileMenuOpen(false)
            }
          }}
        >
          <ul className="mobile-nav-menu" role="menu">
            {navItems.map((item, index) => (
              <li key={index} role="none">
                <Link
                  to={item.href} 
                  className="mobile-nav-link"
                  role="menuitem"
                  aria-label={`Navigate to ${item.label} page`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.target.click()
                    }
                    if (e.key === 'Tab' && index === navItems.length - 1) {
                      // Close menu when tabbing out of last item
                      setTimeout(() => setIsMobileMenuOpen(false), 100)
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
    </motion.header>
    </>
  )
}

export default Header