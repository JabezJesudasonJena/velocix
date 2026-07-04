"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";
import { 
  Loader2, AlertCircle, Settings, Store, 
  Plus, ArrowRight, MapPin, Hash, Calendar
} from "lucide-react";

// Define the shape of your data based on the API response
interface StoreType {
  id: number;
  name: string;
  desc: string | null;
  status: string;
  lat: number;
  lng: number;
  createdAt: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  stores: StoreType[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchClient("/auth/profile", { method: "GET" });
        const json = await res.json();

        if (json.success) {
          setProfile(json.data);
        } else {
          setError(json.message || "Failed to load profile.");
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- Premium Loading State ---
  if (loading) {
    return (
      <main className="min-h-screen bg-[#040405] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Loading Profile
        </p>
      </main>
    );
  }

  // --- Premium Error State ---
  if (error || !profile) {
    return (
      <main className="min-h-screen bg-[#040405] flex items-center justify-center p-6">
        <div className="flex max-w-md w-full flex-col items-center gap-4 rounded-3xl bg-neutral-900 border border-white/5 p-8 text-center shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Profile Unavailable</h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{error || "We couldn't locate your profile data."}</p>
          </div>
          <Link 
            href="/" 
            className="mt-4 flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  const initials = profile.name.substring(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 space-y-12">
        
        {/* --- Profile Header Card --- */}
        <section className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
          
          <div className="relative p-8 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-neutral-950 border border-white/10 text-3xl font-bold tracking-widest text-white shadow-inner">
              {initials}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2 justify-center md:justify-start">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{profile.name}</h1>
                <span className="flex items-center justify-center px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest w-max mx-auto md:mx-0">
                  {profile.role}
                </span>
              </div>
              
              <p className="text-neutral-400 text-base mb-8">{profile.email}</p>
              
              {/* Meta Data */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 gap-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Calendar className="h-4 w-4 text-neutral-500" />
                  <span>Joined {new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Hash className="h-4 w-4 text-neutral-500" />
                  <span className="font-mono">ID: {profile.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
            </div>
              <Link 
                href="/profile/edit" 
                className="flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-neutral-800 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-700 border border-white/5"
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Link>

          </div>
        </section>

        {/* --- Stores Section --- */}
        {profile.stores && profile.stores.length > 0 && (
          <section>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
                  <Store className="h-6 w-6 text-neutral-500" />
                  My Stores
                </h2>
                <p className="mt-2 text-sm text-neutral-400">Manage your locations and inventory.</p>
              </div>
              <Link 
                href="/store/new" 
                className="hidden sm:flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-all hover:bg-neutral-200 active:scale-95"
              >
                <Plus className="h-4 w-4" />
                New Store
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {profile.stores.map((store) => (
                <div 
                  key={store.id} 
                  className="group flex flex-col rounded-2xl bg-neutral-900 border border-white/5 p-6 sm:p-8 transition-all hover:bg-neutral-800/80 hover:border-white/20 hover:shadow-xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors">
                      {store.name}
                    </h3>
                    {/* Status Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${store.status === 'active' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                      {store.status}
                    </div>
                  </div>
                  
                  <p className="text-neutral-400 text-sm flex-grow mb-8 line-clamp-2 leading-relaxed">
                    {store.desc || "No description provided for this location."}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      Location ID: {store.id}
                    </div>
                    
                    <Link 
                      href={`/store/${store.id}`} 
                      className="flex items-center gap-1.5 text-sm font-medium text-white transition-transform group-hover:translate-x-1"
                    >
                      Manage
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile-only create button */}
            <Link 
              href="/store/new" 
              className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition-all hover:bg-neutral-200 active:scale-95 sm:hidden"
            >
              <Plus className="h-4 w-4" />
              Create New Store
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}