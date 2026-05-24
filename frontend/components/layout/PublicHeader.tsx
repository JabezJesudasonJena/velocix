"use client";

import React, { useState } from 'react';

export default function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-[#ffffff]/80 backdrop-blur-md border-b border-[#e6e8ea]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-[#00873a]/10 text-[#006b2c] rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#00873a]/20">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="font-['Geist'] text-[20px] font-semibold tracking-tight text-[#191c1e]">
            Velocix
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#565e74]">
          <a href="/infrastructure" className="hover:text-[#006b2c] transition-colors">Infrastructure</a>
          <a href="/docs" className="hover:text-[#006b2c] transition-colors">Documentation</a>
          <a href="/pricing" className="hover:text-[#006b2c] transition-colors">Pricing</a>
        </nav>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/signin" className="text-[14px] font-medium text-[#191c1e] hover:text-[#006b2c] transition-colors">
            Sign in
          </a>
          <a href="/dashboard/inventory" className="h-9 px-4 bg-[#191c1e] hover:bg-[#000000] text-white text-[13px] font-semibold rounded-lg transition-all flex items-center justify-center shadow-sm">
            Dashboard
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[#565e74] hover:bg-[#e6e8ea] rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            {isMobileMenuOpen 
              ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              : <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#ffffff] border-b border-[#e6e8ea] shadow-lg flex flex-col p-6 gap-4 animate-in fade-in slide-in-from-top-4">
          <a href="/infrastructure" className="text-[16px] font-medium text-[#191c1e]">Infrastructure</a>
          <a href="/docs" className="text-[16px] font-medium text-[#191c1e]">Documentation</a>
          <a href="/pricing" className="text-[16px] font-medium text-[#191c1e]">Pricing</a>
          <div className="h-px w-full bg-[#e6e8ea] my-2"></div>
          <a href="/signin" className="text-[16px] font-medium text-[#191c1e] text-center py-2">Sign in</a>
          <a href="/dashboard/inventory" className="w-full bg-[#191c1e] text-white text-center text-[16px] font-semibold px-5 py-3 rounded-xl">
            Dashboard
          </a>
        </div>
      )}
    </header>
  );
}