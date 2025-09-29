import React, { useState } from 'react';
import odooAPI from '../services/odooAPI';

const DebugOdoo = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setResults(prev => [...prev, { message, type, timestamp }]);
  };

  const testAuthentication = async () => {
    setIsLoading(true);
    addResult('🔄 Testing Odoo Authentication...');
    
    try {
      const authResult = await odooAPI.authenticate();
      if (authResult.success) {
        addResult('✅ Authentication successful!', 'success');
      } else {
        addResult(`❌ Authentication failed: ${authResult.error}`, 'error');
      }
    } catch (error) {
      addResult(`❌ Authentication error: ${error.message}`, 'error');
    }
    
    setIsLoading(false);
  };

  const testCRMAccess = async () => {
    setIsLoading(true);
    addResult('🔄 Testing CRM access...');
    
    try {
      const crmResult = await odooAPI.testCRMAccess();
      if (crmResult.success) {
        addResult(`✅ CRM access successful! Found ${crmResult.partners.length} customers`, 'success');
      } else {
        addResult(`❌ CRM access failed: ${crmResult.error}`, 'error');
      }
    } catch (error) {
      addResult(`❌ CRM access error: ${error.message}`, 'error');
    }
    
    setIsLoading(false);
  };

  const testCustomerCreation = async () => {
    setIsLoading(true);
    addResult('🔄 Testing customer creation...');
    
    try {
      const testCustomer = {
        name: 'Test Customer Debug',
        email: `test${Date.now()}@example.com`,
        phone: '9876543210',
        address: 'Test Address'
      };
      
      const result = await odooAPI.createCustomer(testCustomer);
      if (result.success) {
        addResult(`✅ Customer created successfully! ID: ${result.customerId}`, 'success');
      } else {
        addResult(`❌ Customer creation failed: ${result.error}`, 'error');
      }
    } catch (error) {
      addResult(`❌ Customer creation error: ${error.message}`, 'error');
    }
    
    setIsLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  // Failed bookings viewer
  const [failedBookings, setFailedBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('failedBookings') || '[]') } catch { return [] }
  });

  // Failed inquiries viewer
  const [failedInquiries, setFailedInquiries] = useState(() => {
    try { return JSON.parse(localStorage.getItem('failedInquiries') || '[]') } catch { return [] }
  });

  const refreshFailed = () => {
    try { setFailedBookings(JSON.parse(localStorage.getItem('failedBookings') || '[]')) } catch { setFailedBookings([]) }
  }

  const clearFailed = () => {
    localStorage.removeItem('failedBookings')
    setFailedBookings([])
    addResult('Cleared saved failed bookings')
  }

  const refreshFailedInquiries = () => {
    try { setFailedInquiries(JSON.parse(localStorage.getItem('failedInquiries') || '[]')) } catch { setFailedInquiries([]) }
  }

  const clearFailedInquiries = () => {
    localStorage.removeItem('failedInquiries')
    setFailedInquiries([])
    addResult('Cleared saved failed inquiries')
  }

  const retryFailedInquiries = async () => {
    if (!failedInquiries.length) return addResult('No failed inquiries to retry')
    setIsLoading(true)
    addResult(`Retrying ${failedInquiries.length} failed inquiries...`)
    for (const item of failedInquiries) {
      try {
        const f = item.form || item
        // find or create customer
        let partner = null
        if (f.email) partner = await odooAPI.findCustomer(f.email)
        let partnerId = partner ? partner.id : null
        if (!partnerId) {
          const cust = await odooAPI.createCustomer({ name: f.name, email: f.email, phone: f.phone, address: f.message })
          if (!cust.success) throw new Error(cust.error || 'createCustomer failed')
          partnerId = cust.customerId
        }
        // create lead
        const leadPayload = { name: `Website Inquiry - ${f.name || ''}`, partner_id: partnerId, email_from: f.email, phone: f.phone, mobile: f.phone, description: f.message || 'Website inquiry', type: 'lead' }
        const leadId = await odooAPI.callOdoo('crm.lead', 'create', [leadPayload])
        // create sale
        const salePayload = { partner_id: partnerId, date_order: new Date().toISOString().slice(0,19).replace('T',' '), state: 'draft', note: `Website Inquiry: ${f.message || ''}` }
        const saleId = await odooAPI.callOdoo('sale.order', 'create', [salePayload])
        addResult(`Retried inquiry succeeded - lead:${leadId} sale:${saleId}`, 'success')
      } catch (err) {
        addResult(`Retry inquiry failed: ${err.message}`, 'error')
      }
    }
    clearFailedInquiries()
    setIsLoading(false)
  }

  const retryFailed = async () => {
    if (!failedBookings.length) return addResult('No failed bookings to retry')
    setIsLoading(true)
    addResult(`Retrying ${failedBookings.length} failed bookings...`)
    for (const item of failedBookings) {
      try {
        const res = await odooAPI.createBooking(item.bookingData)
        if (res.success) addResult(`Retried booking success - ID: ${res.bookingId}`, 'success')
        else addResult(`Retry failed: ${res.error}`, 'error')
      } catch (err) {
        addResult(`Retry threw error: ${err.message}`, 'error')
      }
    }
    // After retry attempt, clear stored
    clearFailed()
    setIsLoading(false)
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      width: '400px', 
      background: 'white', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '20px', 
      zIndex: 9999,
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h3>🛠️ Odoo Debug Panel</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={testAuthentication} 
          disabled={isLoading}
          style={{ margin: '5px', padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Test Auth
        </button>
        
        <button 
          onClick={testCRMAccess} 
          disabled={isLoading}
          style={{ margin: '5px', padding: '8px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Test CRM
        </button>
        
        <button 
          onClick={testCustomerCreation} 
          disabled={isLoading}
          style={{ margin: '5px', padding: '8px 12px', background: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}
        >
          Test Customer
        </button>
        
        <button
          onClick={async () => {
            setIsLoading(true);
            addResult('🔄 Performing RAW auth fetch (prints status, headers, body)...');

            try {
              const base = import.meta.env.PROD ? (import.meta.env.VITE_ODOO_BASE_URL || '') : '/api/odoo';
              const url = (base.endsWith('/') ? base + 'web/session/authenticate' : base + '/web/session/authenticate');

              const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  method: 'call',
                  params: {
                    db: (import.meta.env.VITE_ODOO_DATABASE || 'yatrawheels'),
                    login: import.meta.env.VITE_ODOO_USER_ID || '',
                    password: import.meta.env.VITE_ODOO_PASSWORD || ''
                  },
                  id: Date.now()
                })
              });

              // Status and headers
              addResult(`Response status: ${resp.status} ${resp.statusText}`);
              try {
                const headers = {};
                resp.headers.forEach((v, k) => { headers[k] = v });
                addResult(`Response headers: ${JSON.stringify(headers)}`);
              } catch (hErr) {
                addResult('Could not read response headers: ' + hErr.message, 'error');
              }

              // Try parse JSON, fallback to text
              let bodyText = '';
              try {
                const json = await resp.clone().json();
                bodyText = JSON.stringify(json, null, 2);
                addResult(`Response JSON:\n${bodyText}`);
              } catch (jErr) {
                try {
                  const text = await resp.text();
                  addResult(`Response text:\n${text}`);
                } catch (tErr) {
                  addResult('Could not read response body: ' + tErr.message, 'error');
                }
              }

            } catch (error) {
              addResult('Raw auth fetch error: ' + (error.message || String(error)), 'error');
            }

            setIsLoading(false);
          }}
          disabled={isLoading}
          style={{ margin: '5px', padding: '8px 12px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Raw Auth Test
        </button>
        
        <button 
          onClick={clearResults}
          style={{ margin: '5px', padding: '8px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Saved failed bookings</h4>
        <div style={{ maxHeight: 120, overflow: 'auto', background: '#f7f7f7', padding: 8, borderRadius: 6 }}>
          {failedBookings.length === 0 ? (
            <div style={{ fontSize: 12, color: '#666' }}>No saved failed bookings</div>
          ) : failedBookings.map((fb, i) => (
            <div key={i} style={{ marginBottom: 6, fontSize: 12 }}>
              <div><strong>{new Date(fb.ts).toLocaleString()}</strong> — {fb.error || 'Saved'}</div>
              <div style={{ fontSize: 11, color: '#333' }}>{fb.bookingData.name} • {fb.bookingData.phone} • ₹{fb.bookingData.totalAmount}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8 }}>
          <button onClick={refreshFailed} style={{ marginRight: 8 }}>Refresh</button>
          <button onClick={retryFailed} style={{ marginRight: 8 }}>Retry All</button>
          <button onClick={clearFailed}>Clear</button>
        </div>
      </div>

      <div style={{ maxHeight: '300px', overflow: 'auto' }}>
        {results.map((result, index) => (
          <div 
            key={index} 
            style={{ 
              padding: '8px', 
              margin: '5px 0', 
              borderRadius: '4px',
              fontSize: '12px',
              background: result.type === 'error' ? '#f8d7da' : 
                         result.type === 'success' ? '#d4edda' : '#e2e3e5',
              color: result.type === 'error' ? '#721c24' : 
                     result.type === 'success' ? '#155724' : '#383d41'
            }}
          >
            <small>{result.timestamp}</small><br />
            {result.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugOdoo;