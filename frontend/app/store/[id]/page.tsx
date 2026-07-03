"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// Assuming you have a fetch utility or you pass the data as props. 
// For this example, we will simulate the state holding your backend response.

export default function StoreDashboard() {
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const storeId = params.id; // 2. Extract the ID from the URL

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      // Don't run the fetch if the ID isn't ready yet
      if (!storeId) return; 

      try {
        setLoading(true);
        
        // 3. Hit your real endpoint!
        // Note: Adjust the path if your fetchClient automatically adds "/api" for you.
        const res = await fetch(`http://localhost:5000/api/store/storeproducts/${storeId}`, {
          method: "GET"
        });
        
        const json = await res.json();
        
        if (json.success) {
          setStoreData(json.data);
        } else {
          setError(json.message || "Failed to load store");
        }
      } catch (err: any) {
        console.error("Failed to fetch store:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId]); // 4. Add storeId to the dependency array

  if (loading) {
    return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Loading store...</div>;
  }

  if (!storeData) {
    return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Store not found.</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Store Header Section */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{storeData.name}</h1>
              <p className="text-neutral-400">{storeData.desc || "No description provided."}</p>
            </div>
            <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-800 rounded-full text-sm font-medium uppercase tracking-wider">
              {storeData.status}
            </span>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6 border-b border-neutral-800 pb-4">
          <h2 className="text-2xl font-semibold">Available Products</h2>
          <p className="text-neutral-500 text-sm mt-1">Showing {storeData.products.length} items</p>
        </div>

        {/* Product Grid - This maps over the products array */}
        {storeData.products && storeData.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeData.products.map((product: any) => (
              <div 
                key={product.id} 
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 flex flex-col hover:border-neutral-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-white">{product.name}</h3>
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                </div>
                
                <p className="text-neutral-400 text-sm flex-grow mb-6">
                  {product.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-800 text-xs text-neutral-500">
                  <span>SKU: {product.sku}</span>
                  <span className={`${product.status === 'AVL' ? 'text-green-500' : 'text-neutral-500'}`}>
                    {product.status === 'AVL' ? 'In Stock' : product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-12 text-center text-neutral-500">
            No products available in this store right now.
          </div>
        )}

      </div>
    </main>
  );
}