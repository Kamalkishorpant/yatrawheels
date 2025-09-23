# YatraWheels - Taxi Booking Service

A modern, fully responsive taxi booking website built with React, featuring Odoo backend integration, interactive components, animations, and a sleek user interface.

## 🚀 Features

### Core Functionality
- **Smart Search**: Filter taxis by location, dates, and vehicle type
- **Interactive Vehicle Catalog**: Browse through premium vehicles with detailed specifications
- **Real-time Booking**: Complete booking system with form validation
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)

### Odoo Integration
- **Authentication**: Secure connection to Odoo backend
- **CRM Integration**: Customer creation and management
- **Booking Management**: Create and track bookings in Odoo
- **Vehicle Synchronization**: Vehicle data synced from Odoo fleet management

### User Experience
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Modern UI**: Clean, professional design with intuitive navigation
- **Loading States**: Visual feedback during data operations
- **Form Validation**: Comprehensive validation with real-time error messages

### Technical Features
- **React 18**: Latest React with hooks and functional components
- **React Router**: Client-side routing for seamless navigation
- **React Hook Form**: Efficient form handling and validation
- **Date Picker**: Interactive date selection for rental periods
- **Select Components**: Enhanced dropdowns with search capabilities
- **Framer Motion**: Smooth animations and transitions

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Modern CSS with CSS Variables, Flexbox, Grid
- **Build Tool**: Vite for fast development and optimized builds
- **Form Handling**: React Hook Form
- **Date Handling**: React DatePicker
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Development**: ESLint for code quality

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-rental-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # Navigation and branding
│   ├── Hero.jsx         # Hero section with search
│   ├── FeaturedCars.jsx # Car listing with filters
│   ├── CarCard.jsx      # Individual car display
│   ├── BookingModal.jsx # Booking form modal
│   ├── Testimonials.jsx # Customer reviews
│   └── Footer.jsx       # Footer with links
├── data/                # Static data
│   └── carsData.js      # Car inventory and locations
├── styles/              # CSS styling
│   └── index.css        # Global styles and components
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

## 🎨 Key Components

### Header
- Responsive navigation with mobile menu
- Smooth scroll animations
- Sticky header with blur effect

### Hero Section
- Full-screen background with overlay
- Advanced search form with:
  - Location selection
  - Date picker integration
  - Car type filtering
  - Real-time validation

### Car Catalog
- Grid layout with responsive design
- Car cards featuring:
  - High-quality images
  - Detailed specifications
  - Customer ratings
  - Feature tags
  - Availability status

### Booking Modal
- Multi-step booking process
- Form validation and error handling
- Price calculation
- Payment information capture
- Success confirmation

### Testimonials
- Customer review carousel
- Rating displays
- Company statistics
- Animated loading

## 🚗 Car Data Features

Each vehicle includes:
- **Basic Info**: Make, model, year, price
- **Specifications**: Seats, fuel type, transmission
- **Features**: GPS, AC, Bluetooth, etc.
- **Ratings**: Customer reviews and ratings
- **Availability**: Real-time availability status
- **Location**: Pickup/dropoff locations

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layout for tablets
- **Desktop**: Full-featured desktop experience
- **Cross-browser**: Compatible with modern browsers

## 🎯 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Image Optimization**: Optimized images from Unsplash
- **Code Splitting**: Efficient bundle management
- **CSS Optimization**: Minimal CSS with variables
- **Fast Development**: Vite for instant hot reload

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🌟 Future Enhancements

- User authentication and profiles
- Real-time inventory management
- Payment gateway integration
- GPS location services
- Multi-language support
- Advanced filtering options
- Loyalty program features
- Mobile app development

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Unsplash for high-quality car images
- Lucide for beautiful icons
- Framer Motion for smooth animations
- React community for excellent tools and libraries

---

**Built with ❤️ by the CarGo Team**