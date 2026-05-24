"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Added for the success redirect

export default function SignUpForm() {
  const router = useRouter();

  // 1. UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 2. Form Data State
  const [formData, setFormData] = useState({
    role: 'consumer',
    fullName: '',
    email: '',
    password: '',
    termsAccepted: false,
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

      const response = await axios.post(`${baseUrl}/auth/signup`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Handle Success
      console.log('Signup Successful:', response.data);
      setSuccessMessage('Account created successfully! Redirecting...');
      
      // Redirect user after a short 2-second delay
      setTimeout(() => router.push('/signin'), 1000); 

    } catch (error) {
      // Handle Error
      console.error('Signup Error:', error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Server provided error
      } else {
        setErrorMessage('Something went wrong. Please try again.'); // Fallback error
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
            Create Account
          </h1>
          <p className="font-['Inter'] text-[18px] leading-[28px] text-[#565e74]">
            Start optimizing your logistics network today.
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
          
          {/* Select Role */}
          <div className="mb-6">
            <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-3 ml-1">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Consumer */}
              <label className="relative cursor-pointer group">
                <input 
                  className="peer sr-only" 
                  name="role" 
                  type="radio" 
                  value="consumer"
                  checked={formData.role === 'consumer'}
                  onChange={handleChange}
                />
                <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] hover:bg-[#eceef0]">
                  <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:group-[]:text-[#006b2c]">person</span>
                  <span className="block font-['Inter'] text-sm leading-[24px] font-medium">Consumer</span>
                </div>
              </label>

              {/* Store Admin */}
              <label className="relative cursor-pointer group">
                <input 
                  className="peer sr-only" 
                  name="role" 
                  type="radio" 
                  value="store-admin"
                  checked={formData.role === 'store-admin'}
                  onChange={handleChange}
                />
                <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] hover:bg-[#eceef0]">
                  <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:group-[]:text-[#006b2c]">store</span>
                  <span className="block font-['Inter'] text-sm leading-[24px] font-medium">Store Admin</span>
                </div>
              </label>

              {/* Delivery Partner */}
              <label className="relative cursor-pointer group">
                <input 
                  className="peer sr-only" 
                  name="role" 
                  type="radio" 
                  value="delivery-partner"
                  checked={formData.role === 'delivery-partner'}
                  onChange={handleChange}
                />
                <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] hover:bg-[#eceef0]">
                  <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:group-[]:text-[#006b2c]">local_shipping</span>
                  <span className="block font-['Inter'] text-sm leading-[24px] font-medium">Delivery Partner</span>
                </div>
              </label>

              {/* Super Admin */}
              <label className="relative cursor-pointer group">
                <input 
                  className="peer sr-only" 
                  name="role" 
                  type="radio" 
                  value="super-admin"
                  checked={formData.role === 'super-admin'}
                  onChange={handleChange}
                />
                <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] hover:bg-[#eceef0]">
                  <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:group-[]:text-[#006b2c]">admin_panel_settings</span>
                  <span className="block font-['Inter'] text-sm leading-[24px] font-medium">Super Admin</span>
                </div>
              </label>

            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
              Full Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">person</span>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="py-3 pr-4 pl-12 w-full rounded-xl border border-[#bdcaba] bg-[#ffffff] transition-all focus:outline-none focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd]" 
                placeholder="Jane Doe" 
                required 
                type="text" 
              />
            </div>
          </div>

          {/* Business Email */}
          <div>
            <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1">
              Business Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">mail</span>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="py-3 pr-4 pl-12 w-full rounded-xl border border-[#bdcaba] bg-[#ffffff] transition-all focus:outline-none focus:border-[#006b2c] focus:ring-4 focus:ring-[#dae2fd]" 
                placeholder="jane@company.com" 
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

          {/* Terms */}
          <div className="flex items-start ml-1 mt-2">
            {/* Custom Checkbox Container */}
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
              
              {/* 1. The Real Checkbox (Invisible but handles logic/clicks) */}
              <input 
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer peer" 
                required 
                type="checkbox" 
              />
              
              {/* 2. The Visual Box (Reacts to the real checkbox using 'peer' classes) */}
              <div className="w-5 h-5 bg-[#ffffff] border border-[#bdcaba] rounded peer-focus:ring-2 peer-focus:ring-[#006b2c]/30 peer-checked:border-[#006b2c] flex items-center justify-center transition-all duration-200">
                
                {/* 3. The Material Symbol Tick (Only shows when checked) */}
                {formData.termsAccepted && (
                  <span 
                    className="material-symbols-outlined text-[#006b2c] text-[16px]" 
                    style={{ fontVariationSettings: "'wght' 700" }}
                  >
                    check
                  </span>
                )}
                
              </div>
            </div>

            {/* Label Text */}
            <div className="ml-3 font-['Inter'] text-[16px] leading-[24px]">
              <label htmlFor="termsAccepted" className="text-[#565e74] cursor-pointer">
                I agree to the{' '}
                <a className="text-[#006b2c] hover:underline font-medium transition-colors relative z-20" href="#">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a className="text-[#006b2c] hover:underline font-medium transition-colors relative z-20" href="#">
                  Privacy Policy
                </a>.
              </label>
            </div>
          </div>  

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              disabled={isLoading}
              className="w-full bg-[#00873a] text-[#f7fff2] py-3.5 px-6 rounded-xl font-semibold flex justify-center items-center gap-2 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed" 
              type="submit"
            >
              {isLoading ? 'Processing...' : 'Get Started'}
              {!isLoading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="font-['Inter'] text-[16px] leading-[24px] text-[#565e74]">
            Already have an account?{' '}
            <a
              className="font-medium text-[#006b2c] hover:text-[#00873a] transition-colors underline-offset-4 hover:underline"
              href="/signin"
            >
              Log in instead
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}