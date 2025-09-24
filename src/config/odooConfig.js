// Odoo API Configuration
export const ODOO_CONFIG = {
  baseURL: import.meta.env.PROD 
    ? '' // Use same origin in production (served from Odoo)
    : '/api/odoo',  // Use proxy in development
  database: 'yourcar', // Your database name
  // Note: You'll need to get these from your Odoo instance
  apiKey: import.meta.env.VITE_ODOO_API_KEY || '', // Set this in .env file
  userId: import.meta.env.VITE_ODOO_USER_ID || '', // Your user ID
  password: import.meta.env.VITE_ODOO_PASSWORD || '', // Your password or API token
}

// API Endpoints
export const ODOO_ENDPOINTS = {
  auth: '/web/session/authenticate',
  customers: '/api/res.partner',
  bookings: '/api/sale.order',
  vehicles: '/api/fleet.vehicle',
  fleet: '/api/fleet.vehicle.model',
  trips: '/api/project.task', // Using project tasks for trip management
  invoices: '/api/account.move',
}

// Odoo Model Names
export const ODOO_MODELS = {
  PARTNER: 'res.partner',
  SALE_ORDER: 'sale.order',
  SALE_ORDER_LINE: 'sale.order.line',
  FLEET_VEHICLE: 'fleet.vehicle',
  FLEET_MODEL: 'fleet.vehicle.model',
  PROJECT_TASK: 'project.task',
  ACCOUNT_MOVE: 'account.move',
  CRM_LEAD: 'crm.lead', // Added CRM Lead model
}