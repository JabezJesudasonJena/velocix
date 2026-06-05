'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import api from '@/utils/axios';
import axios from 'axios';


const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function CreateStoreForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    lat: '',
    lng: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  // Location
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const payload = {
      name: formData.name,
      desc: formData.desc,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng)
    };

    try {
      await api.post('http://localhost:5002/api/store/create', payload);
      
      setShowToast(true);
      setTimeout(() => {
        router.push('/store');
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to create store. Check your inputs.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoDetect = () => {
    setIsDetectingLocation(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString()
        }));
        setIsDetectingLocation(false);
      },
      (err) => {
        setError('Location access denied or unavailable. Please enter manually.');
        setIsDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className={`min-h-screen bg-[#fafafa] text-gray-900 pb-20 ${jakarta.className}`}>
      
      {/* Header Area */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/stores" className="text-gray-400 hover:text-emerald-500 transition-colors p-2 -ml-2 rounded-full hover:bg-emerald-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <span className="font-bold text-sm text-gray-500 tracking-wide uppercase">Back to Stores</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Register New Store</h1>
          <p className="text-gray-500 mt-2 text-base font-medium">Add a new delivery hub or retail location to the Velocix network.</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Store Name - Increased Size */}
            <div className="space-y-2.5">
              <label className="block text-base font-bold text-gray-700" htmlFor="name">Store Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-lg font-bold"
                placeholder="e.g. Velocix Central Hub"
              />
            </div>

            {/* Description Area - Increased Size */}
            <div className="space-y-2.5">
              <label className="block text-base font-bold text-gray-700" htmlFor="desc">Store Description</label>
              <textarea
                id="desc"
                name="desc"
                required
                rows={4}
                value={formData.desc}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-lg font-medium resize-y"
                placeholder="Briefly describe the purpose and capabilities of this location..."
              />
            </div>

            {/* Bottom Row: Coordinates (Kept smaller for visual hierarchy) */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative overflow-hidden">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Geographical Coordinates
              </h3>
              
              {/* Manual Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide" htmlFor="lat">Latitude</label>
                  <input
                    id="lat"
                    name="lat"
                    type="number"
                    step="any"
                    required
                    value={formData.lat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-sm font-medium"
                    placeholder="e.g. 13.0827"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide" htmlFor="lng">Longitude</label>
                  <input
                    id="lng"
                    name="lng"
                    type="number"
                    step="any"
                    required
                    value={formData.lng}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-sm font-medium"
                    placeholder="e.g. 80.2707"
                  />
                </div>
              </div>

              {/* Auto-Detect Section BELOW the inputs */}
              <div className="mt-5 pt-5 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-semibold text-gray-500">
                  Are you currently at the store's location?
                </span>
                
                <div className="relative group w-full sm:w-auto">
                  {/* Subtle animated glow for the "alive" feel */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  
                  <button
                    type="button"
                    onClick={handleAutoDetect}
                    disabled={isDetectingLocation}
                    className="relative w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isDetectingLocation ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Locating Device...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-emerald-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        Auto-fill Current Location
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
              <Link 
                href="/stores"
                className="px-6 py-3.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center items-center py-3.5 px-8 border border-transparent rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] text-base font-bold text-white bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Store'
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
        <span className="font-bold text-sm tracking-wide">Store registered successfully!</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}