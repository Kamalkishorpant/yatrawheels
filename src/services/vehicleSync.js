import odooAPI from './odooAPI'

// Vehicle synchronization service
class VehicleSyncService {
  constructor() {
    this.lastSync = null
    this.syncInterval = 30 * 60 * 1000 // 30 minutes
  }

  // Sync vehicles from Odoo Fleet to local data
  async syncVehiclesFromOdoo() {
    try {
      console.log('Syncing vehicles from Odoo Fleet...')
      
      // Get vehicles from Odoo Fleet module
      const odooVehicles = await odooAPI.getAvailableVehicles()
      
      if (!odooVehicles || odooVehicles.length === 0) {
        console.warn('No vehicles found in Odoo Fleet')
        return { success: false, message: 'No vehicles found in Odoo' }
      }

      // Transform Odoo data to match our React app format
      const transformedVehicles = odooVehicles.map(vehicle => ({
        id: vehicle.id,
        make: vehicle.model_id?.[1]?.split(' ')[0] || 'Unknown',
        model: vehicle.model_id?.[1]?.split(' ').slice(1).join(' ') || 'Model',
        year: new Date().getFullYear() - 2, // Default to 2 years old
        type: this.getVehicleType(vehicle.model_id?.[1] || ''),
        seats: this.getSeats(vehicle.model_id?.[1] || ''),
        fuel: 'Petrol', // Default, should be in Odoo custom field
        transmission: 'Manual', // Default
        price: this.calculatePrice(vehicle.model_id?.[1] || ''),
        image: this.getVehicleImage(vehicle.model_id?.[1] || ''),
        features: ['AC', 'Driver Included', 'GPS Tracking'],
        location: vehicle.location || 'Jaipur',
        licensePlate: vehicle.license_plate || 'TBD',
        isAvailable: vehicle.state_id?.name !== 'Maintenance',
        odooId: vehicle.id
      }))

      this.lastSync = new Date()
      
      return {
        success: true,
        vehicles: transformedVehicles,
        count: transformedVehicles.length,
        lastSync: this.lastSync
      }
      
    } catch (error) {
      console.error('Vehicle sync error:', error)
      return { 
        success: false, 
        error: error.message,
        fallbackToLocal: true
      }
    }
  }

  // Helper function to determine vehicle type
  getVehicleType(modelName) {
    const name = modelName.toLowerCase()
    if (name.includes('alto') || name.includes('swift')) return 'Hatchback'
    if (name.includes('innova') || name.includes('ertiga')) return 'MPV'
    if (name.includes('scorpio') || name.includes('xuv')) return 'SUV'
    if (name.includes('dzire') || name.includes('aspire')) return 'Sedan'
    return 'Hatchback'
  }

  // Helper function to determine seating capacity
  getSeats(modelName) {
    const name = modelName.toLowerCase()
    if (name.includes('innova')) return 7
    if (name.includes('scorpio') || name.includes('xuv')) return 7
    if (name.includes('ertiga')) return 7
    return 4
  }

  // Helper function to calculate price based on vehicle type
  calculatePrice(modelName) {
    const name = modelName.toLowerCase()
    if (name.includes('alto')) return 12
    if (name.includes('swift')) return 15
    if (name.includes('dzire')) return 18
    if (name.includes('innova')) return 25
    if (name.includes('scorpio')) return 22
    if (name.includes('xuv')) return 24
    return 15 // Default price per 100km
  }

  // Helper function to get appropriate vehicle image
  getVehicleImage(modelName) {
    const name = modelName.toLowerCase()
    
    // Map to appropriate Indian car images
    const imageMap = {
      'alto': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=250&fit=crop',
      'swift': 'https://images.unsplash.com/photo-1549399087-7e1c70431fce?w=400&h=250&fit=crop',
      'dzire': 'https://images.unsplash.com/photo-1549399087-7e1c70431fce?w=400&h=250&fit=crop',
      'innova': 'https://images.unsplash.com/photo-1611015830912-bf5ec8a2de83?w=400&h=250&fit=crop',
      'scorpio': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop',
      'xuv': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop'
    }

    for (const [key, image] of Object.entries(imageMap)) {
      if (name.includes(key)) return image
    }

    // Default image
    return 'https://images.unsplash.com/photo-1549399087-7e1c70431fce?w=400&h=250&fit=crop'
  }

  // Update vehicle availability in Odoo
  async updateVehicleAvailability(vehicleId, isAvailable) {
    try {
      const stateId = isAvailable ? 1 : 2 // 1 = Available, 2 = Maintenance
      
      await odooAPI.callOdoo('fleet.vehicle', 'write', [
        [vehicleId],
        { state_id: stateId }
      ])

      return { success: true }
    } catch (error) {
      console.error('Update vehicle availability error:', error)
      return { success: false, error: error.message }
    }
  }

  // Check if sync is needed
  shouldSync() {
    if (!this.lastSync) return true
    return (Date.now() - this.lastSync.getTime()) > this.syncInterval
  }

  // Start auto-sync
  startAutoSync(callback) {
    if (this.shouldSync()) {
      this.syncVehiclesFromOdoo().then(callback)
    }

    // Set up periodic sync
    setInterval(() => {
      this.syncVehiclesFromOdoo().then(callback)
    }, this.syncInterval)
  }
}

// Create singleton instance
const vehicleSyncService = new VehicleSyncService()

export default vehicleSyncService