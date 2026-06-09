'use client';

import React, { useState, useEffect } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import axios from 'axios';
import Link from 'next/link';

// Initialize premium font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

// 1. Define the TypeScript interface for your Store data
interface Store {
  id: string | number;
  name: string;
  ownerId: string | number;
  lat: number | string;
  lng: number | string;
}

const StoreGrid = () => {
  // 2. Strongly type the state variables
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // GET request to your store endpoint
        const response = await axios.get('http://localhost:5002/api/store');
        
        // Robust array extraction logic
        let fetchedStores: Store[] = [];
        
        if (Array.isArray(response.data)) {
          fetchedStores = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          fetchedStores = response.data.data;
        } else if (response.data && Array.isArray(response.data.stores)) {
          fetchedStores = response.data.stores;
        } else {
          console.error("API did not return an array. Check your backend response:", response.data);
        }

        setStores(fetchedStores);
      } catch (err) {
        console.error("Error fetching stores:", err);
        
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load stores.");
        } else {
          setError("Failed to load stores.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 ${jakarta.className}`}>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Stores</h2>
        <p className="text-gray-500 mt-2">Browse the delivery and logistics hubs.</p>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
          {error}
        </div>
      ) : isLoading ? (
        // Loading Skeleton Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse h-64">
              <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        // Actual Store Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {stores.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">
              No stores found.
            </div>
          ) : (
            stores.map((store) => (
              <Link 
                key={store.id} 
                href={`/store/${store.id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Storefront Icon Placeholder */}
                  <div className="w-full h-36 bg-gray-50 rounded-xl mb-5 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition-colors duration-300">
                     <svg className="w-10 h-10 text-gray-300 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                     </svg>
                  </div>

                  {/* Coordinates Pill */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 tracking-wide">
                      LAT: {store.lat}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 tracking-wide">
                      LNG: {store.lng}
                    </span>
                  </div>

                  {/* Store Name */}
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors duration-200">
                    {store.name}
                  </h3>
                </div>

                {/* ID Information Footer */}
                <div className="pt-4 border-t border-gray-50 flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-gray-400 font-medium tracking-wide">
                    <span>Store ID:</span>
                    <span className="text-gray-600 truncate ml-2">{store.id}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400 font-medium tracking-wide">
                    <span>Owner ID:</span>
                    <span className="text-gray-600 truncate ml-2">{store.ownerId}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StoreGrid;