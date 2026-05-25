"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateProductForm() {
  const router = useRouter();
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // State for store context
  const [storeDetails, setStoreDetails] = useState(null);
  const [isCheckingStore, setIsCheckingStore] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '1',
    isEdible: false,
  });

  // Fetch the user's store details when the component mounts
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem('velocix_token');
        console.log(token)
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        
        // Hitting your specific endpoint
        const response = await axios.get(`${baseUrl}/store/check`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data && response.data.id) {
          // Save the whole store object so we can display the name
          setStoreDetails({
            id: response.data.id,
            name: response.data.name 
          });
        }
      } catch (error) {
        console.error("Could not fetch store:", error);
        setErrorMessage("Could not verify your store. Please refresh or create a store first.");
      } finally {
        setIsCheckingStore(false);
      }
    };
    
    fetchStore();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeDetails?.id) {
      setErrorMessage("No store ID found. You must create a store before adding products.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('velocix_token');
      
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        storeId: storeDetails.id, // Using the ID from our new state
        category: formData.category,
        isEdible: formData.isEdible,
        stock: parseInt(formData.stock, 10)
      };

      await axios.post(`${baseUrl}/product/create`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      router.push('/dashboard/inventory');

    } catch (error) {
      console.error('Product Creation Error:', error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to create product. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 bg-[#ffffff] border border-[#e6e8ea] rounded-lg text-[#565e74] hover:bg-[#f2f4f6] transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-[32px] leading-[1.2] tracking-[-0.03em] font-semibold font-['Geist'] text-[#191c1e]">
            Add New Product
          </h1>
          <p className="text-[14px] font-['Inter'] text-[#565e74]">
            Expand your hyperlocal catalog.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-[#ffffff] border border-[#e6e8ea] rounded-2xl shadow-sm p-6 md:p-8">
        
        {/* === NEW: Active Store Badge === */}
        {isCheckingStore ? (
          <div className="mb-8 p-4 bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl flex items-center gap-3 animate-pulse">
            <div className="w-8 h-8 bg-[#e6e8ea] rounded-lg"></div>
            <div className="space-y-2">
              <div className="w-24 h-3 bg-[#e6e8ea] rounded"></div>
              <div className="w-48 h-4 bg-[#e6e8ea] rounded"></div>
            </div>
          </div>
        ) : storeDetails ? (
          <div className="mb-8 p-4 bg-[#f0f5ec] border border-[#c4e9c3] rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00873a]/10 text-[#006b2c] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">storefront</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.05em] uppercase text-[#456648] mb-0.5">
                Adding to Store
              </p>
              <p className="text-[15px] font-medium text-[#00501f]">
                {storeDetails.name}
              </p>
            </div>
          </div>
        ) : null}

        {errorMessage && (
          <div className="mb-6 p-4 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
                Product Name
              </label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-[#ffffff] border border-[#bdcaba] rounded-xl text-[16px] font-['Inter'] text-[#191c1e] placeholder:text-[#5c647a]/70 focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd] transition-all outline-none" 
                placeholder="e.g., Organic Avocados (2-pack)" 
                required 
                type="text" 
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
                Category
              </label>
              <div className="relative">
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="appearance-none w-full h-12 pl-4 pr-10 bg-[#ffffff] border border-[#bdcaba] rounded-xl text-[16px] font-['Inter'] text-[#191c1e] focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd] transition-all outline-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Produce">Produce</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#565e74] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] font-medium z-10 pointer-events-none">
                  $
                </span>
                <input 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-12 pl-8 pr-4 bg-[#ffffff] border border-[#bdcaba] rounded-xl text-[16px] font-['Inter'] text-[#191c1e] focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd] transition-all outline-none" 
                  placeholder="0.00" 
                  step="0.01"
                  min="0"
                  required 
                  type="number" 
                />
              </div>
            </div>

            {/* Initial Stock */}
            <div>
              <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
                Initial Stock Level
              </label>
              <input 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-[#ffffff] border border-[#bdcaba] rounded-xl text-[16px] font-['Inter'] text-[#191c1e] focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd] transition-all outline-none" 
                min="0"
                required 
                type="number" 
              />
            </div>
            
            {/* Is Edible Toggle */}
            <div className="flex flex-col justify-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    name="isEdible"
                    checked={formData.isEdible}
                    onChange={handleChange}
                    type="checkbox" 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-[#e6e8ea] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00873a]"></div>
                </div>
                <div>
                  <span className="block font-['Inter'] text-[14px] font-medium text-[#191c1e]">Edible Item</span>
                  <span className="block font-['Inter'] text-[12px] text-[#565e74]">Requires safe food handling</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-[#e6e8ea] mt-8 flex gap-4">
            <button 
              type="button"
              onClick={() => router.back()}
              className="w-1/3 h-12 bg-[#ffffff] border border-[#bdcaba] hover:bg-[#f2f4f6] text-[#191c1e] font-['Geist'] text-[16px] font-semibold rounded-xl transition-all shadow-sm"
            >
              Cancel
            </button>
            <button 
              disabled={isSubmitting || !storeDetails?.id || isCheckingStore}
              className="w-2/3 h-12 bg-[#00873a] hover:bg-[#006b2c] text-white font-['Geist'] text-[16px] font-semibold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm" 
              type="submit"
            >
              {isSubmitting ? 'Saving Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}