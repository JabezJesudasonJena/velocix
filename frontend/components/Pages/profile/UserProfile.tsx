'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import api from '@/utils/axios'; // Make sure this matches your axios file path

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

// TypeScript interfaces based on your backend response
interface Store {
  id: string | number;
  name: string;
}

interface UserProfileData {
  id: string | number;
  name: string;
  email: string;
  role: string;
  stores: Store[];
}

export default function UserProfile() {
  const router = useRouter();
  
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Because of your interceptor, the token is added automatically
        const response = await api.get('/auth/profile');
        console.log(response)
        
        if (response.data && response.data.data) {
          setProfile(response.data.data);
        } else {
          setError('Invalid data format received from server.');
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        
        // If unauthorized, kick them to the login screen
        if (err.response?.status === 401) {
          localStorage.removeItem('velocix_token');
          localStorage.removeItem('userData');
          router.push('/signin');
        } else {
          setError(err.response?.data?.message || 'Failed to load profile details.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('velocix_token');
    localStorage.removeItem('userData');
    router.push('/signin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-12 text-center">
        <p className="text-red-500 font-bold mb-4">{error || "Profile not found."}</p>
        <button onClick={handleLogout} className="text-emerald-500 hover:underline font-bold">
          Return to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#fafafa] text-gray-900 pb-20 ${jakarta.className}`}>
      
      {/* Header Area */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-emerald-500 transition-colors p-2 -ml-2 rounded-full hover:bg-emerald-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <span className="font-bold text-sm text-gray-500 tracking-wide uppercase">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Page Title */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Profile</h1>
            <p className="text-gray-500 mt-2 text-base font-medium">Manage your personal information and associated stores.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-red-600 hover:border-red-200 transition-all font-bold text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign Out
          </button>
        </div>

        {/* Top Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden mb-10 animate-[slideInUp_0.4s_ease-out]">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Big Avatar */}
            <div className="w-28 h-28 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-extrabold text-4xl uppercase border-4 border-white shadow-lg">
              {profile.name.charAt(0)}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{profile.name}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100 w-max">
                  {profile.role.replace('-', ' ')}
                </span>
              </div>
              <p className="text-lg text-gray-500 font-medium mb-6">{profile.email}</p>
              
              {/* Account ID Pill */}
              <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account ID</span>
                <span className="text-sm font-bold text-gray-700 font-mono">{profile.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Stores Section */}
        <div className="animate-[slideInUp_0.5s_ease-out]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-extrabold text-gray-900">Your Stores</h3>
            {profile.role === 'store-admin' || profile.role === 'admin' ? (
              <Link 
                href="/store/create" 
                className="text-sm font-bold text-emerald-600 hover:text-emerald-500 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Register New Store
              </Link>
            ) : null}
          </div>

          {profile.stores && profile.stores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.stores.map((store) => (
                <Link 
                  href={`/stores/${store.id}`} 
                  key={store.id} 
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl mb-4 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{store.name}</h4>
                  <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">Store ID: {store.id}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">No stores registered</h4>
              <p className="text-gray-500 font-medium mb-6">You are not currently managing any locations.</p>
              
              {(profile.role === 'store-admin' || profile.role === 'admin') && (
                <Link 
                  href="/stores/create"
                  className="inline-flex justify-center items-center py-2.5 px-6 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                >
                  Create Your First Store
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}