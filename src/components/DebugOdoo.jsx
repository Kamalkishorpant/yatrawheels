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
          onClick={clearResults}
          style={{ margin: '5px', padding: '8px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Clear
        </button>
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