import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedCars from './components/FeaturedCars'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import InquiryModal from './components/InquiryModal'
import { carsData } from './data/carsData'
import vehicleSyncService from './services/vehicleSync'

function App() {
  const [cars, setCars] = useState(carsData)
  const [filteredCars, setFilteredCars] = useState(carsData)
  const [selectedCar, setSelectedCar] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState('Using local data')

  // Sync vehicles from Odoo on component mount
  useEffect(() => {
    const syncVehicles = async () => {
      setIsLoading(true)
      setSyncStatus('Syncing with Odoo...')
      
      const result = await vehicleSyncService.syncVehiclesFromOdoo()
      
      if (result.success) {
        setCars(result.vehicles)
        setFilteredCars(result.vehicles)
        setSyncStatus(`Synced ${result.count} vehicles from Odoo`)
      } else {
        // Fallback to local data if Odoo sync fails
        setSyncStatus('Using local data (Odoo sync failed)')
        console.warn('Odoo sync failed, using local data:', result.error)
      }
      
      setIsLoading(false)
    }

    syncVehicles()

    // Show inquiry modal on first visit
    try {
      const shown = localStorage.getItem('inquiryShown')
      if (!shown) setIsInquiryOpen(true)
    } catch (e) {}

    // Start auto-sync
    vehicleSyncService.startAutoSync((result) => {
      if (result.success) {
        setCars(result.vehicles)
        setFilteredCars(result.vehicles)
        setSyncStatus(`Auto-synced ${result.count} vehicles`)
      }
    })
  }, [])

  const handleSearch = (searchCriteria) => {
    let filtered = cars

    if (searchCriteria.location) {
      // In a real app, this would filter by location
      filtered = filtered.filter(car => 
        car.location?.toLowerCase().includes(searchCriteria.location.toLowerCase())
      )
    }

    if (searchCriteria.carType && searchCriteria.carType !== 'all') {
      filtered = filtered.filter(car => car.type === searchCriteria.carType)
    }

    if (searchCriteria.priceRange) {
      const [min, max] = searchCriteria.priceRange
      filtered = filtered.filter(car => car.price >= min && car.price <= max)
    }

    setFilteredCars(filtered)
  }

  const handleBookCar = (car) => {
    console.log('handleBookCar invoked for car:', car)
    setSelectedCar(car)
    setIsBookingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingModalOpen(false)
    setSelectedCar(null)
  }

  return (
    <Router basename={import.meta.env.PROD ? '/shop' : '/'}>
      <div className="App">
        <Header />
        
        {/* Sync Status Indicator */}
        {isLoading && (
          <div style={{ 
            background: 'orange', 
            color: 'white', 
            padding: '8px', 
            textAlign: 'center',
            fontSize: '14px'
          }}>
            {syncStatus}
          </div>
        )}
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero onSearch={handleSearch} />
              <FeaturedCars cars={filteredCars} onBookCar={handleBookCar} />
              <Testimonials />
            </>
          } />
          <Route path="/contact" element={<React.Suspense fallback={<div>Loading...</div>}><div style={{padding:20}}><h2>Contact Us</h2></div></React.Suspense>} />
          <Route path="/special-request" element={<React.Suspense fallback={<div>Loading...</div>}><div style={{padding:20}}><h2>Special Request</h2></div></React.Suspense>} />
        </Routes>
        <Footer />
        
        {isBookingModalOpen && (
          <BookingModal 
            car={selectedCar} 
            onClose={handleCloseModal}
          />
        )}
        {isInquiryOpen && (
          <InquiryModal visible={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
        )}
        
  {/* Debug Panel removed */}
      </div>
    </Router>
  )
}

export default App