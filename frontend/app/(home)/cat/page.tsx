"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";
import { ArrowRight, AlertCircle, Loader2, ImageIcon, ShoppingBag } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  storeId: number;
  categoryId: number;
  isEdible: boolean;
  status: string;
  sku: string;
  discount_price: number | null;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  createdAt: string;
  products: Product[];
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const res = await fetchClient("/category/all", { method: "GET" });
        const json = await res.json();

        if (json.success) {
          // Filter out categories that don't have any products yet
          const populatedCategories = json.data.filter(
            (cat: Category) => cat.products && cat.products.length > 0
          );
          setCategories(populatedCategories);
        } else {
          setError(json.message || "Failed to load collections.");
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching the catalog.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  // --- High-End Loading State ---
  if (loading) {
    return (
      <main className="min-h-screen bg-[#040405] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Curating Collections
        </p>
      </main>
    );
  }

  // --- Elegant Error State ---
  if (error) {
    return (
      <main className="min-h-screen bg-[#040405] flex items-center justify-center p-6">
        <div className="flex max-w-md w-full flex-col items-center gap-4 rounded-2xl bg-neutral-900 border border-white/5 p-8 text-center shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Connection Error</h3>
            <p className="mt-2 text-sm text-neutral-400">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black">
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* --- Hero Header --- */}
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
            Discover Collections
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Browse our latest arrivals and curated picks, sorted by category for a seamless shopping experience.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl bg-neutral-900/50 border border-white/5">
            <ShoppingBag className="mb-4 h-10 w-10 text-neutral-600" strokeWidth={1} />
            <h3 className="text-xl font-medium text-white">No products available</h3>
            <p className="mt-2 text-neutral-400">Our catalog is currently being updated. Please check back soon.</p>
          </div>
        ) : (
          <div className="space-y-24">
            {categories.map((category) => (
              <section key={category.id} className="w-full">
                
                {/* --- Category Header --- */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white capitalize">
                      {category.name}
                    </h2>
                  </div>
                  <Link 
                    href={`/category/${category.id}`} 
                    className="group flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white pb-1"
                  >
                    View Collection 
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* --- Responsive Product Grid --- */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                  {category.products.map((product) => (
                    
                    /* Inline Product Card matching our Premium Design System */
                    <Link 
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 transition-all duration-300 hover:bg-neutral-800/80 hover:shadow-xl ring-1 ring-white/5 hover:ring-white/20"
                    >
                      {/* Image Area */}
                      <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0a]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/50 to-transparent z-0"></div>
                        <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                           <ImageIcon className="h-8 w-8 text-neutral-700" strokeWidth={1.5} />
                        </div>

                        {/* Badges */}
                        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5 items-start">
                          {product.status === 'AVL' && (
                            <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black shadow-sm">
                              <span className="h-1 w-1 rounded-full bg-green-500"></span>
                              Stock
                            </span>
                          )}
                          {product.discount_price && (
                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                              Sale
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col flex-grow p-4">
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <h3 className="line-clamp-1 text-sm font-medium tracking-tight text-white transition-colors" title={product.name}>
                            {product.name}
                          </h3>
                        </div>
                        
                        <p className="mb-4 flex-grow line-clamp-1 text-xs text-neutral-400">
                          {product.desc}
                        </p>

                        {/* Pricing & Action */}
                        <div className="mt-auto flex items-end justify-between pt-3 border-t border-white/5">
                          <div className="flex flex-col">
                            {product.discount_price ? (
                              <>
                                <span className="font-mono text-[10px] text-neutral-500 line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                                <span className="font-mono text-sm font-semibold text-white">
                                  ${product.discount_price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="font-mono text-sm font-semibold text-white">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          {/* Visual "Add" Button (Clicking the card routes to PDP) */}
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-black">
                            <ShoppingBag className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>

                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}