'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import api from '@/utils/axios'; // Using your custom Axios instance

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function CreateProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const storeId = resolvedParams.id;
  const router = useRouter();
  
  // 1. State for Store Information
  const [storeName, setStoreName] = useState<string>('Loading Store...');
  const [isFetchingStore, setIsFetchingStore] = useState(true);

  // 2. State for Form Data
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: ''
  });
  const [isEdible, setIsEdible] = useState<boolean>(true); // Default to true (green)
  
  // 3. State for Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Fetch the store name for the headline
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await api.get(`/store/storeproducts/${storeId}`);
        if (response.data && response.data.data) {
          setStoreName(response.data.data.name);
        } else {
          setStoreName('Unknown Store');
        }
      } catch (err) {
        console.error("Failed to fetch store details", err);
        setStoreName('Unknown Store');
      } finally {
        setIsFetchingStore(false);
      }
    };
    fetchStore();
  }, [storeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Prepare payload parsing numbers properly
    const payload = {
      name: formData.name,
      price: parseInt(formData.price, 10),
      category: formData.category,
      stock: parseInt(formData.stock, 10),
      isEdible: isEdible,
      storeId: parseInt(storeId, 10) // Automatically attach the store ID from the URL!
    };

    try {
      // POST request to your backend product creation route
      await api.post('/product/create', payload);
      
      setShowToast(true);
      setTimeout(() => {
        // Send them back to the specific store's inventory page
        router.push(`/store/${storeId}`);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add product. Check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#fafafa] text-gray-900 pb-20 ${jakarta.className}`}>
      
      {/* Premium Header/Nav Area */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/store/${storeId}`} className="text-gray-400 hover:text-emerald-500 transition-colors p-2 -ml-2 rounded-full hover:bg-emerald-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <span className="font-bold text-sm text-gray-500 tracking-wide uppercase">Back to Inventory</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Dynamic Page Title */}
        <div className="mb-10 animate-[fadeIn_0.4s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-extrabold tracking-widest uppercase mb-4 border border-blue-100">
            {isFetchingStore ? 'Loading Context...' : `Adding to ${storeName}`}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Register New Product</h1>
          <p className="text-gray-500 mt-2 text-base font-medium">Expand the inventory catalog for this specific location.</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden animate-[slideInUp_0.5s_ease-out]">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Row 1: Product Name */}
            <div className="space-y-2.5">
              <label className="block text-base font-bold text-gray-700" htmlFor="name">Product Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-lg font-bold"
                placeholder="e.g. Organic Arabica Coffee Beans"
              />
            </div>

            {/* Row 2: Price & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="block text-sm font-bold text-gray-700" htmlFor="price">Price (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold text-lg">₹</span>
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-base font-medium"
                    placeholder="499"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-sm font-bold text-gray-700" htmlFor="category">Category</label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 appearance-none focus:bg-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-base font-medium cursor-pointer"
                  >
                    <option value="" disabled>Select a category...</option>
                    <option value="food">Food & Beverage</option>
                    <option value="electronics">Electronics</option>
                    <option value="apparel">Apparel</option>
                    <option value="essentials">Daily Essentials</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Is Edible & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              
              {/* Custom Edible Toggle Button */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Consumable Status</label>
                <button
                  type="button"
                  onClick={() => setIsEdible(!isEdible)}
                  className={`relative w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-50
                    ${isEdible 
                      ? 'bg-emerald-100 border-emerald-200 text-emerald-800 focus:ring-emerald-400/30' 
                      : 'bg-red-50 border-red-200 text-red-700 focus:ring-red-400/30'
                    }
                  `}
                >
                  <span>{isEdible ? 'Product is Edible' : 'Non-Edible Item'}</span>
                  
                  {/* Status Indicator Dot */}
                  <span className={`w-3 h-3 rounded-full shadow-inner transition-colors duration-300
                    ${isEdible ? 'bg-emerald-500 shadow-emerald-700/50' : 'bg-red-500 shadow-red-700/50'}
                  `}></span>
                </button>
              </div>

              {/* Stock Input */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide" htmlFor="stock">Initial Stock Level</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-base font-medium"
                  placeholder="e.g. 50 units"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100">
              <Link 
                href={`/stores/${storeId}`}
                className="px-6 py-3.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || isFetchingStore}
                className="flex justify-center items-center py-3.5 px-8 border border-transparent rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] text-base font-bold text-white bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  'Add Product to Store'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Animated Success Toast */}
      <div 
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white border border-gray-100 text-gray-800 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
      >
        <div className="flex-shrink-0 bg-emerald-50 rounded-full p-1.5">
          <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className={showToast ? "animate-[dash_0.5s_ease-out_forwards]" : ""} strokeDasharray="24" strokeDashoffset="24" />
          </svg>
        </div>
        <span className="font-bold text-sm tracking-wide">Product added successfully!</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
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