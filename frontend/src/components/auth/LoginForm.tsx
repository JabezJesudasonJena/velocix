"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('authenticating');
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const responseData = await res.json();
        const { token, userData } = responseData; 

        if (token) {
          localStorage.setItem("velocix_token", token);
          localStorage.setItem("user", JSON.stringify(userData));

          const maxAge = 60 * 60 * 24 * 7; 
          document.cookie = `velocix_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;

          setStatus('success');
          
          // Delay redirect slightly for the success animation
          setTimeout(() => {
            router.push("/");
          }, 800);
        } else {
          setStatus('error');
          setMessage("Authentication failed. Please try again.");
        }
      } else {
        const errorData = await res.json();
        setStatus('error');
        setMessage(errorData.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus('error');
      setMessage("Unable to connect to the server.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === 'error') {
      setStatus('idle');
      setMessage("");
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 shadow-2xl p-8 sm:p-10">
      
      {/* --- Header Section --- */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Enter your details to access your account.
        </p>
      </div>

      {/* --- Error Banner --- */}
      <div className={`mb-6 flex items-center gap-3 rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-sm text-red-400 transition-all duration-300 ${status === 'error' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'}`}>
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>{message}</p>
      </div>

      {/* --- Form Section --- */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="email">
            Email address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
              <Mail className="h-4 w-4" />
            </div>
            <input 
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'authenticating' || status === 'success'}
              className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
              placeholder="name@example.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-300" htmlFor="password">
              Password
            </label>
            {/* Standard e-commerce inclusion: Forgot Password */}
            <a href="#" className="text-xs font-medium text-neutral-500 hover:text-white transition-colors">
              Forgot password?
            </a>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
              <Lock className="h-4 w-4" />
            </div>
            <input 
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={status === 'authenticating' || status === 'success'}
              className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* --- High-End Action Button --- */}
        <button 
          type="submit" 
          disabled={status === 'authenticating' || status === 'success'}
          className="group relative mt-4 flex w-full h-12 items-center justify-center overflow-hidden rounded-xl bg-white text-sm font-semibold text-neutral-950 transition-all hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 active:scale-[0.98]"
        >
          {/* Default State */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'idle' || status === 'error' ? 'translate-y-0' : '-translate-y-full'}`}>
            Sign In
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          
          {/* Loading State */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'authenticating' ? 'translate-y-0' : 'translate-y-full'}`}>
            <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
            Signing in...
          </span>

          {/* Success State */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 bg-green-500 text-white transition-transform duration-500 ${status === 'success' ? 'translate-y-0' : 'translate-y-full'}`}>
            <CheckCircle2 className="h-4 w-4" />
            Success
          </span>
        </button>

        {/* --- Secondary Action --- */}
        <p className="mt-4 text-center text-sm text-neutral-500">
          Don't have an account?{' '}
          <a href="/signup" className="font-semibold text-white hover:underline underline-offset-4">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}