import React from 'react';
import { Inter } from 'next/font/google';

// Optimize the Inter font using Next.js built-in features
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function Footer() {
  return (
    <footer className={`w-full bg-gray-50 border-t border-gray-200 py-12 px-6 mt-auto ${inter.className}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand & Project Definition */}
        <div className="max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            {/* Replaced external Material Icon with an optimized inline SVG to prevent layout shift */}
            <svg 
              className="w-6 h-6 text-emerald-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              VELOCIX
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            A scalable AI-powered hyperlocal delivery backend system with realtime order tracking, intelligent dispatching, and optimized logistics infrastructure.
          </p>
        </div>

        {/* Author & Repository Link */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <a 
            href="https://github.com/jabezjesudasonjena/velocix" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors duration-200 group"
          >
            <svg 
              viewBox="0 0 24 24" 
              aria-hidden="true" 
              className="w-5 h-5 fill-current text-gray-500 group-hover:text-emerald-600 transition-colors duration-200"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View Repository
          </a>
          <p className="text-sm text-gray-500">
            Built by <span className="font-semibold text-gray-900">Jabez Jena</span>
          </p>
        </div>
        
      </div>
    </footer>
  );
}