"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/src/redux/store/store';
import SearchBar from '@/src/components/main/SearchBar'; 
import { ShoppingBag, LogOut, Zap, User as UserIcon } from 'lucide-react';

interface User {
  name: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); 
  const cartCount = useSelector((state: RootState) => state.cart.totalItems);
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchProfile = async () => {
      let token = localStorage.getItem('velocix_token');
      if (!token) {
        const match = document.cookie.match(new RegExp('(^| )velocix_token=([^;]+)'));
        if (match) token = match[2];
      }

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data || data); 
        } else {
          handleLogout(false);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = (redirect = true) => {
    localStorage.removeItem('velocix_token');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    document.cookie = 'velocix_token=; path=/; max-age=0; SameSite=Lax; Secure';
    document.cookie = 'jwt=; path=/; max-age=0; SameSite=Lax; Secure';
    
    setUser(null);
    if (redirect) router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#040405]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-8">
        
        {/* --- Brand / Logo --- */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="group flex items-center gap-2.5 outline-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform group-hover:scale-105">
              <Zap className="h-5 w-5 fill-black" strokeWidth={1} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Velocix</span>
          </Link>
        </div>

        {/* --- Center: Search Bar --- */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <SearchBar />
        </div>
        
        {/* --- Right Actions --- */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          
          {/* User Status / Auth */}
          {loading ? (
            <div className="h-8 w-24 bg-neutral-900 animate-pulse rounded-full"></div>
          ) : user ? (
            <div className="flex items-center gap-4 sm:gap-6">
              
              {/* Profile Link Wrapper */}
              <Link 
                href="/profile" 
                className="group hidden lg:flex items-center gap-2 outline-none"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-neutral-400 transition-colors duration-300 group-hover:bg-white group-hover:text-black group-focus-visible:ring-2 group-focus-visible:ring-white">
                  <UserIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-neutral-300 capitalize transition-colors duration-300 group-hover:text-white">
                  {user.name}
                </span>
              </Link>

              <button 
                onClick={() => handleLogout(true)}
                title="Sign out"
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-white"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {pathname !== '/login' && (
                <Link 
                  href="/login" 
                  className="hidden sm:block text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                >
                  Sign in
                </Link>
              )}
              {pathname !== '/signup' && (
                <Link 
                  href="/signup" 
                  className="flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-105 active:scale-95"
                >
                  Create account
                </Link>
              )}
            </div>
          )}
          
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

          {/* Cart Icon with Floating Badge */}
          <Link 
            href="/checkout" 
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-white/5 transition-colors hover:bg-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#040405]"
          >
            <ShoppingBag className="h-4 w-4 text-neutral-300 transition-colors group-hover:text-white" />
            
            {/* The Notification Bubble */}
            {mounted && cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black ring-2 ring-[#040405]">
                {cartCount}
              </span>
            )}
          </Link>
          
        </div>
      </div>
    </nav>
  );
}