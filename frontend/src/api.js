const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'API Error');
  }
  return res.json().catch(() => ({}));
}

export const getProducts = () => request('/products');
export const seedProducts = () => request('/products/seed', { method: 'POST' });

export const getCart = () => request('/cart');
export const addToCart = (productId, qty = 1) => request('/cart', { method: 'POST', body: JSON.stringify({ productId, quantity: qty }) });
export const updateCartItem = (productId, quantity) => request(`/cart/${productId}`, { method: 'PUT', body: JSON.stringify({ quantity }) });
export const removeFromCart = (productId) => request(`/cart/${productId}`, { method: 'DELETE' });
export const checkout = ({ name, email }) => request('/cart/checkout', { method: 'POST', body: JSON.stringify({ name, email }) });

export default {
  getProducts, seedProducts, getCart, addToCart, updateCartItem, removeFromCart, checkout
};
