# 🚗 **Odoo Website Integration Guide**

## 📋 **Overview**
Deploy your React Taxi Booking App directly to your Odoo website at `https://yourcar.odoo.com/taxi`

## 🎯 **Files Ready for Upload**
All files in the `dist/` folder are ready for Odoo deployment:
```
dist/
├── index.html          # Main page template
├── assets/
    ├── index-f091af2f.js    # React app bundle  
    ├── index-a528e472.css   # Styles
    └── index-f091af2f.js.map # Source map
```

## 🚀 **Step-by-Step Deployment**

### **Method 1: Website Builder (Recommended)**

1. **Access Odoo Website Builder**
   - Go to `https://yourcar.odoo.com`
   - Login as Administrator
   - Go to **Website → Website Builder**

2. **Create New Page**
   - Click **+ NEW** → **Page**
   - Page Title: `Taxi Booking`
   - URL: `/taxi`
   - Click **CREATE**

3. **Upload Static Assets**
   - Go to **Website → Configuration → Website Settings**
   - Scroll to **Static Files/Assets**
   - Upload the following files:
     ```
     assets/index-f091af2f.js    → /taxi/assets/index.js
     assets/index-a528e472.css   → /taxi/assets/index.css
     ```

4. **Set Page Content**
   - Edit the `/taxi` page
   - Switch to **HTML Mode** (</> icon)
   - Replace content with the HTML from `dist/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YatraWheels - Taxi Booking Service</title>
    <script type="module" crossorigin src="/taxi/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="/taxi/assets/index.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### **Method 2: File Manager Upload**

1. **Access File Manager**
   - In Odoo, go to **Apps → Technical → File Manager**
   - Or install the "Website Files" module

2. **Create Directory Structure**
   ```
   /website/static/taxi/
   ├── index.html
   ├── assets/
       ├── index.js
       ├── index.css
       └── index.js.map
   ```

3. **Upload Files**
   - Upload `dist/index.html` to `/website/static/taxi/`
   - Upload all files from `dist/assets/` to `/website/static/taxi/assets/`

4. **Create Website Menu**
   - Go to **Website → Configuration → Menus**
   - Add new menu item:
     - Name: "Book Taxi"
     - URL: `/taxi`
     - Parent Menu: Main Menu

### **Method 3: Direct Database Upload**

1. **Access Technical Settings**
   - Enable Developer Mode
   - Go to **Settings → Technical → Database Structure → Models**
   - Search for `website.page`

2. **Create New Website Page Record**
   ```python
   {
       'name': 'Taxi Booking',
       'url': '/taxi',
       'website_published': True,
       'view_id': [CREATE NEW ir.ui.view with your HTML content]
   }
   ```

## 🔧 **Configuration Requirements**

### **1. CORS Headers (Critical)**
Add these headers to your Odoo server configuration:

```python
# In your Odoo addon or server config
@http.route('/taxi', type='http', auth='public', website=True, csrf=False)
def taxi_page(self, **kwargs):
    response = request.render('your_module.taxi_template')
    response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true'
    })
    return response
```

### **2. Environment Variables**
Ensure these are set in your production environment:
```bash
VITE_ODOO_URL=https://yourcar.odoo.com
VITE_ODOO_DATABASE=yourcar
VITE_ODOO_USERNAME=your-api-user
VITE_ODOO_PASSWORD=your-api-password
```

### **3. API User Setup**
Create a dedicated API user in Odoo:
1. **Users & Companies → Users**
2. **Create** new user with:
   - Login: `taxi-api-user`
   - Access Rights: Sales, CRM, Contacts
   - API Access: ✅ Enabled

## 🧪 **Testing Your Deployment**

1. **Visit Your Page**
   - Go to `https://yourcar.odoo.com/taxi`
   - Verify the page loads correctly

2. **Test Booking Flow**
   - Fill out the booking form
   - Submit a test booking
   - Check if customer and booking are created in Odoo

3. **Verify Data Integration**
   - **Customers**: Apps → Sales → Customers
   - **Bookings**: Apps → CRM → Opportunities
   - **Activities**: Apps → Activities

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **CSS/JS Not Loading**
   - Check file paths in `index.html`
   - Ensure static files are uploaded correctly
   - Verify file permissions

2. **API Calls Failing**
   - Check CORS headers
   - Verify API user credentials
   - Test Odoo API endpoints manually

3. **Page Not Found**
   - Ensure website page is published
   - Check URL mapping
   - Verify menu configuration

### **Debug Mode:**
Enable debug mode by adding `?debug=1` to any URL:
`https://yourcar.odoo.com/taxi?debug=1`

## 📱 **Mobile Optimization**
The app is mobile-responsive and will work on all devices accessing your Odoo website.

## 🔐 **Security Considerations**
- API credentials are environment-based
- All data flows through Odoo's security layer
- User authentication handled by Odoo sessions

## 🎉 **Success!**
Your taxi booking app is now live at:
**`https://yourcar.odoo.com/taxi`**

Customers can book taxis directly from your website, and all data flows into your Odoo CRM and customer database!