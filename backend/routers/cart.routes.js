import express from 'express';
import { 
  getCart, 
  addToCart, 
  removeFromCart, 
  updateCartItem,
  checkout 
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeFromCart);
router.post('/checkout', checkout);

export default router;