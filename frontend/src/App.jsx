import React, { useEffect, useState } from 'react';
import { getProducts, getCart, addToCart, updateCartItem, removeFromCart, checkout as doCheckout, seedProducts } from './api';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const [prods, crt] = await Promise.all([getProducts(), getCart()]);
      setProducts(prods || []);
      setCart(crt || { items: [], total: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (productId) => {
    const res = await addToCart(productId, 1);
    setCart(res);
  };

  const handleIncrease = async (productId) => {
    // increase by 1: find current qty and set to +1
    const item = cart.items.find(i => i.product._id === productId);
    const newQty = item ? item.quantity + 1 : 1;
    const res = await updateCartItem(productId, newQty);
    setCart(res);
  };

  const handleDecrease = async (productId) => {
    const item = cart.items.find(i => i.product._id === productId);
    if (!item) return;
    const newQty = item.quantity - 1;
    const res = await updateCartItem(productId, newQty);
    setCart(res);
  };

  const handleRemove = async (productId) => {
    const res = await removeFromCart(productId);
    setCart(res);
  };

  const handleCheckout = async (customer) => {
    const res = await doCheckout(customer);
    setReceipt(res);
    setShowCheckout(false);
    // refresh cart after checkout
    const crt = await getCart();
    setCart(crt);
  };

  const handleSeed = async () => {
    await seedProducts();
    load();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm py-4 px-6 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Vibe Commerce
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSeed} 
              className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              🔄 Seed Products
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="lg:flex lg:items-start gap-8">
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Products</h2>
              {loading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span className="font-medium">Loading...</span>
                </div>
              )}
            </div>
            
            {!loading && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <ProductList products={products} onAdd={handleAdd} />
              </div>
            )}
          </section>

          <aside className="w-full lg:w-96 mt-8 lg:mt-0 lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
            <Cart
              cart={cart}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
              onCheckout={() => setShowCheckout(true)}
            />
          </aside>
        </div>
      </main>

      <CheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSubmit={handleCheckout}
      />

      {receipt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order Receipt</h3>
              <button 
                onClick={() => setReceipt(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Order #{receipt.orderNumber}</div>
                <div className="text-sm text-gray-600">{new Date(receipt.timestamp).toLocaleString()}</div>
              </div>
              <div>
                <div className="font-medium">Customer</div>
                <div className="text-sm text-gray-600">{receipt.customerName}</div>
                <div className="text-sm text-gray-600">{receipt.customerEmail}</div>
              </div>
              <div>
                <div className="font-medium mb-2">Items</div>
                {receipt.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 border-b">
                    <div>{item.productName} × {item.quantity}</div>
                    <div>${item.subtotal.toFixed(2)}</div>
                  </div>
                ))}
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <div>Total</div>
                  <div>${receipt.total.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
