"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function StoresPage() {
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const token = localStorage.getItem('velocix_token');

        // Assuming your backend has a GET endpoint to fetch stores for the logged-in user
        const response = await axios.get(`${baseUrl}/stores`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // Safely handle the array extraction just like we did in the inventory table
        const data = response.data;
        if (Array.isArray(data)) {
          setStores(data);
        } else if (data && Array.isArray(data.stores)) {
          setStores(data.stores);
        } else if (data && Array.isArray(data.data)) {
          setStores(data.data);
        } else {
          setStores([]);
        }
      } catch (err) {
        console.error("Failed to fetch stores:", err);
        setError("Could not load your stores. Ensure your backend is running.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-6 font-['Inter']">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-semibold font-['Geist'] text-[#191c1e] tracking-tight">
            Hub Management
          </h1>
          <p className="text-[14px] text-[#565e74] mt-1">
            Manage your active hyperlocal delivery centers.
          </p>
        </div>
        
        {/* ADD STORE CTA */}
        <button 
          onClick={() => router.push('/dashboard/stores/create')}
          className="h-11 px-5 bg-[#00873a] hover:bg-[#006b2c] text-white text-[14px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add_location</span>
          Deploy New Hub
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* STORES GRID */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="h-48 bg-[#f7f9fb] border border-[#e6e8ea] rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : stores.length === 0 ? (
        <div className="w-full bg-[#ffffff] border border-[#e6e8ea] rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-[#f0f5ec] text-[#00873a] rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">storefront</span>
          </div>
          <h3 className="text-[20px] font-semibold font-['Geist'] text-[#191c1e] mb-2">No active hubs</h3>
          <p className="text-[14px] text-[#565e74] max-w-md mb-6">
            You haven't deployed any stores yet. Create your first hyperlocal hub to start managing inventory.
          </p>
          <button 
            onClick={() => router.push('/dashboard/stores/create')}
            className="h-11 px-5 bg-[#191c1e] hover:bg-[#000000] text-white text-[14px] font-semibold rounded-xl transition-all shadow-sm"
          >
            Create Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-[#ffffff] border border-[#e6e8ea] hover:border-[#bdcaba] rounded-2xl p-6 transition-colors group flex flex-col">
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-[#00873a]/10 text-[#006b2c] rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    storefront
                  </span>
                </div>
                <div className="px-2.5 py-1 bg-[#e6f4ea] text-[#006b2c] text-[11px] font-bold uppercase tracking-wider rounded-md">
                  Active
                </div>
              </div>

              <h3 className="text-[18px] font-semibold font-['Geist'] text-[#191c1e] mb-1 truncate">
                {store.name}
              </h3>
              
              <div className="flex items-start gap-1.5 text-[#565e74] mb-6">
                <span className="material-symbols-outlined text-[16px] mt-0.5">location_on</span>
                <p className="text-[13px] leading-snug line-clamp-2">
                  {store.address || "Address pending geocoding setup"}
                </p>
              </div>

              {/* Status / Metric Footer */}
              <div className="mt-auto pt-4 border-t border-[#e6e8ea] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00873a]"></span>
                  <span className="text-[12px] font-medium text-[#191c1e]">Online</span>
                </div>
                <button 
                  onClick={() => router.push(`/dashboard/inventory?store=${store.id}`)}
                  className="text-[13px] font-semibold text-[#00873a] hover:text-[#006b2c] transition-colors"
                >
                  Manage Inventory →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}