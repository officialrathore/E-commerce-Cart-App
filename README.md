# 🛒 Vibe Commerce - Modern Shopping Cart Demo

A fully functional e-commerce shopping cart implementation built with modern web technologies. Features real-time cart updates, product management, and a sleek checkout experience.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎯 Real-time cart management
- 📦 Product catalog with images
- 🛍️ Add/remove/update cart items
- 💳 Mock checkout process
- 🧾 Order receipt generation
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- ⚡ Fast development with Vite

## 🏗️ Tech Stack

### Frontend
- **React** - UI Framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

Quick start (Windows PowerShell):

1. Start MongoDB (ensure `mongod` is running locally or set `MONGO_URL` env)

2. Backend

```powershell
cd backend
npm install
# create .env if you want, otherwise defaults to mongodb://localhost:27017/Ecommerce
node server.js
```

3. Frontend (in another terminal)

```powershell
cd frontend
npm install
npm run dev
```

4. Use the app
- Open the frontend Dev URL (Vite) shown in terminal.
- Click "Seed Products" to insert sample products.
- Add products to cart, update quantities, remove items.
- Click Checkout and enter name/email to get a mock receipt.

Backend API overview:
- GET /api/products — list products
- POST /api/products/seed — seed products
- GET /api/cart — get current cart
- POST /api/cart — add {productId, quantity}
- PUT /api/cart/:productId — set quantity (0 removes)
- DELETE /api/cart/:productId — remove item
- POST /api/cart/checkout — {name, email} → mock receipt

Notes:
- The backend uses a single Cart document (no authentication) for simplicity.
- The checkout is mocked and just returns an order receipt and clears the cart.

Next steps / optional improvements:
- Add user accounts and per-user carts
- Persist cart/session in frontend (localStorage) for offline
- Add tests and CI
