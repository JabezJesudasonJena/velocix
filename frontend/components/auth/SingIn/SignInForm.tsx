"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const router = useRouter();

  // 1. UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 2. Form Data State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Helper to update form data
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 3. The Axios Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

      // Send login request to backend
      const response = await axios.post(`${baseUrl}/auth/signin`, {
        email: formData.email,
        password: formData.password,  
        // rememberMe: formData.rememberMe // Optional: Send to backend if your API supports persistent sessions
      });

      // Handle Success
      console.log('Login Successful:', response.data);
      
      // Store the auth token (Usually in localStorage or cookies)
      if (response.data.token) {
        localStorage.setItem('velocix_token', response.data.token);
      }

      setSuccessMessage('Welcome back! Redirecting to dashboard...');
      
      // Redirect user to their dashboard after a short delay
      setTimeout(() => router.push('/dashboard'), 1000); 

    } catch (error) {
      // Handle Error
      console.error('Login Error:', error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Server provided error
      } else {
        setErrorMessage('Invalid email or password. Please try again.'); // Fallback error
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-[#f7f9fb] relative overflow-y-auto">
      
      {/* Mobile Branding (Visible only when left side is hidden) */}
      <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
        <span
          className="material-symbols-outlined text-[#00873a] text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          deployed_code
        </span>
        <span className="font-['Inter'] text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#191c1e]">
          Velocix
        </span>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="font-['Inter'] text-[40px] md:text-[56px] leading-[44px] md:leading-[60px] tracking-[-0.02em] md:tracking-[-0.03em] font-semibold md:font-medium text-[#191c1e] mb-2">
            Welcome back
          </h1>
          <p className="font-['Inter'] text-[18px] leading-[28px] text-[#565e74]">
            Sign in to access real-time fleet intelligence.
          </p>
        </div>

        {/* Status Messages */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-medium">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 bg-[#00873a]/10 text-[#006b2c] rounded-xl text-sm font-medium">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          

          {/* Business Email */}
          <div>
            <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">mail</span>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="py-3 pr-4 pl-12 w-full rounded-xl border border-[#bdcaba] bg-[#ffffff] transition-all focus:outline-none focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd]" 
                placeholder="name@company.com" 
                required 
                type="email" 
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2 ml-1 mr-1">
              <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d]">
                Password
              </label>
              <a className="font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#006b2c] hover:text-[#00873a] transition-colors" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">lock</span>
              <input 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="py-3 pl-12 pr-12 w-full rounded-xl border border-[#bdcaba] bg-[#ffffff] transition-all focus:outline-none focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd]" 
                placeholder="••••••••" 
                required 
                type={showPassword ? "text" : "password"} 
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#565e74] hover:text-[#191c1e] transition-colors focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox (Using the custom visual checkbox design) */}
          <div className="flex items-start ml-1 mt-2">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
              <input 
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer peer" 
                type="checkbox" 
              />
              <div className="w-5 h-5 bg-[#ffffff] border border-[#bdcaba] rounded peer-focus:ring-2 peer-focus:ring-[#006b2c]/30 peer-checked:border-[#006b2c] flex items-center justify-center transition-all duration-200">
                {formData.rememberMe && (
                  <span className="material-symbols-outlined text-[#006b2c] text-[16px]" style={{ fontVariationSettings: "'wght' 700" }}>
                    check
                  </span>
                )}
              </div>
            </div>
            <div className="ml-3 font-['Inter'] text-[16px] leading-[24px]">
              <label htmlFor="rememberMe" className="text-[#565e74] cursor-pointer">
                Remember me for 30 days
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              disabled={isLoading}
              className="w-full bg-[#00873a] text-[#f7fff2] py-3.5 px-6 rounded-xl font-semibold flex justify-center items-center gap-2 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg" 
              type="submit"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              {!isLoading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="font-['Inter'] text-[16px] leading-[24px] text-[#565e74]">
            Don't have an account?{' '}
            <a
              className="font-medium text-[#006b2c] hover:text-[#00873a] transition-colors underline-offset-4 hover:underline"
              href="/signup"
            >
              Create an Account
            </a>
          </p>
        </div>

        {/* System Status Footnote */}
        <div className="mt-16 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2 opacity-60">
          <div className="w-2 h-2 rounded-full bg-[#006b2c] animate-pulse"></div>
          <span className="font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#565e74]">
            All systems operational
          </span>
        </div>

      </div>
    </div>
  );
}