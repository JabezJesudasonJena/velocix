'use client';

import React, { useState, useEffect } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';

// Initialize premium font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // SIMULATED API CALL: Replace this with your actual fetch logic
    // fetch('https://your-api.com/products')
    //   .then(res => res.json())
    //   .then(data => setProducts(data))
    
    const fetchDummyData = async () => {
      // Simulating network delay for realistic loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const dummyProducts = Array.from({ length: 12 }).map((_, i) => ({
        id: `PRD-${1000 + i}`,
        storeId: `STR-0${(i % 3) + 1}`,
        name: `Premium Product Model ${i + 1}`,
        category: i % 2 === 0 ? 'Electronics' : 'Accessories',
        stock: Math.floor(Math.random() * 50) + 1,
      }));
      
      setProducts(dummyProducts);
      setIsLoading(false);
    };

    fetchDummyData();
  }, []);

  return (
    <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 ${jakarta.className}`}>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Products</h2>
        <p className="text-gray-500 mt-2">Browse our latest collection.</p>
      </div>

      {isLoading ? (
        // Loading Skeleton Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse h-64">
              <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        // Actual Product Grid
        // xl:grid-cols-5 ensures exactly max 5 items per row on large screens
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Optional: Image Placeholder - remove if you don't use images */}
                <div className="w-full h-36 bg-gray-50 rounded-xl mb-5 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition-colors duration-300">
                   <svg className="w-10 h-10 text-gray-300 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                </div>

                {/* Category & Stock Row */}
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    {product.category}
                  </span>
                  <span className={`text-xs font-bold ${product.stock < 10 ? 'text-orange-500' : 'text-gray-500'}`}>
                    {product.stock} in stock
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors duration-200">
                  {product.name}
                </h3>
              </div>

              {/* ID Information Footer */}
              <div className="pt-4 border-t border-gray-50 flex flex-col gap-1">
                <div className="flex justify-between text-[11px] text-gray-400 font-medium tracking-wide">
                  <span>Product ID:</span>
                  <span className="text-gray-600">{product.id}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-medium tracking-wide">
                  <span>Store ID:</span>
                  <span className="text-gray-600">{product.storeId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;