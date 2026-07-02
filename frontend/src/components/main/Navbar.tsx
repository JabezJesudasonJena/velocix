"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/src/redux/store/store';

interface User {
  name: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // Tracks the current route
  const cartCount = useSelector((state: RootState) => state.cart.totalItems);
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    document.cookie = 'jwt=; path=/; max-age=0; SameSite=Lax; Secure';
    
    setUser(null);
    if (redirect) router.push('/');
  };

  return (
    <nav className="flex justify-between items-center p-6 border-b border-neutral-800">
      <Link href="/" className="text-xl font-bold">Velocix</Link>
      
      <div className="flex gap-4 items-center">
        {loading ? (
          <div className="h-8 w-24 bg-neutral-800 animate-pulse rounded-lg"></div>
        ) : (
          <>
            {user ? (
              <span className="text-sm text-neutral-400 mr-2 capitalize">
                Welcome, <span className="font-semibold text-white">{user.name}</span>
              </span>
            ) : (
              /* Conditional rendering based on pathname */
              pathname === '/login' || pathname === '/signin' ? (
                <Link href="/signup" className="px-4 py-2 border border-neutral-800 rounded-lg text-sm hover:bg-neutral-800 transition">
                  Signup
                </Link>
              ) : (
                <Link href="/login" className="px-4 py-2 border border-neutral-800 rounded-lg text-sm hover:bg-neutral-800 transition">
                  Login
                </Link>
              )
            )}
          </>
        )}
        <button className="px-4 py-2 border border-neutral-800 rounded-lg text-sm">
          Cart [{cartCount}]
        </button>
        {user && (
          <button 
            onClick={() => handleLogout(true)}
            className="px-4 py-2 bg-red-900/20 text-red-500 hover:bg-red-900/40 rounded-lg text-sm transition hover:cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}