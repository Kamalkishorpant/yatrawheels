# 🚀 Quick Deployment Guide for Odoo

## Updated Configuration (URLs changed to /shop)

Your React taxi booking app has been updated to work at `/shop` URL instead of `/taxi`.

## Files Updated:
- **odoo_taxi_module_updated.zip** - Use this new module package
- All URLs now point to `/shop` instead of `/taxi`
- API configuration optimized for production deployment

## Deployment Steps:

### 1. Remove Old Module (if installed)
```
1. Go to Apps in Odoo
2. Search for "Taxi Booking"  
3. Click "Uninstall" if it exists
4. Confirm uninstallation
```

### 2. Install Updated Module
```
1. Go to Apps → Menu (⋮) → Upload Module
2. Select "odoo_taxi_module_updated.zip"
3. Click "Upload & Install"
4. Wait for installation to complete
```

### 3. Configure API User
```
1. Go to Settings → Users & Companies → Users
2. Create user: "Taxi API User"
3. Email: taxi-api@yourcar.odoo.com
4. Assign permissions: Sales, CRM, Contacts
```

### 4. Set Environment Variables
```
1. Settings → Technical → Parameters → System Parameters
2. Add these parameters:
   - VITE_ODOO_DATABASE: yourcar
   - VITE_ODOO_USERNAME: taxi-api@yourcar.odoo.com  
   - VITE_ODOO_PASSWORD: [your-secure-password]
```

### 5. Test Access
```
1. Visit: https://yourcar.odoo.com/shop
2. Test booking functionality
3. Check if data appears in Odoo CRM
```

## Troubleshooting:

### If page shows blank:
1. Check browser console for errors
2. Verify module installation completed
3. Ensure API user has correct permissions

### If data not loading:
1. Check API credentials in System Parameters
2. Verify CORS headers are working
3. Test API user can authenticate

### Need help?
Check the full ODOO_INTEGRATION_GUIDE.md for detailed troubleshooting steps.

## Success! 
Your app should now be available at: **https://yourcar.odoo.com/shop**