# Deploying YatraWheels to Odoo Domain - Complete Guide

## 🎯 **Goal**: Make your React app accessible at `https://yourcar.odoo.com/taxi` or similar

## 🚀 **Option 1: Odoo Website Builder Integration (Recommended)**

### Step 1: Build React App for Production
```bash
cd /home/emizen/car
npm run build
```

### Step 2: Upload to Odoo Website
1. **Login to Odoo**: https://yourcar.odoo.com/odoo
2. **Go to Website app** (install if not installed)
3. **Enable Developer Mode**: Settings → Developer Tools → Activate
4. **Create New Page**:
   - Website → Pages → New Page
   - URL: `/taxi`
   - Title: "YatraWheels Taxi Service"

### Step 3: Upload Built Files
1. **Upload React build files** to Odoo static assets:
   - Go to Settings → Technical → Static Content
   - Upload files from `dist/` folder

### Step 4: Create Odoo Page Template
```html
<!-- In Odoo Website Builder -->
<div id="yatrawheels-root"></div>
<script src="/web/static/taxi/assets/index.js"></script>
<link rel="stylesheet" href="/web/static/taxi/assets/index.css">
```

## 🚀 **Option 2: Subdomain Deployment (Easier)**

### Using Netlify/Vercel with Custom Domain
1. **Build and Deploy**:
   ```bash
   npm run build
   # Deploy to Netlify/Vercel
   ```

2. **Configure Custom Domain**:
   - Point `taxi.yourcar.odoo.com` to your deployment
   - Update CORS settings in React app

### Environment Variables for Production:
```env
# .env.production
VITE_ODOO_API_KEY=""
VITE_ODOO_USER_ID=kamal9@emails.emizentech.com
VITE_ODOO_PASSWORD=Kartik@123
VITE_ODOO_DATABASE=yourcar
VITE_ODOO_BASE_URL=https://yourcar.odoo.com
```

## 🚀 **Option 3: Odoo Custom Module (Advanced)**

### Create Odoo Module Structure:
```
taxi_frontend/
├── __manifest__.py
├── controllers/
│   └── main.py
├── static/
│   └── src/
│       ├── js/
│       ├── css/
│       └── index.html
└── views/
    └── templates.xml
```

### Module Manifest (`__manifest__.py`):
```python
{
    'name': 'YatraWheels Taxi Frontend',
    'version': '1.0',
    'category': 'Website',
    'summary': 'React-based taxi booking frontend',
    'depends': ['website', 'sale', 'crm'],
    'data': [
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'taxi_frontend/static/src/js/main.js',
            'taxi_frontend/static/src/css/main.css',
        ],
    },
    'installable': True,
    'application': True,
}
```

## 🔧 **Quick Deployment Script**

Let me create a deployment script for you:

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Deploying YatraWheels to Production..."

# Build the React app
echo "📦 Building React app..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf yatrawheels-deploy.tar.gz dist/

echo "✅ Deployment package created: yatrawheels-deploy.tar.gz"
echo "📋 Next steps:"
echo "1. Upload to your hosting provider"
echo "2. Extract files to web directory"
echo "3. Configure domain/subdomain"
echo "4. Update CORS settings if needed"
```

## 🌐 **Immediate Solution: Make Accessible via IP**

For immediate access from anywhere, let's configure Vite to accept external connections:

### Update vite.config.js:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Accept connections from any IP
    port: 3000,
    open: true,
    proxy: {
      '/api/odoo': {
        target: 'https://yourcar.odoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/odoo/, ''),
      }
    }
  },
  // ... rest of config
})
```

Then run: `npm run dev` and access via: `http://YOUR_SERVER_IP:3000`

## 🔒 **Security Considerations**

1. **Environment Variables**: Never expose credentials in client-side code
2. **CORS Configuration**: Properly configure allowed origins
3. **HTTPS**: Always use HTTPS in production
4. **API Rate Limiting**: Implement rate limiting for Odoo API calls

## 📱 **Mobile Optimization**

Your React app is already responsive, but for production:
1. **PWA Features**: Add service worker for offline capability
2. **Performance**: Optimize bundle size
3. **SEO**: Add proper meta tags

Would you like me to implement any of these deployment options?