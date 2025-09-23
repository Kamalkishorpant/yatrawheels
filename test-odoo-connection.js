// Quick Odoo Connection Test (Updated for Proxy)
async function testOdooConnection() {
  try {
    console.log('🔍 Testing Odoo Connection via Proxy...');
    
    const response = await fetch('/api/odoo/web/session/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          db: 'yourcar',
          login: 'kamal9@emails.emizentech.com',
          password: 'Kartik@123',
        },
        id: 1,
      }),
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (data.result && data.result.uid) {
      console.log('✅ SUCCESS: Connected to Odoo via Proxy!');
      console.log('- User ID:', data.result.uid);
      return true;
    } else {
      console.log('❌ FAILED: Check credentials');
      console.log('- Error:', data.error);
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return false;
  }
}

// Run the test
testOdooConnection();