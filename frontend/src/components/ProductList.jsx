import React, { useState } from 'react';

const ProductCard = ({ p, onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    await onAdd(p._id);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative">
        <img 
          src={p.image} 
          alt={p.name} 
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-200" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            {isAdding ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {p.name}
          </h4>
          <div className="text-lg font-bold text-blue-600">
            ${p.price.toFixed(2)}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 flex-1">{p.description}</p>
      </div>
    </div>
  );
};

export default function ProductList({ products = [], onAdd }) {
  if (!products || products.length === 0) return <p>No products yet. Click "Seed Products".</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p._id} p={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
