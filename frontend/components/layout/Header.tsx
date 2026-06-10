'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { RootState } from '@/store';
import { useSelector, UseSelector } from 'react-redux';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

interface UserData {
  name: string;
  role: string;
}

const Header = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [mounted, setMounted] = useState(false);
  const totalItems = useSelector((state: RootState) => state.cart.totalQuantity)

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from local storage");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('velocix_token');
    setUser(null);
  };

  return (
    <header className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Company Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link 
            href="/" 
            className={`text-2xl font-bold tracking-wider ${inter.className}`}
          >
            VELOCIX
          </Link>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-1 flex justify-center px-6 max-w-2xl">
          <div className="w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-500 group-focus-within:text-emerald-600 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-emerald-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-300 sm:text-sm transition-all duration-200 shadow-inner"
              placeholder="Search for any products..."
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-shrink-0 flex items-center gap-5">
          
          {/* Cart Button */}
          {/* Cart Button */}
          <Link 
            href="/cart" 
            className={`flex items-center gap-2.5 bg-emerald-700/50 hover:bg-emerald-700/80 px-4 py-2 rounded-full border border-emerald-500/30 transition-all duration-200 shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 ${jakarta.className}`}
          >
            <svg className="w-5 h-5 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            <span className="text-sm font-bold tracking-wide">Cart</span>
            
            {/* Dynamic Counter Badge */}
            <div className={`flex items-center justify-center min-w-[24px] h-[24px] px-1.5 rounded-full text-[11px] font-extrabold transition-all duration-300 ${totalItems > 0 ? 'bg-white text-emerald-700 shadow-sm' : 'bg-emerald-800/50 text-emerald-300'}`}>
              {totalItems}
            </div>
          </Link>

          {/* Conditional Auth UI */}
          {!mounted ? (
            // Skeleton loader to prevent layout shift before hydration
            <div className="w-40 h-10 animate-pulse bg-emerald-700 rounded-lg"></div>
          ) : user ? (
            // Logged-in State: User Profile Block
            <div className={`flex items-center gap-1.5 ${jakarta.className}`}>
              
              {/* Clickable Profile Pill */}
              <Link 
                href="/profile"
                className="flex items-center gap-3 bg-emerald-700/50 hover:bg-emerald-700/80 py-1.5 pl-1.5 pr-4 rounded-full border border-emerald-500/30 transition-all duration-200 shadow-sm"
              >
                {/* Profile Avatar */}
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-sm uppercase shadow-sm">
                  {user.name.charAt(0)}
                </div>
                
                {/* User Details (Left Aligned, Tight Spacing) */}
                <div className="flex flex-col justify-center">
                  <span className="text-[13px] font-bold text-white leading-none mb-1 tracking-wide">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-extrabold text-emerald-300 uppercase tracking-widest leading-none">
                    {user.role.replace('-', ' ')}
                  </span>
                </div>
              </Link>

              {/* Separate Logout Button */}
              <button 
                onClick={handleLogout}
                className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-full transition-colors focus:outline-none"
                title="Sign out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            // Logged-out State: Auth Buttons
            <div className="flex items-center gap-3">
              <Link 
                href="/signin"
                className={`px-3 py-2 text-sm font-bold text-white hover:text-emerald-200 transition-colors focus:outline-none ${jakarta.className}`}
              >
                Sign In
              </Link>
              <Link 
                href="/signup"
                className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-emerald-800 rounded-lg shadow-sm hover:bg-emerald-900 hover:scale-105 hover:shadow-md transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-600 focus:ring-white ${jakarta.className}`}
              >
                Sign Up
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;