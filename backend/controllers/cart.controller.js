import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// Get cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne().populate('items.product');
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    // Filter out items with null/undefined products before sending
    cart.items = cart.items.filter(item => item.product != null);
    // Recalculate total after filtering
    cart.total = await calculateTotal(cart.items);
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    let cart = await Cart.findOne();
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate total
    cart.total = await calculateTotal(cart.items);
    await cart.save();
    
    const populatedCart = await cart.populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    cart.total = await calculateTotal(cart.items);
    await cart.save();
    
    const populatedCart = await cart.populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update item quantity (set quantity). If quantity <= 0 then remove item.
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne();
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex === -1) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ message: 'Quantity must be a non-negative integer' });
    }

    if (quantity === 0) {
      // remove
      cart.items.splice(existingItemIndex, 1);
    } else {
      cart.items[existingItemIndex].quantity = quantity;
    }

    cart.total = await calculateTotal(cart.items);
    await cart.save();

    const populatedCart = await cart.populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Checkout
export const checkout = async (req, res) => {
  try {
    const { name, email } = req.body;
    const cart = await Cart.findOne().populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const receipt = {
      orderNumber: Math.floor(Math.random() * 1000000),
      customerName: name,
      customerEmail: email,
      items: cart.items.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.quantity * item.product.price
      })),
      total: cart.total,
      timestamp: new Date()
    };

    // Clear the cart after successful checkout
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json(receipt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Helper function to calculate total
const calculateTotal = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};