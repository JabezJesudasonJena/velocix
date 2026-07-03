// Inside src/components/product/ProductCard.tsx
"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '@/src/redux/store/cartSlice'; // Verify this path
import { Product } from '@/src/types/product';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  // Update your handler to match the new payload structure
  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.preventDefault(); // Prevents the parent <Link> from triggering navigation
    
    dispatch(
      updateQuantity({
        product: { 
          id: product.id, 
          name: product.name, 
          price: product.price 
        },
        delta: delta,
      })
    );
  };

  return (
    <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-neutral-400 mb-4">${product.price}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          onClick={(e) => handleQuantityChange(e, -1)}
          className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700"
        >
          -
        </button>
        <button 
          onClick={(e) => handleQuantityChange(e, 1)}
          className="px-4 py-2 bg-white text-black rounded hover:bg-neutral-200"
        >
          + Add
        </button>
      </div>
    </div>
  );
}