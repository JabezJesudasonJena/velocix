'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart, removeFromCart } from '@/store/cartSlice';
import { Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

interface Product {
  id: string | number;
  storeId: string | number;
  name: string;
  category?: string;
  stock?: number;
  price?: number;
}

export default function Home() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
        let fetchedProducts = [];
        
        if (Array.isArray(response.data)) fetchedProducts = response.data;
        else if (response.data?.data) fetchedProducts = response.data.data;
        else if (response.data?.products) fetchedProducts = response.data.products;

        setProducts(fetchedProducts);
      } catch (err) {
        setError("Network error. Failed to synchronize inventory.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 1. Group products by category dynamically
  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category || 'Essentials';
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);

  const getCartQuantity = (productId: string | number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className={`min-h-screen bg-[#F8F9FA] text-gray-900 pb-32 ${jakarta.className}`}>
      
      

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {error ? (
          <div className="p-6 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold text-center shadow-sm">
            {error}
          </div>
        ) : isLoading ? (
          // Upgraded Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse h-[320px]">
                <div className="w-full h-36 bg-gray-100 rounded-2xl mb-4"></div>
                <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-1/2 mt-auto"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
             <ShoppingBag className="w-16 h-16 text-gray-200 mb-6" strokeWidth={1.5} />
             <p className="text-2xl font-extrabold text-gray-900">No Inventory Found</p>
             <p className="text-gray-500 font-medium mt-2">The current sector has no available products.</p>
          </div>
        ) : (
          // Iterate over the grouped categories
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-16">
              
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight capitalize">
                  {category}
                </h2>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {items.map((product) => {
                  const quantityInCart = getCartQuantity(product.id);
                  const isOutOfStock = !product.stock || product.stock === 0;

                  return (
                    <div 
                      key={product.id} 
                      className="group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
                    >
                      {/* Clickable Image & Title Area */}
                      <Link href={`/product/${product.id}`} className="block p-3 pb-0">
                        <div className="w-full aspect-[4/3] bg-[#F8F9FA] rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:bg-emerald-50/50 transition-colors duration-500">
                           <ShoppingBag className="w-10 h-10 text-gray-300 group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-500 ease-out" strokeWidth={1.5} />
                        </div>
                        
                        <div className="pt-4 px-2">
                          <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight mb-1 line-clamp-2">
                            {product.name}
                          </h3>
                          <span className={`text-xs font-bold ${isOutOfStock ? 'text-red-500' : 'text-gray-400'}`}>
                            {isOutOfStock ? 'Depleted' : `${product.stock} Units Available`}
                          </span>
                        </div>
                      </Link>

                      {/* Bottom Control Area (Fixed Height to prevent layout shifts) */}
                      <div className="mt-auto p-4 px-5 flex items-center justify-between">
                        
                        {/* Price */}
                        <div className="flex flex-col">
                          <span className="text-xl font-black text-gray-900 tracking-tight">
                            ${Number(product.price || 0).toFixed(2)}
                          </span>
                        </div>

                        {/* Tier-One Interactive Cart Pill */}
                        <div className="h-10 flex items-center justify-end w-[110px]">
                          {quantityInCart > 0 ? (
                            <div className="flex items-center justify-between w-full h-full bg-emerald-500 text-white rounded-xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                              <button 
                                onClick={(e) => { e.preventDefault(); dispatch(removeFromCart(product.id)); }}
                                className="w-1/3 h-full flex items-center justify-center hover:bg-emerald-600 transition-colors focus:outline-none active:bg-emerald-700"
                              >
                                <Minus size={16} strokeWidth={3} />
                              </button>
                              
                              <span className="w-1/3 text-center font-black text-sm tabular-nums">
                                {quantityInCart}
                              </span>
                              
                              <button 
                                onClick={(e) => { e.preventDefault(); dispatch(addToCart({ id: product.id, name: product.name, price: product.price || 0 })); }}
                                disabled={product.stock !== undefined && quantityInCart >= product.stock}
                                className="w-1/3 h-full flex items-center justify-center hover:bg-emerald-600 transition-colors focus:outline-none active:bg-emerald-700 disabled:opacity-50 disabled:bg-emerald-500"
                              >
                                <Plus size={16} strokeWidth={3} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={(e) => { e.preventDefault(); dispatch(addToCart({ id: product.id, name: product.name, price: product.price || 0 })); }}
                              disabled={isOutOfStock}
                              className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-700 font-extrabold text-sm rounded-xl border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:active:scale-100"
                            >
                              {isOutOfStock ? 'N/A' : 'ADD'}
                            </button>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}