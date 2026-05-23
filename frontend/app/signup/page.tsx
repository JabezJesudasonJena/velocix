'use client';

import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5002';

export default function VelocixSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signUp(payload: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      role: String(formData.get('role') ?? 'consumer'),
    };
    
    try {
      setLoading(true);

      const createdUser = await signUp(payload);

      console.log('Signup success:', createdUser);

      alert('Account created successfully!');
    } catch (error: any) {
      console.error('Signup failed:', error);

      alert(
        error?.response?.data?.message ||
          'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen w-full antialiased font-['Inter'] flex flex-col">
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
          box-shadow: 0 10px 25px rgba(0, 135, 58, 0.2),
            inset 0 2px 4px rgba(255,255,255,0.2);
          filter: brightness(1.1);
        }

        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>

      <div className="flex min-h-screen w-full">
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 bg-[#FFFAF0] relative flex-col items-center justify-center p-12 overflow-hidden border-r border-[#e6e8ea]">
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

          <div className="relative w-full max-w-2xl aspect-square rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.02]">
            <img
              alt="Logistics Illustration"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFKwL3nysfcAcdcm-LIucnvftSJFVyvINIZw4b_QCANPPoP7G3xCKi_5N9TQ6WO90hgpHQweikkV_KYU6Zh8vkbjF5Fw36pYXZofIHGuMTBzUPfmJvTDosIyevMM208XZ3hl7r5KSotDVyNIdke-Z8b9r-TiS9T16S9_-4f0w2F-MdToGWv42skY3HYOLrPpBAusnyy1Crnz9fKIVbgKWGLgAvs-Ak9rQnyAOZdbWshgkZ7v1ujxIg-kwyKhvEeTZpJRy1TlJzUFvE"
            />

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

              <div className="text-sm text-[#565e74] mt-1 font-mono">
                Routing optimized.
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FFB084]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#B8A4ED]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-[#f7f9fb] relative overflow-y-auto">
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
                Create Account
              </h1>

              <p className="font-['Inter'] text-[18px] leading-[28px] text-[#565e74]">
                Start optimizing your logistics network today.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Roles */}
              <div className="mb-6">
                <label className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-3 ml-1">
                  Select Your Role
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {/* Consumer */}
                  <label className="relative cursor-pointer group">
                    <input
                      defaultChecked
                      className="peer sr-only"
                      name="role"
                      type="radio"
                      value="consumer"
                    />

                    <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] group-hover:bg-[#eceef0]">
                      <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:text-[#006b2c]">
                        person
                      </span>

                      <span className="block font-['Inter'] text-sm leading-[24px] font-medium">
                        Consumer
                      </span>
                    </div>
                  </label>

                  {/* Store Admin */}
                  <label className="relative cursor-pointer group">
                    <input
                      className="peer sr-only"
                      name="role"
                      type="radio"
                      value="store-admin"
                    />

                    <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] group-hover:bg-[#eceef0]">
                      <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:text-[#006b2c]">
                        store
                      </span>

                      <span className="block font-['Inter'] text-sm leading-[24px] font-medium">
                        Store Admin
                      </span>
                    </div>
                  </label>

                  {/* Delivery Partner */}
                  <label className="relative cursor-pointer group">
                    <input
                      className="peer sr-only"
                      name="role"
                      type="radio"
                      value="delivery-partner"
                    />

                    <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] group-hover:bg-[#eceef0]">
                      <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:text-[#006b2c]">
                        local_shipping
                      </span>

                      <span className="block font-['Inter'] text-sm leading-[24px] font-medium">
                        Delivery Partner
                      </span>
                    </div>
                  </label>

                  {/* Super Admin */}
                  <label className="relative cursor-pointer group">
                    <input
                      className="peer sr-only"
                      name="role"
                      type="radio"
                      value="super-admin"
                    />

                    <div className="p-3 border border-[#bdcaba] rounded-xl bg-[#ffffff] text-center transition-all peer-checked:border-[#006b2c] peer-checked:bg-[#00873a]/5 peer-checked:ring-1 peer-checked:ring-[#006b2c] group-hover:bg-[#eceef0]">
                      <span className="material-symbols-outlined block text-2xl mb-1 text-[#565e74] peer-checked:text-[#006b2c]">
                        admin_panel_settings
                      </span>

                      <span className="block font-['Inter'] text-sm leading-[24px] font-medium">
                        Super Admin
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1"
                  htmlFor="name"
                >
                  Full Name
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">
                    person
                  </span>

                  <input
                    className="input-field py-3 pr-4 pl-12"
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    type="text"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d] mb-2 ml-1"
                  htmlFor="email"
                >
                  Email
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#565e74] z-10 pointer-events-none">
                    mail
                  </span>

                  <input
                    className="input-field py-3 pr-4 pl-12"
                    id="email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2 ml-1 mr-1">
                  <label
                    className="block font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#3e4a3d]"
                    htmlFor="password"
                  >
                    Password
                  </label>
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
                    type={showPassword ? 'text' : 'password'}
                  />

                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#565e74] hover:text-[#191c1e] transition-colors focus:outline-none"
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    <span className="material-symbols-outlined">
                      {showPassword
                        ? 'visibility_off'
                        : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="ml-1">
                <label
                  className="flex cursor-pointer items-start gap-3 font-['Inter'] text-[16px] leading-[24px] text-[#565e74]"
                  htmlFor="terms"
                >
                  <input
                    className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-[#bdcaba] accent-[#006b2c] focus:ring-[#006b2c] focus:ring-2"
                    id="terms"
                    name="terms"
                    required
                    type="checkbox"
                  />

                  <span>
                    I agree to the{' '}
                    <a
                      className="text-[#006b2c] hover:underline font-medium hover:text-[#00873a] transition-colors"
                      href="#"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      className="text-[#006b2c] hover:underline font-medium hover:text-[#00873a] transition-colors"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  className="btn-primary w-full flex justify-center items-center gap-2 disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? 'Creating Account...'
                    : 'Get Started'}

                  {!loading && (
                    <span className="material-symbols-outlined text-lg">
                      arrow_forward
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
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
      </div>
    </div>
  );
}