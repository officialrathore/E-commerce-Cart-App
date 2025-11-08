import express from 'express';
import { getProducts, addProduct, seedProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.post('/seed', seedProducts);

export default router;