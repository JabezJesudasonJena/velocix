"use client"
import React, { useState, useEffect } from 'react'; // 1. Import useState and useEffect
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '@/src/redux/store/cartSlice'; 
import { Product } from '@/src/types/product';
import type { RootState } from '@/src/redux/store/store';
import { Plus, Minus, Trash2, ShoppingBag, ImageIcon } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  
  // 2. Add a mounted state to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItem = useSelector((state: RootState) => 
    state.cart.items?.find((item: any) => item.id === product.id)
  );
  
  // 3. Only calculate real quantity AFTER the component mounts on the client.
  // During Server-Side Rendering, force it to be 0 so the HTML matches exactly.
  const quantity = mounted ? (cartItem?.quantity || 0) : 0;

  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    dispatch(
      updateQuantity({
        product: { 
          id: product.id, 
          name: product.name, 
          price: product.discount_price || product.price 
        },
        delta: delta,
      })
    );
  };

  // Safely extract the first image
  const mainImage = product.productImages && product.productImages.length > 0 
    ? product.productImages[0].url 
    : null;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 transition-all duration-300 hover:bg-neutral-800/80 hover:shadow-xl ring-1 ring-white/5 hover:ring-white/20">
      
      {/* --- Image Display Area --- */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/50 to-transparent z-0 pointer-events-none"></div>
        <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
           {mainImage ? (
             /* eslint-disable-next-line @next/next/no-img-element */
             <img 
               src={mainImage} 
               alt={product.name}
               className="h-full w-full object-cover object-center"
             />
           ) : (
             <ImageIcon className="h-8 w-8 text-neutral-700" strokeWidth={1.5} />
           )}
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
          {product.status === 'AVL' && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black shadow-sm">
              <span className="h-1 w-1 rounded-full bg-green-500"></span>
              Stock
            </span>
          )}
          {product.discount_price && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* --- Product Details --- */}
      <div className="flex flex-col flex-grow p-4">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h2 className="line-clamp-1 text-sm font-medium tracking-tight text-white transition-colors" title={product.name}>
            {product.name}
          </h2>
        </div>
        
        <p className="mb-4 flex-grow line-clamp-1 text-xs text-neutral-400">
          {product.desc || "Premium quality engineered for daily use."}
        </p>

        {/* Pricing & Action */}
        <div className="mt-auto flex items-end justify-between pb-3">
           <div className="flex flex-col">
              {product.discount_price ? (
                <>
                  <span className="font-mono text-[10px] text-neutral-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">
                    ${product.discount_price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-mono text-sm font-semibold text-white">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
        </div>

        <div className="mt-2 pt-3 border-t border-white/5">
          {/* 4. This will now safely render the exact same element on both server and client initially */}
          {quantity === 0 ? (
            <button 
              onClick={(e) => handleQuantityChange(e, 1)}
              className="flex w-full h-9 items-center justify-center gap-2 rounded-lg bg-white text-black text-xs font-bold tracking-wide transition-all hover:bg-neutral-200 active:scale-[0.98]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add
            </button>
          ) : (
            <div className="flex h-9 items-center justify-between overflow-hidden rounded-lg bg-neutral-950 ring-1 ring-white/10">
              <button 
                onClick={(e) => handleQuantityChange(e, -1)}
                className="flex h-full w-10 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                {quantity === 1 ? <Trash2 className="h-3.5 w-3.5 text-red-400" /> : <Minus className="h-3.5 w-3.5" />}
              </button>
              
              <div className="flex h-full flex-1 items-center justify-center bg-neutral-900/50">
                <span className="font-mono text-sm font-medium text-white">{quantity}</span>
              </div>
              
              <button 
                onClick={(e) => handleQuantityChange(e, 1)}
                className="flex h-full w-10 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}