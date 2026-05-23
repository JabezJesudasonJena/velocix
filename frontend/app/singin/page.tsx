"use client"

import React, { useState } from 'react';

export default function VelocixLogin() {
  // State for password visibility and role selection
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('consumer');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const roles = [
    { id: 'consumer', icon: 'person', label: 'Consumer' },
    { id: 'store-admin', icon: 'store', label: 'Store Admin' },
    { id: 'delivery-partner', icon: 'local_shipping', label: 'Delivery Partner' },
    { id: 'super-admin', icon: 'admin_panel_settings', label: 'Super Admin' }
  ];

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] h-screen w-full antialiased font-['Inter'] flex flex-col overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }

        .input-field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #bdcaba;
          background-color: #ffffff;
          color: #191c1e;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          transition: all 0.2s ease-in-out;
        }

        .input-field:focus {
          outline: none;
          border-color: #006b2c;
          box-shadow: 0 0 0 4px #dae2fd;
        }

        .btn-primary {
          background-color: #00873a;
          color: #f7fff2;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.1);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 135, 58, 0.2), inset 0 2px 4px rgba(255,255,255,0.2);
          filter: brightness(1.1);
        }
      `}</style>

      {/* Split Screen Layout */}
      <div className="flex h-full w-full">
        {/* Left Side: Canvas & Illustration (Hidden on smaller screens) */}
        <div className="hidden lg:flex w-1/2 bg-[#FFFAF0] relative flex-col items-center justify-center p-12 overflow-hidden border-r border-[#e6e8ea]">
          {/* Branding Container */}
          <div className="absolute top-8 left-12 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#00873a] text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              deployed_code
            </span>
            <span className="font-['Inter'] text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#191c1e]">
              Velocix
            </span>
          </div>
          
          {/* Illustration Container */}
          <div className="relative w-full max-w-2xl aspect-square rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.02]">
            <img
              alt="High-fidelity 3D claymation illustration of a futuristic logistics hub with an AI-powered delivery drone landing on a platform."
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYaZxmuqrhCpHWAPNFJkQ9YsfJHOJvgQLd8jJe4v-glzQmGEZvTCzy8ZdubfV1kIe9WSH4Rk9ByVrvggIt2_jN3VW2lxhtWooqiSfNAMpMNxxJJji-zvpHCEjcHTUIdeV9yakLo-xGUThsKcqgGRmGYsOnFk4bjKoX6oUm4QDEwC7JACY4jokb0-Oc2GsynfFAkOq-AYD_M1YH6zSB6QY8m9-FivjjwBlBc1xyq3CNQLyPw86519F-QyspOs9-Eza86XzV6xnCCAa9"
            />
            {/* Glassmorphic Overlay Fragment */}
            <div className="absolute bottom-8 right-8 bg-[#f7f9fb]/80 backdrop-blur-xl border border-[rgba(255,255,255,0.4)] rounded-xl p-6 shadow-xl w-64">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#FACC15] animate-pulse"></div>
                <span className="font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#191c1e]">
                  System Status
                </span>
              </div>
              <div className="font-['Inter'] text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#191c1e]">
                V3.4 Active
              </div>
              <div className="text-sm text-[#565e74] mt-1 font-mono">Routing optimized.</div>
            </div>
          </div>
          
          {/* Ambient Decorative Elements */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FFB084]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#B8A4ED]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-[#f7f9fb] relative">
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
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
              <h1 className="font-['Inter'] text-[40px] md:text-[56px] leading-[44px] md:leading-[60px] tracking-[-0.02em] md:tracking-[-0.03em] font-semibold md:font-medium text-[#191c1e] mb-2">
                Welcome back
              </h1>
              <p className="font-['Inter'] text-[18px] leading-[28px] text-[#565e74]">
                Sign in to access real-time fleet intelligence.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* Select Role */}
              <div className="mb-6">
                <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-3 ml-1">
                  Select Your Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                        selectedRole === role.id
                          ? 'border-2 border-[#00873a] bg-[#00873a] text-[#f7fff2]'
                          : 'border border-[#bdcaba] bg-[#ffffff] text-[#565e74] hover:border-[#006b2c]'
                      }`}
                    >
                      <span className="material-symbols-outlined mb-1">{role.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">
                    mail
                  </span>
                  <input
                    className="input-field py-3 pr-4 pl-12"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2 ml-1 mr-1">
                  <label
                    className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a className="font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#006b2c] hover:text-[#00873a] transition-colors" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">
                    lock
                  </span>
                  <input
                    className="input-field py-3 pl-12 pr-12"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#565e74] hover:text-[#191c1e] transition-colors focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4">
                <button
                  className="btn-primary w-full flex justify-center items-center gap-2"
                  type="submit"
                >
                  Sign In
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
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
              <div className="w-2 h-2 rounded-full bg-[#006b2c]"></div>
              <span className="font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#565e74]">
                All systems operational
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}