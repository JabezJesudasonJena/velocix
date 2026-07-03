"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/src/redux/store/store';
import SearchBar from '@/src/components/main/SearchBar'; 

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
  
  // Hydration state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Flag component as mounted on the client to safely render localStorage data
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
    <nav className="sticky top-0 z-30 border-b border-neutral-800/80 bg-[#0d0f12]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-white">Velocix</Link>
        <span className="hidden rounded-full border border-neutral-700 bg-neutral-900/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 sm:block">
          Local Commerce
        </span>
      </div>

      <div className="hidden flex-1 px-2 md:block">
        <SearchBar />
      </div>
      
      <div className="flex gap-2 items-center flex-shrink-0">
        {loading ? (
          <div className="h-9 w-24 bg-neutral-800 animate-pulse rounded-xl"></div>
        ) : (
          <>
            {user ? (
              <span className="hidden text-sm text-neutral-400 mr-2 capitalize lg:block">
                Hello, <span className="font-semibold text-white">{user.name}</span>
              </span>
            ) : (
              pathname === '/login' || pathname === '/signin' ? (
                <Link href="/signup" className="btn-secondary">
                  Signup
                </Link>
              ) : (
                <Link href="/login" className="btn-secondary">
                  Login
                </Link>
              )
            )}
          </>
        )}
        
        <Link 
          href="/checkout" 
          className="btn-secondary block text-center"
        >
          Cart ({mounted ? cartCount : 0})
        </Link>
        
        {user && (
          <button 
            onClick={() => handleLogout(true)}
            className="rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:cursor-pointer hover:bg-red-900/35"
          >
            Logout
          </button>
        )}
      </div>
      </div>
    </nav>
  );
}