'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import axios from 'axios';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

interface ProductDetail {
  id: string | number;
  storeId: string | number;
  name: string;
  category?: string;
  stock?: number;
  desc?: string;
  price?: number;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      try {
        // Updated to use the standard path format based on your Home.tsx
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`);
        
        // Handle varying API response structures
        const data = response.data?.data || response.data?.product || response.data;
        setProduct(data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError('Product not found.');
        } else {
          setError('Failed to load product details. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div className={`min-h-screen bg-[#fafafa] text-gray-900 pb-20 ${jakarta.className}`}>
      
      {/* Header Area */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-3 text-gray-500 hover:text-emerald-600 transition-colors py-2 px-3 -ml-3 rounded-xl hover:bg-emerald-50 font-bold text-sm tracking-wide uppercase"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {error ? (
          <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium flex flex-col items-center justify-center text-center h-64">
            <svg className="w-12 h-12 mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <p className="text-lg">{error}</p>
            <button onClick={() => router.push('/')} className="mt-4 px-6 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-bold">Return Home</button>
          </div>
        ) : isLoading ? (
          // Skeleton Loader for Details Page
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm animate-pulse flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2 h-96 bg-gray-100 rounded-2xl"></div>
            <div className="w-full md:w-1/2 space-y-6 pt-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              <div className="h-12 bg-gray-200 rounded-xl w-full mt-10"></div>
            </div>
          </div>
        ) : product ? (
          // Product Details Layout
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-10 lg:gap-16">
            
            {/* Left Column: Image Placeholder */}
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {product.category || 'Uncategorized'}
                </span>
                <span className={`text-sm font-bold flex items-center gap-1.5 ${(!product.stock || product.stock < 10) ? 'text-orange-500' : 'text-emerald-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${(!product.stock || product.stock < 10) ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
                  {product.stock ? `${product.stock} Units Available` : 'Out of Stock'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
                {product.name}
              </h1>

              {product.price && (
                <div className="text-2xl font-bold text-gray-900 mb-6">
                  ${Number(product.price).toFixed(2)}
                </div>
              )}

              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {product.desc || "No detailed description provided for this product. Contact the store manager for specific capabilities or technical requirements regarding this item."}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10 pb-10 border-b border-gray-100">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Product ID</p>
                  <p className="text-sm font-mono font-medium text-gray-900">{product.id}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Store ID</p>
                  <p className="text-sm font-mono font-medium text-gray-900">{product.storeId}</p>
                </div>
              </div>

              <div className="mt-auto">
                <button 
                  disabled={!product.stock || product.stock === 0}
                  className="w-full flex justify-center items-center py-4 px-8 rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] text-base font-bold text-white bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                >
                  Manage Inventory Allocation
                </button>
              </div>

            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
}