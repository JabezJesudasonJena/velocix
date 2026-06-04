'use client';

import React from 'react';
import Link from 'next/link';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

// Initialize the Inter font for the logo
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

// Initialize the premium font for the button
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

const Header = () => {
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
            {/* Search Icon */}
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
            
            {/* Search Input */}
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-emerald-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-300 sm:text-sm transition-all duration-200 shadow-inner"
              placeholder="Search for any products..."
            />
          </div>
        </div>

        {/* Right: Actions (Cart & Sign Up) */}
        <div className="flex-shrink-0 flex items-center gap-5">
          
          {/* Cart Button */}
          <button className="relative p-2 rounded-full hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-600 focus:ring-white">
            <span className="sr-only">View cart</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-emerald-600 transform translate-x-1/4 -translate-y-1/4 bg-white rounded-full border border-emerald-600">
              3
            </span>
          </button>

          {/* Sign Up Button (Updated to Premium Interactive Rectangle) */}
          <Link 
            href="/signup"
            className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-emerald-800 rounded-lg shadow-sm hover:bg-emerald-900 hover:scale-105 hover:shadow-md transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-600 focus:ring-white ${jakarta.className}`}
          >
            Sign Up
          </Link>

        </div>
        
      </div>
    </header>
  );
};

export default Header;