"use client";

import React, { useState } from 'react';

export default function ConsumerHomepage() {
  // In a real app, these would be populated by your GET /consumer/feed endpoint
  const [activeAddress, setActiveAddress] = useState("123 Main St, Apt 4B");
  
  const categories = [
    { id: 1, name: "Produce", icon: "eco", color: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
    { id: 2, name: "Dairy", icon: "water_drop", color: "bg-[#e3f2fd]", text: "text-[#1565c0]" },
    { id: 3, name: "Bakery", icon: "bakery_dining", color: "bg-[#fff3e0]", text: "text-[#ef6c00]" },
    { id: 4, name: "Snacks", icon: "cookie", color: "bg-[#fce4ec]", text: "text-[#c2185b]" },
    { id: 5, name: "Drinks", icon: "local_cafe", color: "bg-[#f3e5f5]", text: "text-[#7b1fa2]" },
  ];

  const trendingProducts = [
    { id: 101, name: "Organic Hass Avocado", price: 2.49, weight: "1 pc", image: "🥑" },
    { id: 102, name: "Whole Milk, 1 Gallon", price: 4.29, weight: "1 gal", image: "🥛" },
    { id: 103, name: "Sourdough Bread", price: 5.99, weight: "1 loaf", image: "🍞" },
    { id: 104, name: "Free Range Eggs", price: 6.49, weight: "12 ct", image: "🥚" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f7f9fb] font-['Inter'] pb-24">
      
      {/* HEADER: Location & Search */}
      <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#e6e8ea] px-4 pt-4 pb-3 shadow-sm">
        <div className="max-w-3xl mx-auto">
          {/* Location Selector */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="material-symbols-outlined text-[#00873a]" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-[#565e74] font-['Geist']">
                  Delivering to
                </p>
                <div className="flex items-center gap-1">
                  <h2 className="text-[15px] font-semibold text-[#191c1e] truncate max-w-[200px]">
                    {activeAddress}
                  </h2>
                  <span className="material-symbols-outlined text-[#191c1e] text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
            
            {/* User Profile / Cart Icon */}
            <div className="w-10 h-10 bg-[#f0f5ec] rounded-full flex items-center justify-center text-[#006b2c] cursor-pointer">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
          </div>

          {/* Global Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#565e74]">
              search
            </span>
            <input 
              type="text" 
              placeholder="Search for groceries, snacks, etc..." 
              className="w-full h-12 pl-10 pr-4 bg-[#f2f4f6] border border-transparent focus:bg-[#ffffff] focus:border-[#00873a] rounded-xl text-[15px] outline-none transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto pt-6 px-4 space-y-8">
        
        {/* HERO BANNER */}
        <div className="w-full h-32 bg-gradient-to-r from-[#006b2c] to-[#00873a] rounded-2xl flex items-center justify-between px-6 shadow-sm overflow-hidden relative">
          <div className="relative z-10 text-white">
            <h2 className="text-[22px] font-bold font-['Geist'] leading-tight mb-1">10-Minute<br/>Delivery</h2>
            <p className="text-[13px] opacity-90">Fresh from the hub.</p>
          </div>
          <span className="text-[80px] absolute -right-4 -bottom-4 opacity-50 select-none">⏱️</span>
        </div>

        {/* CATEGORIES GRID */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-[18px] font-semibold font-['Geist'] text-[#191c1e]">Explore Categories</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center gap-2 cursor-pointer min-w-[72px]">
                <div className={`w-16 h-16 rounded-2xl ${cat.color} ${cat.text} flex items-center justify-center shadow-sm`}>
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {cat.icon}
                  </span>
                </div>
                <span className="text-[12px] font-medium text-[#565e74]">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TRENDING SHELF (Horizontal Scroll) */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[18px] font-semibold font-['Geist'] text-[#191c1e]">Trending Near You</h3>
            <span className="text-[13px] font-medium text-[#00873a] cursor-pointer">See all</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
            {trendingProducts.map((product) => (
              <div key={product.id} className="min-w-[140px] max-w-[140px] bg-[#ffffff] border border-[#e6e8ea] rounded-2xl p-3 shadow-sm relative group cursor-pointer hover:border-[#bdcaba] transition-all">
                
                {/* Product Image Placeholder */}
                <div className="w-full h-24 bg-[#f7f9fb] rounded-xl flex items-center justify-center text-[40px] mb-3">
                  {product.image}
                </div>
                
                {/* Product Info */}
                <h4 className="text-[13px] font-medium text-[#191c1e] leading-snug line-clamp-2 mb-1 h-10">
                  {product.name}
                </h4>
                <p className="text-[12px] text-[#565e74] mb-3">{product.weight}</p>
                
                {/* Price and Add Button */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[14px] font-semibold text-[#191c1e]">${product.price}</span>
                  <button className="w-8 h-8 bg-[#f0f5ec] text-[#00873a] group-hover:bg-[#00873a] group-hover:text-white rounded-lg flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}