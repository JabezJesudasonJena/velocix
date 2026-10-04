"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Loader2, AlertCircle, Plus, 
  FolderTree, ArrowRight, Calendar, LayoutGrid 
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/category", { method: "GET" });
        const json = await res.json();

        if (json.success) {
          setCategories(json.data);
        } else {
          setError(json.message || "Failed to load categories.");
        }
      } catch (err: any) {
        setError("An unexpected error occurred while connecting to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // --- Premium Loading State ---
  if (loading) {
    return (
      <main className="min-h-screen bg-[#040405] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Loading Collections
        </p>
      </main>
    );
  }

  // --- Premium Error State ---
  if (error) {
    return (
      <main className="min-h-screen bg-[#040405] flex items-center justify-center p-6">
        <div className="flex max-w-md w-full flex-col items-center gap-4 rounded-3xl bg-neutral-900 border border-white/5 p-8 text-center shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Connection Error</h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* --- Header & Action --- */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white flex items-center gap-3">
              <LayoutGrid className="h-8 w-8 text-neutral-500" strokeWidth={1.5} />
              Categories
            </h1>
            <p className="mt-3 text-base text-neutral-400">
              Manage product collections and store catalog organization.
            </p>
          </div>
          
          <Link 
            href="/category/new" 
            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-lg shadow-white/10"
          >
            <Plus className="h-4 w-4" />
            Create Category
          </Link>
        </div>

        {/* --- Empty State --- */}
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-neutral-900/40 py-24 text-center shadow-inner">
            <FolderTree className="mb-5 h-12 w-12 text-neutral-600" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-white">No categories found</h3>
            <p className="mt-3 max-w-md text-neutral-400 leading-relaxed">
              Your catalog is currently unorganized. Create your first category to start grouping your products.
            </p>
            <Link 
              href="/category/new" 
              className="mt-8 flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-800 border border-white/10 px-8 text-sm font-bold text-white transition-all hover:bg-neutral-700 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Add First Category
            </Link>
          </div>
        ) : (
          
          /* --- Category Grid --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`}
                className="group relative flex flex-col justify-between rounded-3xl bg-neutral-900 border border-white/5 p-6 sm:p-8 transition-all duration-300 hover:bg-neutral-800/80 hover:border-white/20 hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#040405]"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 border border-white/10 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                    <FolderTree className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs font-medium text-neutral-600 uppercase tracking-widest bg-neutral-950 px-2.5 py-1 rounded-md border border-white/5">
                    ID: {category.id.toString().padStart(3, '0')}
                  </span>
                </div>

                {/* Details Section */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Calendar className="h-4 w-4 text-neutral-600" />
                    <span>Created {new Date(category.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Hover Action Strip */}
                <div className="mt-8 flex items-center justify-between pt-5 border-t border-white/5">
                  <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                    Manage Collection
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-neutral-400 transition-all group-hover:bg-white group-hover:text-black">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}