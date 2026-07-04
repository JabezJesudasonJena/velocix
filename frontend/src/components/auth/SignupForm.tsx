"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Mail, Lock, ArrowRight, 
  Loader2, CheckCircle2, AlertCircle, 
  Briefcase, Store, ShieldAlert 
} from 'lucide-react';

export default function SignupForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'consumer' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        
        // Delay redirect slightly for the success animation
        setTimeout(() => {
          router.push("/login"); 
        }, 1200);
      } else {
        const errorData = await res.json();
        setStatus('error');
        setMessage(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error("Signup error:", error);
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

  // Retail-friendly role configuration
  const roles = [
    { id: 'consumer', label: 'Shopper', icon: User, desc: 'Standard shopping account' },
    { id: 'seller', label: 'Merchant', icon: Briefcase, desc: 'Sell your own products' },
    { id: 'storeadmin', label: 'Manager', icon: Store, desc: 'Store inventory access' },
    { id: 'admin', label: 'System Admin', icon: ShieldAlert, desc: 'Full platform control' },
  ];

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 shadow-2xl p-8 sm:p-10">
      
      {/* --- Header Section --- */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Join Velocix to start shopping and selling globally.
        </p>
      </div>

      {/* --- Error Banner --- */}
      <div className={`mb-6 flex items-center gap-3 rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-sm text-red-400 transition-all duration-300 ${status === 'error' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'}`}>
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>{message}</p>
      </div>

      {/* --- Form Section --- */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name Input */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm font-medium text-neutral-300" htmlFor="name">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                <User className="h-4 w-4" />
              </div>
              <input 
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'processing' || status === 'success'}
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                disabled={status === 'processing' || status === 'success'}
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-300" htmlFor="password">
              Password
            </label>
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
                disabled={status === 'processing' || status === 'success'}
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {/* --- Custom Role Selector --- */}
        <div className="flex flex-col gap-3 mt-2">
          <label className="text-sm font-medium text-neutral-300">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = formData.role === role.id;
              
              return (
                <label 
                  key={role.id}
                  className={`
                    relative flex cursor-pointer flex-col gap-3 rounded-xl border p-4 transition-all duration-200
                    ${isSelected 
                      ? 'border-white bg-neutral-800 text-white shadow-md' 
                      : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900'
                    }
                    ${(status === 'processing' || status === 'success') && 'pointer-events-none opacity-50'}
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                    <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${isSelected ? 'border-white' : 'border-neutral-700'}`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {role.label}
                    </span>
                    <span className={`text-xs mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {role.desc}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* --- High-End Action Button --- */}
        <button 
          type="submit" 
          disabled={status === 'processing' || status === 'success'}
          className="group relative mt-4 flex w-full h-12 items-center justify-center overflow-hidden rounded-xl bg-white text-sm font-semibold text-neutral-950 transition-all hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 active:scale-[0.98]"
        >
          {/* Default State */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'idle' || status === 'error' ? 'translate-y-0' : '-translate-y-full'}`}>
            Create Account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          
          {/* Loading State */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'processing' ? 'translate-y-0' : 'translate-y-full'}`}>
            <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
            Setting up...
          </span>

          {/* Success State */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 bg-green-500 text-white transition-transform duration-500 ${status === 'success' ? 'translate-y-0' : 'translate-y-full'}`}>
            <CheckCircle2 className="h-4 w-4" />
            Account Created
          </span>
        </button>

        {/* --- Secondary Action --- */}
        <p className="mt-4 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-white hover:underline underline-offset-4">
            Sign in
          </a>
        </p>

      </form>
    </div>
  );
}