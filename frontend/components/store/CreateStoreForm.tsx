"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateStoreForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Simplified state to only require the store name
  const [formData, setFormData] = useState({
    name: '', // Updated from storeName to name to match your backend logic expectation
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      
      // Pass the JWT token. Assuming you store it in localStorage as 'velocix_token'
      const token = localStorage.getItem('velocix_token');
      
      const response = await axios.post(`${baseUrl}/store/create`, formData, {
        headers: {
          'Authorization': `Bearer ${token}` // Ensure your backend verifyToken middleware expects this format
        }
      });

      console.log('Store Created:', response.data);
      
      // Redirect to the inventory page now that they have a store
      router.push('/dashboard/inventory');

    } catch (error) {
      console.error('Store Creation Error:', error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to create store. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4">
      
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-[#00873a]/10 text-[#006b2c] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00873a]/20">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            storefront
          </span>
        </div>
        <h1 className="text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.03em] font-semibold font-['Geist'] text-[#191c1e] mb-2">
          Set up your first store
        </h1>
        <p className="text-[16px] font-['Inter'] text-[#565e74]">
          Give your hyperlocal fulfillment center a name to get started.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#ffffff] border border-[#e6e8ea] rounded-2xl shadow-sm p-6 md:p-8">
        
        {errorMessage && (
          <div className="mb-6 p-4 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Store Name Input ONLY */}
          <div>
            <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
              Store Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">
                shopping_bag
              </span>
              <input 
                name="name" // Matches the updated state key
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 pl-12 pr-4 bg-[#ffffff] border border-[#bdcaba] rounded-xl text-[16px] font-['Inter'] text-[#191c1e] placeholder:text-[#5c647a]/70 focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd] transition-all outline-none" 
                placeholder="e.g., Velocix Fresh - Downtown" 
                required 
                type="text" 
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              disabled={isLoading}
              className="w-full h-12 bg-[#00873a] hover:bg-[#006b2c] text-white font-['Geist'] text-[16px] font-semibold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm" 
              type="submit"
            >
              {isLoading ? 'Creating Store...' : 'Create Store & Continue'}
              {!isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}