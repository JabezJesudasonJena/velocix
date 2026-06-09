'use client';

import React, { useState, useEffect } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Link from 'next/link';
import axios from 'axios';

// Initialize premium font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

// Define the TypeScript interfaces
interface Product {
  id: string | number;
  storeId: string | number;
  name: string;
  category?: string;
  stock?: number;
}

interface Store {
  id: string | number;
  name: string;
  ownerId?: string | number;
  lat?: number | null;
  lng?: number | null;
  desc?: string | null;
}

const ProductGrid = () => {
  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [productError, setProductError] = useState<string | null>(null);

  // Store State
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoadingStores, setIsLoadingStores] = useState<boolean>(true);
  const [storeError, setStoreError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
        let fetchedProducts = [];
        
        if (Array.isArray(response.data)) {
          fetchedProducts = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          fetchedProducts = response.data.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          fetchedProducts = response.data.products;
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductError("Failed to load products.");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    // Fetch Stores
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store`);
        let fetchedStores = [];
        
        if (Array.isArray(response.data)) {
          fetchedStores = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          fetchedStores = response.data.data;
        } else if (response.data && Array.isArray(response.data.stores)) {
          fetchedStores = response.data.stores;
        }

        setStores(fetchedStores);
      } catch (err) {
        console.error("Error fetching stores:", err);
        setStoreError("Failed to load stores.");
      } finally {
        setIsLoadingStores(false);
      }
    };

    // Fire both requests simultaneously for faster loading
    fetchProducts();
    fetchStores();
  }, []);

  return (
    <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 ${jakarta.className}`}>
      
      {/* ================= PRODUCTS SECTION ================= */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Products</h2>
        <p className="text-gray-500 mt-2">Browse our latest collection.</p>
      </div>

      {productError ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium mb-16">
          {productError}
        </div>
      ) : isLoadingProducts ? (
        // Loading Skeleton Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse h-64">
              <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        // Actual Product Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {products.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-100 rounded-3xl">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between block"
              >
                <div>
                  <div className="w-full h-36 bg-gray-50 rounded-xl mb-5 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition-colors duration-300">
                     <svg className="w-10 h-10 text-gray-300 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                  </div>

                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                      {product.category || 'Uncategorized'}
                    </span>
                    <span className={`text-xs font-bold ${(!product.stock || product.stock < 10) ? 'text-orange-500' : 'text-gray-500'}`}>
                      {product.stock || 0} in stock
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-gray-50 flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-gray-400 font-medium tracking-wide">
                    <span>Product ID:</span>
                    <span className="text-gray-600">{product.id}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400 font-medium tracking-wide">
                    <span>Store ID:</span>
                    <span className="text-gray-600">{product.storeId}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {/* ================= STORES SECTION ================= */}
      <div className="pt-10 border-t border-gray-200/60 mt-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Stores</h2>
          <p className="text-gray-500 mt-2">Explore the hubs powering our logistics network.</p>
        </div>

        {storeError ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
            {storeError}
          </div>
        ) : isLoadingStores ? (
          // Store Loading Skeletons
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse h-32 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Actual Store Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stores.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-100 rounded-3xl">
                No stores found.
              </div>
            ) : (
              stores.map((store) => (
                <Link 
                  href={`/store/${store.id}`} 
                  key={store.id} 
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4"
                >
                  <div className="w-14 h-14 shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors leading-tight">
                      {store.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-2">
                      Store ID: {store.id}
                    </p>
                    {(store.lat && store.lng) && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-50 text-gray-500 border border-gray-100">
                        {Number(store.lat).toFixed(2)}, {Number(store.lng).toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductGrid;