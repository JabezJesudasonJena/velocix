"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '@/src/redux/store/cartSlice'; 
import { Product } from '@/src/types/product';
import type { RootState } from '@/src/redux/store/store'; // Adjust path if needed

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  // Smart UI: Check if the item is already in the cart to conditionally render the buttons
  const cartItem = useSelector((state: RootState) => 
    state.cart.items?.find((item: any) => item.id === product.id)
  );
  const quantity = cartItem?.quantity || 0;

  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.preventDefault(); 
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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-600">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950/80 flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_55%)]"></div>
        <span className="text-neutral-600 text-sm font-semibold tracking-wide">No Preview</span>

        {product.status === 'AVL' && (
          <span className="absolute left-3 top-3 rounded-full border border-emerald-900/60 bg-emerald-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            In Stock
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h2 className="line-clamp-1 text-lg font-bold text-white" title={product.name}>
            {product.name}
          </h2>
          <p className="whitespace-nowrap text-lg font-extrabold text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
        
        <p className="mb-6 flex-grow line-clamp-2 text-sm leading-6 text-neutral-400">
          {product.desc || "Premium product available at our local store."}
        </p>

        <div className="mt-auto pt-4 border-t border-neutral-800">
          {quantity === 0 ? (
            <button 
              onClick={(e) => handleQuantityChange(e, 1)}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-[0.99]"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between bg-neutral-950 border border-neutral-800 p-1 rounded-xl">
              <button 
                onClick={(e) => handleQuantityChange(e, -1)}
                className="h-10 w-10 rounded-lg bg-neutral-900 text-white transition-colors hover:bg-neutral-800 active:scale-[0.97]"
              >
                {quantity === 1 ? (
                  <span className="text-red-400 font-bold">&times;</span> 
                ) : (
                  <span className="font-bold">&minus;</span>
                )}
              </button>
              
              <span className="font-bold w-12 text-center text-white">
                {quantity}
              </span>
              
              <button 
                onClick={(e) => handleQuantityChange(e, 1)}
                className="h-10 w-10 rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 active:scale-[0.97]"
              >
                <span className="font-bold">+</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}