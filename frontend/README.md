# 🎨 Vibe Commerce Frontend

React-based frontend for the Vibe Commerce shopping cart application. Features a modern UI with real-time cart updates and a seamless checkout experience.

## ⚛️ Technology Stack

- **React** - UI Framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

## 📁 Project Structure

```plaintext
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── Cart.jsx
│   │   ├── ProductList.jsx
│   │   └── ...
│   ├── assets/        # Static files
│   ├── App.jsx        # Main component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Public assets
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies
```

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn
   - Backend server running

2. **Installation**

   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

3. **Usage**
   - Open http://localhost:5173 in your browser
   - Click "Seed Products" if first time setup
   - Browse products and add to cart
   - Update quantities or remove items
   - Proceed to checkout

## 🎯 Features

### Product Catalog
- Grid layout with product cards
- Product images with fallback
- Price display
- Add to cart button

### Shopping Cart
- Real-time updates
- Quantity adjustments
- Item removal
- Total calculation
- Empty cart state

### Checkout Process
- Customer information form
- Order summary
- Professional receipt
- Success confirmation

## 💅 Styling

- Tailwind CSS for utility-first styling
- Responsive design
- Modern UI components
- Loading states
- Error handling UI

## 📡 API Integration

```javascript
// Product endpoints
GET    /api/products      // List products
POST   /api/products/seed // Seed sample data

// Cart endpoints
GET    /api/cart         // Get cart
POST   /api/cart         // Add item
PUT    /api/cart/:id     // Update quantity
DELETE /api/cart/:id     // Remove item
POST   /api/cart/checkout // Process checkout
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm test

# Test coverage
npm run test:coverage
```

## 💡 Implementation Details

- Optimistic UI updates
- Error boundary implementation
- Loading states
- Form validation
- Image error handling
- Responsive breakpoints

## 🔜 Future Improvements

- [ ] Product search
- [ ] Filters and sorting
- [ ] Cart persistence
- [ ] User accounts
- [ ] Wishlist feature
- [ ] Product reviews
- [ ] Dark mode

---

Part of the [Vibe Commerce](../README.md) project.
