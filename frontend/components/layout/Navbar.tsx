"use client";

import React, { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-xl border-b border-[#e6e8ea] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#00873a]/10 text-[#006b2c] rounded-xl flex items-center justify-center transition-colors group-hover:bg-[#00873a]/20">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              deployed_code
            </span>
          </div>
          <span className="font-['Geist'] text-[24px] font-semibold tracking-tight text-[#191c1e]">
            Velocix
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-['Inter'] text-[15px] font-medium text-[#565e74]">
          <a href="/solutions" className="hover:text-[#006b2c] transition-colors">Solutions</a>
          <a href="/infrastructure" className="hover:text-[#006b2c] transition-colors">Infrastructure</a>
          <a href="/docs" className="hover:text-[#006b2c] transition-colors">API Docs</a>
          <a href="/pricing" className="hover:text-[#006b2c] transition-colors">Pricing</a>
        </div>

        {/* Right: Actions (Login & CTA) */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="/login" 
            className="font-['Inter'] text-[14px] font-semibold text-[#191c1e] hover:text-[#006b2c] transition-colors px-4 py-2"
          >
            Log in
          </a>
          <a 
            href="/signup" 
            className="bg-[#00873a] hover:bg-[#006b2c] text-white font-['Inter'] text-[14px] font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            Get Started
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[#565e74] hover:bg-[#e6e8ea] rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#ffffff] border-b border-[#e6e8ea] shadow-lg flex flex-col p-6 gap-4 animate-in fade-in slide-in-from-top-4">
          <a href="/solutions" className="font-['Inter'] text-[16px] font-medium text-[#191c1e]">Solutions</a>
          <a href="/infrastructure" className="font-['Inter'] text-[16px] font-medium text-[#191c1e]">Infrastructure</a>
          <a href="/docs" className="font-['Inter'] text-[16px] font-medium text-[#191c1e]">API Docs</a>
          <a href="/pricing" className="font-['Inter'] text-[16px] font-medium text-[#191c1e]">Pricing</a>
          
          <div className="h-px w-full bg-[#e6e8ea] my-2"></div>
          
          <a href="/login" className="font-['Inter'] text-[16px] font-medium text-[#191c1e] text-center py-2">
            Log in
          </a>
          <a href="/signup" className="w-full bg-[#00873a] text-white text-center font-['Inter'] text-[16px] font-semibold px-5 py-3 rounded-xl">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}