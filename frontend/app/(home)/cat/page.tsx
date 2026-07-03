"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";

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
          setError(json.message || "Failed to load products.");
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  if (loading) {
    return (
      <main className="page-shell flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-shell flex items-center justify-center">
        <div className="bg-red-900/40 border border-red-800 text-red-200 p-6 rounded-lg max-w-md w-full text-center">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-7xl">
        
        <div className="mb-12 text-center md:text-left">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Discover Products</h1>
          <p className="text-neutral-400 text-lg">Browse our latest collections sorted by category.</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-xl">
            <p className="text-neutral-400 text-lg">No products available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => (
              <section key={category.id} className="w-full">
                
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-white capitalize whitespace-nowrap">
                    {category.name}
                  </h2>
                  <div className="h-px bg-neutral-800 w-full flex-1"></div>
                  <Link 
                    href={`/category/${category.id}`} 
                    className="text-sm text-neutral-400 hover:text-white whitespace-nowrap transition-colors"
                  >
                    View All &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <Link 
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="panel group flex cursor-pointer flex-col p-5 transition-all hover:-translate-y-1 hover:border-neutral-700"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-neutral-950 border border-neutral-800 ${product.status === 'AVL' ? 'text-green-400' : 'text-neutral-500'}`}>
                          {product.status === 'AVL' ? 'In Stock' : product.status}
                        </span>
                        {product.discount_price && (
                          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-red-900/30 text-red-400 border border-red-800">
                            Sale
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-neutral-400 text-sm flex-grow mb-6 line-clamp-2">
                        {product.desc}
                      </p>

                      <div className="flex items-end justify-between pt-4 border-t border-neutral-800">
                        <div className="flex flex-col">
                          {product.discount_price ? (
                            <>
                              <span className="text-xs text-neutral-500 line-through">${product.price.toFixed(2)}</span>
                              <span className="text-lg font-bold text-white">${product.discount_price.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                          <span className="font-bold">+</span>
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