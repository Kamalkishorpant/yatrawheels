import { ODOO_CONFIG, ODOO_MODELS } from '../config/odooConfig'

class OdooAPIService {
  constructor() {
    // In production use VITE_ODOO_BASE_URL if provided.
    // In development always use the local proxy at /api/odoo to avoid CORS/credentials issues
    if (import.meta.env.PROD) {
      this.baseURL = import.meta.env.VITE_ODOO_BASE_URL || ''
    } else {
      this.baseURL = '/api/odoo'
    }
    this.sessionId = null
    this.isAuthenticated = false
    this.cookies = null // Store session cookies
    this.authPromise = null // Prevent multiple simultaneous auth attempts
  }

  // Authentication with Odoo
  async authenticate() {
    // If already authenticating, wait for that to complete
    if (this.authPromise) {
      return this.authPromise;
    }

    // If already authenticated, return success
    if (this.isAuthenticated && this.sessionId) {
      return { success: true, sessionId: this.sessionId };
    }

    // Start new authentication
    this.authPromise = this._performAuthentication();
    const result = await this.authPromise;
    this.authPromise = null;
    return result;
  }

  async _performAuthentication() {
    try {
      console.log('🔐 Authenticating with Odoo...');

      const authUrl = this.baseURL && this.baseURL.endsWith('/')
        ? `${this.baseURL}web/session/authenticate`
        : `${this.baseURL}/web/session/authenticate`

      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: Include cookies
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            db: ODOO_CONFIG.database,
            login: import.meta.env.VITE_ODOO_USER_ID || ODOO_CONFIG.userId,
            password: import.meta.env.VITE_ODOO_PASSWORD || ODOO_CONFIG.password,
          },
          id: Math.floor(Math.random() * 1000000),
        }),
      })
      let data
      try {
        data = await response.json()
      } catch (err) {
        const text = await response.text().catch(() => '')
        throw new Error(`Non-JSON auth response: ${response.status} ${response.statusText} ${text}`)
      }
      console.log('🔗 Auth Response:', data);
      
      if (data.result && data.result.uid) {
        this.sessionId = data.result.session_id
        this.isAuthenticated = true
        
        // Store cookies from response
        const setCookieHeader = response.headers.get('set-cookie');
        if (setCookieHeader) {
          this.cookies = setCookieHeader;
        }
        
        console.log('✅ Authentication successful - Session ID:', this.sessionId);
        return { success: true, userId: data.result.uid, sessionId: this.sessionId }
      } else {
        throw new Error(data.error?.message || data.error || 'Authentication failed')
      }
    } catch (error) {
      console.error('❌ Odoo Authentication Error:', error)
      this.isAuthenticated = false
      this.sessionId = null
      this.cookies = null
      return { success: false, error: error.message }
    }
  }

  // Generic method to call Odoo API
  async callOdoo(model, method, args = [], kwargs = {}) {
    // Always ensure we're authenticated before making API calls
    const authResult = await this.authenticate();
    if (!authResult.success) {
      throw new Error('Authentication failed: ' + authResult.error);
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      // Add session cookie if available
      if (this.cookies) {
        headers['Cookie'] = this.cookies;
      }

      const callUrl = this.baseURL && this.baseURL.endsWith('/')
        ? `${this.baseURL}web/dataset/call_kw`
        : `${this.baseURL}/web/dataset/call_kw`

      const response = await fetch(callUrl, {
        method: 'POST',
        headers,
        credentials: 'include', // Important: Include cookies
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model: model,
            method: method,
            args: args,
            kwargs: kwargs,
          },
          id: Math.floor(Math.random() * 1000000),
        }),
      })

      let data
      try {
        data = await response.json()
      } catch (err) {
        const text = await response.text().catch(() => '')
        throw new Error(`Non-JSON API response: ${response.status} ${response.statusText} ${text}`)
      }

      console.log('🔗 Odoo API Response:', data);
      
      if (data.error) {
        // Check if session expired
        if (data.error.code === 100 || data.error.message?.includes('Session expired')) {
          console.log('🔄 Session expired, re-authenticating...');
          this.isAuthenticated = false;
          this.sessionId = null;
          this.cookies = null;
          
          // Retry once after re-authentication
          const retryAuthResult = await this.authenticate();
          if (retryAuthResult.success) {
            console.log('🔄 Retrying API call after re-authentication...');
            return this.callOdoo(model, method, args, kwargs);
          }
        }
        
        console.error('❌ Odoo API Error Details:', data.error);
        throw new Error(data.error.data?.message || data.error.message || 'Odoo API Error')
      }
      
      return data.result
    } catch (error) {
      console.error('❌ Odoo API Call Error:', error)
      throw error
    }
  }

  // Customer Management
  async createCustomer(customerData) {
    try {
      console.log('🔄 Creating customer in Odoo:', customerData);
      
      // Simplified customer data for initial creation
      const customerPayload = {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        is_company: false,
        customer_rank: 1,
      };
      
      // Add optional fields only if they exist
      if (customerData.mobile && customerData.mobile !== customerData.phone) {
        customerPayload.mobile = customerData.mobile;
      }
      if (customerData.address) {
        customerPayload.street = customerData.address;
      }
      
      console.log('📤 Sending customer payload:', customerPayload);
      
      const customerId = await this.callOdoo(ODOO_MODELS.PARTNER, 'create', [customerPayload]);
      
      console.log('✅ Customer created with ID:', customerId);
      return { success: true, customerId };
    } catch (error) {
      console.error('❌ Create Customer Error - Full Details:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Customer data that failed:', customerData);
      // Include any nested error info if available
      const extra = error.response || error.data || error.error || null
      return { success: false, error: error.message || String(error), extra };
    }
  }

  // Test function to check CRM access
  async testCRMAccess() {
    try {
      console.log('🧪 Testing CRM access...');
      
      // Try to search for existing partners (customers)
      const partners = await this.callOdoo(ODOO_MODELS.PARTNER, 'search_read', [
        [['customer_rank', '>', 0]]
      ], {
        fields: ['id', 'name', 'email'],
        limit: 5
      });
      
      console.log('✅ CRM access successful. Found partners:', partners);
      return { success: true, partners };
    } catch (error) {
      console.error('❌ CRM access failed:', error);
      return { success: false, error: error.message };
    }
  }

  // CRM Lead Management
  async createLead(leadData) {
    try {
      console.log('🔄 Creating lead in Odoo CRM:', leadData);
      
      const leadPayload = {
        name: `Taxi Booking Inquiry - ${leadData.vehicleType}`,
        partner_name: leadData.name,
        email_from: leadData.email,
        phone: leadData.phone,
        mobile: leadData.phone,
        description: `
Taxi Booking Request:
- Vehicle: ${leadData.vehicleType}
- Pickup: ${leadData.pickupLocation}
- Destination: ${leadData.dropLocation || 'TBD'}
- Pickup Date: ${leadData.pickupDate}
- Return Date: ${leadData.returnDate}
- Total Amount: ₹${leadData.totalAmount}
- Payment Method: ${leadData.paymentMethod}
        `.trim(),
        stage_id: 1, // New lead stage
        team_id: 1, // Sales team (adjust if needed)
        type: 'opportunity',
        priority: '1', // Normal priority
      };
      
      console.log('📤 Creating lead with payload:', leadPayload);
      
      const leadId = await this.callOdoo(ODOO_MODELS.CRM_LEAD, 'create', [leadPayload]);
      
      console.log('✅ Lead created with ID:', leadId);
      return { success: true, leadId };
    } catch (error) {
      console.error('❌ Create Lead Error:', error);
      return { success: false, error: error.message };
    }
  }

  async findCustomer(email) {
    try {
      const customers = await this.callOdoo(ODOO_MODELS.PARTNER, 'search_read', [
        [['email', '=', email]]
      ], {
        fields: ['id', 'name', 'email', 'phone', 'mobile']
      })
      return customers.length > 0 ? customers[0] : null
    } catch (error) {
      console.error('Find Customer Error:', error)
      return null
    }
  }

  // Booking Management
  async createBooking(bookingData) {
    try {
      console.log('🔄 Creating booking in Odoo:', bookingData);
      
      // First, find or create customer
      let customer = await this.findCustomer(bookingData.email)
      if (!customer) {
        const customerResult = await this.createCustomer(bookingData)
        if (!customerResult.success) {
          throw new Error('Failed to create customer')
        }
        customer = { id: customerResult.customerId }
      }

      console.log('✅ Customer ready:', customer);

      // Helper function to format date for Odoo
      const formatDateForOdoo = (dateString) => {
        if (!dateString) return new Date().toISOString().slice(0, 19).replace('T', ' ');
        // If already in correct format, return as is
        if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
          return dateString;
        }
        // Convert ISO string to Odoo format
        return new Date(dateString).toISOString().slice(0, 19).replace('T', ' ');
      };

      // Create sales order for the booking
      const orderPayload = {
        partner_id: customer.id,
        date_order: formatDateForOdoo(new Date().toISOString()),
        state: 'draft',
        note: `Taxi Booking - ${bookingData.pickupLocation} to ${bookingData.dropLocation || 'TBD'}`,
      };

      // Add custom fields only if they don't cause issues
      // We'll keep it simple for now and avoid custom fields that might not exist
      console.log('📤 Creating sales order with payload:', orderPayload);

      const orderId = await this.callOdoo(ODOO_MODELS.SALE_ORDER, 'create', [orderPayload])

      console.log('✅ Sales order created with ID:', orderId);

      // Create order line for the service
      const orderLinePayload = {
        order_id: orderId,
        name: `Taxi Service - ${bookingData.vehicleType}`,
        product_uom_qty: 1,
        price_unit: bookingData.totalAmount || 0,
      };

      console.log('📤 Creating order line with payload:', orderLinePayload);

      await this.callOdoo(ODOO_MODELS.SALE_ORDER_LINE, 'create', [orderLinePayload])

      console.log('✅ Order line created successfully');

      // Also create a CRM lead for tracking
      console.log('🔄 Creating CRM lead...');
      const leadResult = await this.createLead(bookingData);
      if (leadResult.success) {
        console.log('✅ CRM lead created:', leadResult.leadId);
      } else {
        console.log('⚠️ CRM lead creation failed (booking still successful):', leadResult.error);
      }

      return { 
        success: true, 
        bookingId: orderId,
        leadId: leadResult.success ? leadResult.leadId : null,
        message: 'Booking created successfully in Odoo'
      }
    } catch (error) {
      console.error('❌ Create Booking Error:', error)
      return { success: false, error: error.message }
    }
  }

  // Fleet Management
  async getAvailableVehicles(location, date) {
    try {
      const vehicles = await this.callOdoo(ODOO_MODELS.FLEET_VEHICLE, 'search_read', [
        [['state_id.name', '!=', 'Maintenance']]
      ], {
        fields: ['id', 'name', 'model_id', 'license_plate', 'state_id', 'location']
      })
      
      // Filter by location if provided
      return vehicles.filter(vehicle => 
        !location || vehicle.location === location
      )
    } catch (error) {
      console.error('Get Vehicles Error:', error)
      return []
    }
  }

  // Trip Management
  async createTrip(bookingId, driverData) {
    try {
      const taskId = await this.callOdoo(ODOO_MODELS.PROJECT_TASK, 'create', [{
        name: `Trip for Booking #${bookingId}`,
        x_booking_id: bookingId,
        x_driver_name: driverData.name,
        x_driver_phone: driverData.phone,
        x_vehicle_number: driverData.vehicleNumber,
        stage_id: 1, // Initial stage
        user_id: driverData.userId || false,
      }])

      return { success: true, tripId: taskId }
    } catch (error) {
      console.error('Create Trip Error:', error)
      return { success: false, error: error.message }
    }
  }

  // Get booking status
  async getBookingStatus(bookingId) {
    try {
      const booking = await this.callOdoo(ODOO_MODELS.SALE_ORDER, 'read', [bookingId], {
        fields: ['state', 'x_booking_status', 'amount_total', 'partner_id']
      })
      return booking.length > 0 ? booking[0] : null
    } catch (error) {
      console.error('Get Booking Status Error:', error)
      return null
    }
  }
}

// Create singleton instance
const odooAPI = new OdooAPIService()

export default odooAPI