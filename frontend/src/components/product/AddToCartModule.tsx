"use client"

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '@/src/redux/store/cartSlice'; 
import { Product } from '@/src/types/product';
import { Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function AddToCartModule({ product }: { product: Product }) {
  const dispatch = useDispatch();
  
  // Local state to track how many the user WANTS to add right now
  const [localQuantity, setLocalQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      updateQuantity({
        product: { 
          id: product.id, 
          name: product.name, 
          // Ensure we add to cart at the discounted price if one exists
          price: product.discount_price || product.price 
        },
        delta: localQuantity, 
      })
    );

    // Trigger visual success state
    setIsAdded(true);
    
    // Reset back to default state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
      setLocalQuantity(1);
    }, 2000);
  };

  const decreaseQuantity = () => {
    setLocalQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setLocalQuantity((prev) => prev + 1);
  };

  // 1. Disabled State (Out of Stock)
  if (product.status !== 'AVL') {
    return (
      <button 
        disabled
        className="flex h-14 w-full sm:w-[400px] items-center justify-center gap-3 rounded-2xl bg-neutral-900 px-8 text-base font-bold text-neutral-500 ring-1 ring-neutral-800 cursor-not-allowed"
      >
        <ShoppingBag className="h-5 w-5" />
        Currently Unavailable
      </button>
    );
  }

  // 2. Practical E-commerce Layout (Quantity + Button)
  return (
    <div className="flex w-full max-w-[400px] gap-3">
      
      {/* --- Quantity Selector --- */}
      <div className="flex h-14 w-32 shrink-0 items-center justify-between rounded-2xl bg-neutral-900 ring-1 ring-white/10 px-1">
        <button 
          onClick={decreaseQuantity}
          disabled={isAdded}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white disabled:opacity-50"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="font-mono text-base font-medium text-white">
          {localQuantity}
        </span>
        
        <button 
          onClick={increaseQuantity}
          disabled={isAdded}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* --- Main Action Button --- */}
      <button 
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`
          group relative flex h-14 flex-1 items-center justify-center overflow-hidden rounded-2xl text-base font-bold transition-all duration-300
          ${isAdded 
            ? 'bg-green-500 text-white cursor-default' 
            : 'bg-white text-black hover:bg-neutral-200 active:scale-[0.97] shadow-lg shadow-white/10'
          }
        `}
      >
        {/* Default Text */}
        <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${isAdded ? '-translate-y-full' : 'translate-y-0'}`}>
          <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
          Add to Cart
        </span>

        {/* Success Text */}
        <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${isAdded ? 'translate-y-0' : 'translate-y-full'}`}>
          <CheckCircle2 className="h-5 w-5" />
          Added
        </span>
      </button>
      
    </div>
  );
}