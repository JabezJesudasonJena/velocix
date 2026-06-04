'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import axios from 'axios';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function SignUpForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'consumer' 
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5002/api/auth/signup', formData);
      setShowToast(true);
      setTimeout(() => {
        router.push('/signin');
      }, 2500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen bg-gray-50 text-gray-900 ${jakarta.className}`}>
      
      {/* Left Column - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 bg-white relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        
        {/* Mobile/Tablet Logo */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">VELOCIX</span>
        </div>

        <div className="w-full max-w-sm mx-auto mt-12 lg:mt-0">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Register</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">Create a new account to access the platform.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all sm:text-sm font-medium"
                placeholder="John Doe"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all sm:text-sm font-medium"
                placeholder="name@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all sm:text-sm font-medium"
                placeholder="••••••••"
              />
            </div>

            {/* Select Role */}
            <div className="space-y-1.5 pb-2">
              <label className="block text-sm font-bold text-gray-700" htmlFor="role">Select Role</label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 appearance-none focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all sm:text-sm font-medium cursor-pointer"
                >
                  <option value="consumer">Consumer</option>
                  <option value="store-admin">Store Admin</option>
                  <option value="admin">System Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-md"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Create Account'
              )}
            </button>
            
            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-500 mt-6 font-medium">
              Already have an account?{' '}
              <Link href="/signin" className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Column - Illustration Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-50/50 items-center justify-center p-12 relative overflow-hidden">
        
        {/* Soft Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        
        {/* Recolored Light Theme Illustration */}
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center z-10">
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main backdrop circle */}
            <circle cx="200" cy="200" r="150" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2"/>
            {/* Rocket Tip */}
            <path d="M200 80L240 140H160L200 80Z" fill="#10b981"/>
            {/* Rocket Body */}
            <rect x="175" y="140" width="50" height="100" fill="#f3f4f6"/>
            {/* Left Fin */}
            <path d="M150 200L175 140V240H150V200Z" fill="#d1d5db"/>
            {/* Right Fin */}
            <path d="M250 200L225 140V240H250V200Z" fill="#d1d5db"/>
            {/* Window */}
            <circle cx="200" cy="170" r="15" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2"/>
            {/* Thruster fire */}
            <path d="M175 240H225L200 300L175 240Z" fill="#f59e0b" className="animate-pulse"/>
            <path d="M185 240H215L200 280L185 240Z" fill="#fbbf24"/>
            {/* Soft decorative dots */}
            <circle cx="100" cy="120" r="4" fill="#d1fae5"/>
            <circle cx="300" cy="100" r="6" fill="#d1fae5"/>
            <circle cx="320" cy="250" r="3" fill="#a7f3d0"/>
            <circle cx="80" cy="280" r="5" fill="#a7f3d0"/>
          </svg>
        </div>
      </div>

      {/* Animated Success Toast (Light Mode) */}
      <div 
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white border border-gray-100 text-gray-800 px-6 py-4 rounded-2xl shadow-xl transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
      >
        <div className="flex-shrink-0 bg-emerald-100 rounded-full p-1.5">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className={showToast ? "animate-[dash_0.5s_ease-out_forwards]" : ""} strokeDasharray="24" strokeDashoffset="24" />
          </svg>
        </div>
        <span className="font-bold text-sm tracking-wide">Account verified. Redirecting...</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}