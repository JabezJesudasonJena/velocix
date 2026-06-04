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

export default function SignInForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // POST request to your signin endpoint
      const response = await axios.post('http://localhost:5002/api/auth/signin', formData);
      
      // It saves the token to the localstorage
      localStorage.setItem('velocix_token', response.data.token);

      //Save the user details for ui
      localStorage.setItem('userData',JSON.stringify(response.data.data));

      setShowToast(true);
      setTimeout(() => {
        // Redirect to a  home page[products page] after successful login
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#fafafa] text-gray-900 ${jakarta.className} flex`}>
      
      {/* Form Section - Anchored to the left */}
      <div className="w-full lg:w-3/5 xl:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 bg-white shadow-[8px_0_40px_rgba(0,0,0,0.02)] relative z-10 min-h-screen">

        {/* Maximized Form Container */}
        <div className="w-full max-w-lg mt-20 lg:mt-0">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 mt-3 text-base font-medium">Enter your credentials to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-base font-medium"
                placeholder="name@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-gray-700" htmlFor="password">Password</label>
                <Link href="/forgot-password" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all text-base font-medium"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 mt-2 border border-transparent rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] text-base font-bold text-white bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </button>
            
            {/* Sign Up Link */}
            <p className="text-left text-sm text-gray-500 mt-6 font-medium">
              Don't have an account?{' '}
              <Link href="/signup" className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Empty Soft White Right Side */}
      <div className="hidden lg:block lg:flex-1 bg-[#fafafa]"></div>

      {/* Animated Success Toast */}
      <div 
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white border border-gray-100 text-gray-800 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
      >
        <div className="flex-shrink-0 bg-emerald-50 rounded-full p-1.5">
          <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className={showToast ? "animate-[dash_0.5s_ease-out_forwards]" : ""} strokeDasharray="24" strokeDashoffset="24" />
          </svg>
        </div>
        <span className="font-bold text-sm tracking-wide">Sign in successful. Redirecting...</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}