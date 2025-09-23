# Odoo Integration Setup Guide for YatraWheels Taxi Service

## 📋 Overview

This guide explains how to integrate the React Taxi Booking application with your Odoo website at `https://yourcar.odoo.com/taxi`. The integration is done via a custom Odoo module that hosts the React application.

## 📦 What's Included

- **Complete Odoo Module**: Ready-to-install module with all necessary components
- **Pre-built React App**: Optimized for production with correct base path
- **API Integration**: CORS headers and controllers for proper API access
- **Website Integration**: Automatic menu and page creation

## 🚀 Installation Instructions

### Method 1: Direct Module Installation (Recommended)

1. **Log in to Odoo**
   - Access your Odoo instance as administrator: `https://yourcar.odoo.com/web`

2. **Enable Developer Mode**
   - Go to Settings
   - Click on "Activate the developer mode" in the bottom right

3. **Install the Module**
   - Go to Apps → Menu (⋮) → Upload Module
   - Select the `odoo_taxi_module.zip` file
   - Click "Upload & Install"

4. **Configure Module**
   - Go to Website → Configuration → Settings
   - Ensure CORS is enabled for your domain
   - Save changes

5. **Access the Taxi Booking App**
   - Go to your website: `https://yourcar.odoo.com`
   - You'll see a new "Book Taxi" menu item
   - Click it to access the taxi booking application at `/taxi`

### Method 2: Manual Installation

1. **Extract Module**
   - Extract `odoo_taxi_module.zip` to get the `taxi_booking` folder

2. **Copy to Addons**
   - Copy the `taxi_booking` folder to your Odoo addons directory
   - Typical path: `/usr/lib/python3/dist-packages/odoo/addons/` or `/opt/odoo/addons/`

3. **Update Addons List**
   - Go to Apps → Update Apps List
   - Click "Update"

4. **Install Module**
   - Search for "Taxi Booking"
   - Click "Install"

## 🔧 Configuration Options

### Environment Variables

The module uses these environment variables in production:

```
VITE_ODOO_URL=https://yourcar.odoo.com
VITE_ODOO_DATABASE=yourcar
VITE_ODOO_USERNAME=your-api-user
VITE_ODOO_PASSWORD=your-api-password
```

To set these in Odoo:
1. Go to Settings → Technical → Parameters → System Parameters
2. Add each variable with its value

### API User Setup (Important)

Create a dedicated API user for the taxi booking app:
1. Go to Settings → Users & Companies → Users
2. Create a new user:
   - Name: "Taxi API User"
   - Login: `taxi-api@yourcar.odoo.com`
   - Password: (strong password)
3. Assign necessary access rights:
   - Sales
   - CRM
   - Contacts
   - Fleet (if installed)

## 🧪 Testing Your Integration

1. **Access the App**
   - Go to `https://yourcar.odoo.com/taxi`
   - Verify all UI elements load correctly

2. **Test Authentication**
   - Check developer console for any API errors
   - Verify login succeeds with your API credentials

3. **Test Booking Flow**
   - Create a test booking
   - Verify it appears in Odoo CRM

## 🔍 Troubleshooting

### Common Issues and Solutions

1. **Assets Not Loading**
   - Problem: CSS/JS files not found
   - Solution: Check paths in `templates.xml` match your Odoo version

2. **CORS Errors**
   - Problem: API calls fail with CORS errors
   - Solution: Verify controller in `main.py` is properly adding CORS headers

3. **Authentication Failures**
   - Problem: "Failed to authenticate" error
   - Solution: Check API user credentials and permissions

4. **Page Not Found**
   - Problem: "/taxi" URL returns 404
   - Solution: Ensure website_pages.xml is properly installed

### Debug Mode

Add `?debug=assets` to your URL to troubleshoot assets loading:
```
https://yourcar.odoo.com/taxi?debug=assets
```

## 📱 Mobile Optimization

The app is fully responsive and will work on all devices accessing your Odoo website.

## 🔄 Updating the App

To update the application after making changes:

1. **Build new React version**
   ```bash
   cd /home/emizen/car
   NODE_ENV=production npm run build
   ```

2. **Replace files in module**
   - Copy new files from `dist/` to your module's static folder
   - Update module version in `__manifest__.py`

3. **Update the module in Odoo**
   - Go to Apps → Menu (⋮) → Update Module List
   - Find "Taxi Booking" and click "Upgrade"

## 🎉 Success!

Your taxi booking app is now integrated with your Odoo website and accessible at:
**`https://yourcar.odoo.com/taxi`**

For any further assistance, please contact support.

### Test Checklist:
- [ ] Authentication works
- [ ] Customer creation in CRM
- [ ] Booking creation as Sales Order
- [ ] Vehicle data sync from Fleet
- [ ] Trip creation in Project

### Common Issues:
1. **Authentication Fails**: Check credentials and user permissions
2. **CORS Error**: Enable CORS in Odoo if needed
3. **Field Not Found**: Ensure custom fields are created
4. **Permission Denied**: Check user access rights

## Step 8: Production Deployment

### Security Considerations:
1. Use HTTPS for all communications
2. Store API credentials securely
3. Implement rate limiting
4. Use environment variables for sensitive data

### Monitoring:
1. Set up logging for API calls
2. Monitor sync frequency
3. Track booking success rates
4. Monitor vehicle availability updates

## Additional Features to Implement:

### Advanced Features:
1. **Real-time GPS tracking** (requires additional GPS module)
2. **Payment gateway integration** (Razorpay/PayU module)
3. **SMS/WhatsApp notifications** (requires SMS gateway)
4. **Driver mobile app** (custom development)
5. **Route optimization** (requires mapping API)

### Odoo Customizations:
1. Custom dashboards for business metrics
2. Automated invoice generation
3. Driver performance tracking
4. Customer loyalty programs
5. Dynamic pricing based on demand

This setup creates a robust backend system where your React frontend handles customer interaction while Odoo manages all business operations, data storage, and workflows.