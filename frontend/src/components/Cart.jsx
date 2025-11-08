import React from 'react';

export default function Cart({ cart = { items: [], total: 0 }, onIncrease, onDecrease, onRemove, onCheckout }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b">
        {cart.items.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <p className="text-gray-600">Your cart is empty</p>
            <p className="text-sm text-gray-500 mt-1">Add some products to get started!</p>
          </div>
        ) : (
          <div className="divide-y">
            {cart.items.filter(item => item?.product).map(item => (
              <div key={item.product._id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                    <img 
                      src={item.product.image || 'https://via.placeholder.com/80?text=No+Image'} 
                      alt={item.product.name || 'Product'} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{item.product.name || 'Product Unavailable'}</h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>${(item.product.price || 0).toFixed(2)} each</span>
                      <span>×</span>
                      <span>{item.quantity}</span>
                      <span>=</span>
                      <span className="font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button 
                        onClick={() => onDecrease(item.product._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onIncrease(item.product._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => onRemove(item.product._id)}
                        className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 rounded-b-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${Number(cart.total || 0).toFixed(2)}</span>
        </div>
        <button 
          disabled={cart.items.length === 0} 
          onClick={onCheckout}
          className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
        >
          {cart.items.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}
