# 🖥️ Vibe Commerce Backend

Express.js backend server for the Vibe Commerce shopping cart application. Handles product management, cart operations, and checkout process.

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

## 📁 Project Structure

```
backend/
├── controllers/         # Request handlers
│   ├── cart.controller.js
│   └── product.controller.js
├── models/             # Database schemas
│   ├── cart.model.js
│   └── product.model.js
├── routes/             # API routes
│   ├── cart.routes.js
│   └── product.routes.js
├── server.js           # Application entry point
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MongoDB installed and running
   - npm or yarn package manager

2. **Environment Setup**
   ```bash
   # Create .env file
   MONGO_URL=mongodb://localhost:27017/Ecommerce
   PORT=3000
   ```

3. **Installation**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

## 📡 API Endpoints

### Products API

#### `GET /api/products`
- Get all products
- Response: Array of products
  ```json
  [
    {
      "_id": "string",
      "name": "string",
      "price": "number",
      "image": "string"
    }
  ]
  ```

#### `POST /api/products/seed`
- Seed sample products
- Response: Created products array

### Cart API

#### `GET /api/cart`
- Get current cart
- Response: Cart object with items
  ```json
  {
    "_id": "string",
    "items": [
      {
        "productId": "string",
        "quantity": "number",
        "product": {
          "_id": "string",
          "name": "string",
          "price": "number"
        }
      }
    ],
    "total": "number"
  }
  ```

#### `POST /api/cart`
- Add item to cart
- Request body:
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```

#### `PUT /api/cart/:productId`
- Update item quantity
- Request body: `{ "quantity": "number" }`

#### `DELETE /api/cart/:productId`
- Remove item from cart

#### `POST /api/cart/checkout`
- Process checkout
- Request body:
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- Response: Order receipt

## 🔒 Data Models

### Product Schema
```javascript
{
  name: String,
  price: Number,
  image: String
}
```

### Cart Schema
```javascript
{
  items: [{
    productId: ObjectId,
    quantity: Number
  }],
  total: Number
}
```

## 💡 Implementation Details

- Single cart instance for demo simplicity
- MongoDB population for product details
- Real-time total calculation
- Input validation and error handling
- CORS enabled for frontend access

## 🧪 Testing

```bash
# Run tests
npm test

# Test specific component
npm test -- --grep "Cart Controller"
```

## 📚 Error Handling

- Invalid product IDs
- Out of stock scenarios
- Invalid quantities
- Database connection issues
- Checkout validation

## 🔜 Future Improvements

- [ ] User authentication
- [ ] Multiple cart support
- [ ] Payment processing
- [ ] Order history
- [ ] Product categories
- [ ] Search functionality
- [ ] Rate limiting
- [ ] Caching layer

---

Part of the [Vibe Commerce](../README.md) project.