"use client";

import { useState } from 'react';
import { fetchClient } from '@/src/lib/api/apiClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Store, AlignLeft, MapPin, Navigation, 
  Loader2, CheckCircle2, AlertCircle, ArrowLeft 
} from 'lucide-react';

export default function CreateStorePage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    desc: '', 
    lat: 0, 
    lng: 0, 
    status: 'active' 
  });

  // Form submission states
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  // Dedicated location states
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setLocError(null);
    
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }

    setLocLoading(true);
    
    // Requesting high accuracy for logistics-grade coordinate precision
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocLoading(false);
      },
      (error) => {
        console.error(error);
        setLocError("Location access denied or unavailable.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === 'error') {
      setStatus('idle');
      setMessage(null);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.lat === 0 && formData.lng === 0) {
      setStatus('error');
      setMessage("Please capture your store's GPS coordinates before proceeding.");
      return;
    }

    setStatus('processing');
    setMessage(null);

    try {
      const res = await fetchClient("/store/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to create store.");
      }

      setStatus('success');
      
      setTimeout(() => {
        router.push("/profile"); // Assuming profile holds the store dashboard
      }, 1200);

    } catch (error: any) {
      console.error("Error:", error);
      setStatus('error');
      setMessage(error.message || "An unexpected error occurred.");
    }
  };

  const hasLocation = formData.lat !== 0 || formData.lng !== 0;

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[800px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* --- Header Navigation --- */}
        <div className="mb-10 flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 border border-white/5 transition-colors hover:bg-white hover:text-black"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Create New Store
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Establish a new physical location for your inventory.
            </p>
          </div>
        </div>

        {/* --- Error Banner --- */}
        <div className={`mb-8 flex items-center gap-3 rounded-xl bg-red-500/10 p-5 border border-red-500/20 text-sm text-red-400 transition-all duration-300 ${status === 'error' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'}`}>
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{message}</p>
        </div>

        {/* --- Main Form Card --- */}
        <form onSubmit={handleSubmit} className="rounded-3xl bg-neutral-900 border border-white/5 p-6 sm:p-10 shadow-2xl flex flex-col gap-8">
          
          <div className="grid grid-cols-1 gap-6">
            {/* Store Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-300">Store Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                  <Store className="h-4 w-4" />
                </div>
                <input 
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={status === 'processing' || status === 'success'}
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
                  placeholder="e.g. Velocix Hub - Downtown"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-300">Description</label>
              <div className="relative group">
                <div className="absolute top-4 left-0 flex items-center pl-4 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                  <AlignLeft className="h-4 w-4" />
                </div>
                <textarea 
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  disabled={status === 'processing' || status === 'success'}
                  className="w-full resize-y min-h-[120px] rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
                  placeholder="Describe your store's focus and operational hours..."
                />
              </div>
            </div>
          </div>

          {/* --- High-Precision Location Module --- */}
          <div className="flex flex-col gap-3 rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-1">
                  <MapPin className="h-4 w-4 text-neutral-500" />
                  GPS Coordinates
                </label>
                <p className="text-xs text-neutral-500">Required for accurate routing and delivery.</p>
              </div>
              
              {/* Location Status Indicator */}
              {hasLocation && !locLoading && (
                <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 border border-green-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Captured</span>
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3.5">
                <span className={`font-mono text-sm ${hasLocation ? 'text-white' : 'text-neutral-600'}`}>
                  {hasLocation ? `${formData.lat.toFixed(6)}, ${formData.lng.toFixed(6)}` : '0.000000, 0.000000'}
                </span>
              </div>
              <button 
                type="button" 
                onClick={handleGetLocation}
                disabled={locLoading || status === 'processing'}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-800 px-6 text-sm font-semibold text-white transition-all hover:bg-neutral-700 active:scale-95 disabled:opacity-50 shrink-0"
              >
                {locLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Targeting...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4" />
                    Detect Location
                  </>
                )}
              </button>
            </div>
            
            {locError && (
              <p className="text-xs font-medium text-red-400 flex items-center gap-1.5 mt-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {locError}
              </p>
            )}
          </div>

          {/* --- Action Button - 3 State Animated --- */}
          <button 
            type="submit" 
            disabled={status === 'processing' || status === 'success'}
            className="group relative flex w-full h-14 items-center justify-center overflow-hidden rounded-2xl bg-white text-sm font-bold text-neutral-950 transition-all hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 active:scale-[0.98] shadow-lg shadow-white/10 mt-4"
          >
            {/* Default State */}
            <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'idle' || status === 'error' ? 'translate-y-0' : '-translate-y-full'}`}>
              <Store className="h-5 w-5" />
              Initialize Store
            </span>
            
            {/* Loading State */}
            <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'processing' ? 'translate-y-0' : 'translate-y-full'}`}>
              <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
              Registering...
            </span>

            {/* Success State */}
            <span className={`absolute inset-0 flex items-center justify-center gap-2 bg-green-500 text-white transition-transform duration-500 ${status === 'success' ? 'translate-y-0' : 'translate-y-full'}`}>
              <CheckCircle2 className="h-5 w-5" />
              Store Active
            </span>
          </button>
          
        </form>
      </div>
    </main>
  );
}