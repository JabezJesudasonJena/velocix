"use client";

import React, { useState } from 'react';

export default function DashboardLayout({ children, role = 'admin' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Example navigation links based on role
  const navLinks = [
    { name: 'Overview', icon: 'dashboard', href: '/dashboard' },
    { name: 'Orders', icon: 'list_alt', href: '/orders' },
    { name: 'Inventory', icon: 'inventory_2', href: '/inventory' },
    { name: 'Drivers', icon: 'local_shipping', href: '/drivers' },
    { name: 'Analytics', icon: 'insights', href: '/analytics' },
  ];

  return (
    <div className="flex h-screen bg-[#f2f4f6] font-['Inter'] antialiased overflow-hidden">
      
      {/* Required for the Google Icons */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
        }
      `}</style>

      {/* SIDEBAR (Dark Slate as per DESIGN.md) */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col bg-[#2d3133] text-white shadow-2xl z-20`}
      >
        {/* Brand Logo */}
        <div className="h-20 flex items-center justify-center border-b border-[rgba(255,255,255,0.1)]">
          <span className="material-symbols-outlined text-[#62df7d] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            deployed_code
          </span>
          {isSidebarOpen && (
            <span className="ml-3 font-semibold text-xl tracking-tight">Velocix</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              className={`flex items-center px-3 py-3 rounded-xl transition-all group ${
                index === 0 
                  ? 'bg-[#00873a]/20 text-[#62df7d] border border-[#00873a]/30' // Active State
                  : 'text-[#bdcaba] hover:bg-[#eceef0]/10 hover:text-white' // Inactive State
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {isSidebarOpen && (
                <span className="ml-3 text-sm font-medium">{link.name}</span>
              )}
            </a>
          ))}
        </nav>

        {/* User Profile Mini */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center p-2 bg-[#191c1e] rounded-xl border border-[rgba(255,255,255,0.05)]">
            <div className="w-8 h-8 rounded-full bg-[#006b2c] flex items-center justify-center text-xs font-bold">
              JD
            </div>
            {isSidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">Jane Doe</p>
                <p className="text-[10px] text-[#bdcaba] uppercase tracking-wider">{role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-[#f7f9fb]/80 backdrop-blur-md border-b border-[#e6e8ea] flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-[#565e74] hover:bg-[#e6e8ea] transition-colors"
            >
              <span className="material-symbols-outlined">menu_open</span>
            </button>
            <h2 className="text-xl font-semibold text-[#191c1e] tracking-tight">System Overview</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full text-[#565e74] hover:bg-[#e6e8ea] transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB084]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00873a]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Your Page Component gets injected here */}
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}