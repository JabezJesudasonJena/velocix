'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import axios from 'axios'; 

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

// 1. Updated Interfaces to match your real backend data
interface Product {
  id: string | number;
  name: string;
  price: number;
  storeId: string | number;
  category: string;
  isEdible: boolean;
  stock: number;
}

interface Store {
  id: string | number;
  name: string;
  ownerId: string | number;
  lat: number | null;
  lng: number | null;
  desc: string | null; 
  products: Product[];
}

export default function StoreDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const storeId = resolvedParams.id;

  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cart Interaction States
  const [addingToCart, setAddingToCart] = useState<string | number | null>(null);
  const [addedItems, setAddedItems] = useState<Set<string | number>>(new Set());

  // 2. Fetch Real Data from your Backend
  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/store/storeproducts/${storeId}`);
        
        if (response.data && response.data.data) {
          setStore(response.data.data);
        } else {
          setError("Store data format is invalid.");
        }
      } catch (err) {
        console.error("Error fetching store:", err);
        setError("Failed to load store details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  const handleAddToCart = (productId: string | number) => {
    setAddingToCart(productId);
    
    setTimeout(() => {
      setAddingToCart(null);
      setAddedItems(prev => new Set(prev).add(productId));
      
      setTimeout(() => {
        setAddedItems(prev => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      }, 2500);
    }, 600);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-12 text-center">
        <p className="text-red-500 font-bold mb-4">{error || "Store not found."}</p>
        <Link href="/stores" className="text-emerald-500 hover:underline">Return to Stores</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#fafafa] text-gray-900 pb-20 ${jakarta.className}`}>
      
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/stores" className="text-gray-400 hover:text-emerald-500 transition-colors p-2 -ml-2 rounded-full hover:bg-emerald-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <span className="font-bold text-sm text-gray-500 tracking-wide uppercase">Back to Stores</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          
          <div className="flex flex-col justify-center animate-[fadeIn_0.5s_ease-out]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wider mb-6 w-max border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              VERIFIED PARTNER
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400 pb-2">
              {store.name}
            </h1>
            
            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8 max-w-lg">
              {store.desc || "No description provided for this location."}
            </p>

            <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Store ID</p>
                <p className="font-semibold text-gray-900">{store.id}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Owner ID</p>
                <p className="font-semibold text-gray-900">{store.ownerId}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] transform transition-transform hover:scale-[1.01] duration-500 animate-[slideInUp_0.6s_ease-out]">
            <div className="px-4 pt-2 pb-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">Location</h3>
              {(store.lat !== null && store.lng !== null) && (
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {Number(store.lat).toFixed(4)}, {Number(store.lng).toFixed(4)}
                </span>
              )}
            </div>
            
            <div className="w-full h-[350px] bg-gray-50 rounded-3xl overflow-hidden relative border border-gray-100/50">
              {(store.lat !== null && store.lng !== null) ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(store.lng) - 0.01}%2C${Number(store.lat) - 0.01}%2C${Number(store.lng) + 0.01}%2C${Number(store.lat) + 0.01}&layer=mapnik&marker=${store.lat}%2C${store.lng}`}
                  className="absolute inset-0 z-10 filter contrast-[1.05] saturate-[1.1]"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 z-10 bg-gray-50/80 backdrop-blur-sm">
                  <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="font-bold text-sm tracking-wide">NO LOCATION PROVIDED</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200/60 animate-[fadeIn_0.8s_ease-out]">
          
          {/* UPDATED: Flex container for Heading and Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-extrabold text-gray-900">Store Inventory</h3>
            
            {/* The New Button */}
            <Link 
              href={`/store/${storeId}/products/create`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_-4px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] transition-all duration-300 ease-out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add new Products
            </Link>
          </div>
          
          {store.products && store.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {store.products.map(product => {
                const isAdding = addingToCart === product.id;
                const isAdded = addedItems.has(product.id);

                return (
                  <div key={product.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-gray-50 text-gray-600 text-[10px] uppercase font-extrabold tracking-wider px-3 py-1.5 rounded-full">
                          {product.category}
                        </span>
                        <span className={`text-xs font-bold ${product.stock < 10 ? 'text-orange-500' : 'text-gray-400'}`}>
                          {product.stock} left
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-emerald-500 transition-colors">{product.name}</h4>
                      
                      <p className="text-xl font-extrabold text-emerald-600 mb-4">₹{product.price}</p>
                    </div>

                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      disabled={isAdding || isAdded || product.stock === 0}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2
                        ${isAdded 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 border border-transparent' 
                          : 'bg-emerald-50/50 text-emerald-600 border border-emerald-100 hover:bg-emerald-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-emerald-500/20'
                        }
                        ${product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200' : ''}
                      `}
                    >
                      {isAdding ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding...
                        </>
                      ) : isAdded ? (
                        <>
                          <svg className="w-4 h-4 text-white animate-[fadeIn_0.2s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 bg-white rounded-3xl border border-gray-100">
              No products available in this store currently.
            </div>
          )}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
}