"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";
import { 
  ArrowLeft, AlertCircle, Loader2, 
  CheckCircle2, Tags, FolderPlus 
} from "lucide-react";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  
  // Upgraded 3-state tracking for extreme fluidity
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setStatus('error');
      setMessage("Category name is required.");
      return;
    }

    setStatus('processing');
    setMessage(null);

    try {
      const res = await fetchClient("/category/create", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to create category");
      }

      setStatus('success');

      // Hold the success animation for 1.2 seconds before routing
      setTimeout(() => {
        router.push("/category");
        router.refresh(); 
      }, 1200);

    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || "An unexpected error occurred.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === 'error') {
      setStatus('idle');
      setMessage(null);
    }
    setName(e.target.value);
  };

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Back Navigation */}
        <Link 
          href="/category" 
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-white"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 border border-white/5 transition-transform group-hover:-translate-x-1">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Categories
        </Link>
        
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/5 shadow-2xl p-8 sm:p-10">
          
          {/* Card Inner Glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-[80px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 border border-white/10 shadow-inner">
                <FolderPlus className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">New Category</h1>
                <p className="text-sm text-neutral-400 mt-1">Organize your store's inventory.</p>
              </div>
            </div>

            {/* Fluid Error Banner */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                status === 'error' ? 'max-h-24 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'
              }`}
            >
              <div className="flex items-center gap-3 rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-sm font-medium text-red-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{message}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-3">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                  Category Name
                </label>
                
                {/* Immersive Input Field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-neutral-500 transition-colors duration-300 group-focus-within:text-white">
                    <Tags className="h-5 w-5" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    disabled={status === 'processing' || status === 'success'}
                    placeholder="e.g. Mechanical Watches"
                    className="w-full h-14 rounded-2xl bg-neutral-950 border border-neutral-800 pl-14 pr-5 text-base text-white placeholder-neutral-600 outline-none transition-all duration-300 focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Action Button - 3 State Animated */}
              <button 
                type="submit" 
                disabled={status === 'processing' || status === 'success' || !name.trim()}
                className="group relative flex w-full h-14 items-center justify-center overflow-hidden rounded-2xl bg-white text-base font-bold text-neutral-950 transition-all duration-300 hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {/* Default State */}
                <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-out ${status === 'idle' || status === 'error' ? 'translate-y-0' : '-translate-y-full'}`}>
                  Create Category
                </span>
                
                {/* Loading State */}
                <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-out ${status === 'processing' ? 'translate-y-0' : 'translate-y-full'}`}>
                  <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
                  Saving...
                </span>

                {/* Success State */}
                <span className={`absolute inset-0 flex items-center justify-center gap-2 bg-green-500 text-white transition-transform duration-500 ease-out ${status === 'success' ? 'translate-y-0' : 'translate-y-full'}`}>
                  <CheckCircle2 className="h-5 w-5" />
                  Category Created
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}