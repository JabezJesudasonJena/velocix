"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";

// Define the shape of your data based on the API response
interface Store {
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
  stores: Store[];
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

  if (loading) {
    return (
      <main className="page-shell flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="page-shell flex flex-col items-center justify-center text-white">
        <div className="bg-red-900/40 border border-red-800 text-red-200 p-6 rounded-lg max-w-md w-full text-center">
          <p className="mb-4">{error || "Profile not found."}</p>
          <Link href="/" className="text-white font-medium hover:underline">
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  // Get user's initials for the avatar placeholder
  const initials = profile.name.substring(0, 2).toUpperCase();

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-5xl space-y-8">
        
        <section className="panel flex flex-col items-center gap-8 p-8 shadow-xl shadow-black/30 md:flex-row md:items-start">
          
          <div className="w-32 h-32 bg-neutral-800 border-2 border-neutral-700 rounded-full flex items-center justify-center text-4xl font-bold text-neutral-300 shadow-inner flex-shrink-0">
            {initials}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-white">{profile.name}</h1>
              <span className="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-800 rounded-full text-xs font-bold uppercase tracking-wider inline-block w-max mx-auto md:mx-0">
                {profile.role}
              </span>
            </div>
            
            <p className="text-neutral-400 text-lg mb-6">{profile.email}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-neutral-500 border-t border-neutral-800 pt-6">
              <p>
                <span className="block text-neutral-400 font-medium mb-1">Member Since</span>
                {new Date(profile.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p>
                <span className="block text-neutral-400 font-medium mb-1">Account ID</span>
                #{profile.id.toString().padStart(4, '0')}
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <button className="btn-secondary w-full md:w-auto px-6">
              Edit Profile
            </button>
          </div>
        </section>

        {profile.stores && profile.stores.length > 0 && (
          <section>
            <div className="flex justify-between items-end mb-6 border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">My Stores</h2>
                <p className="text-neutral-500 text-sm mt-1">Manage your business locations</p>
              </div>
              <Link 
                href="/store/new" 
                className="btn-primary hidden sm:block"
              >
                + New Store
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.stores.map((store) => (
                <div 
                  key={store.id} 
                  className="panel group flex flex-col p-6 transition-colors hover:border-neutral-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {store.name}
                    </h3>
                    <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">
                      <span className={`w-2 h-2 rounded-full ${store.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-xs text-neutral-300 font-medium capitalize">{store.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-neutral-400 text-sm flex-grow mb-6 line-clamp-2">
                    {store.desc || "No description provided."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                    <span className="text-xs text-neutral-500">
                      Created: {new Date(store.createdAt).toLocaleDateString()}
                    </span>
                    
                    <Link 
                      href={`/store/${store.id}`} 
                      className="text-sm font-medium text-white hover:underline underline-offset-4 decoration-neutral-500"
                    >
                      Manage Dashboard &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              href="/store/new" 
              className="btn-secondary mt-6 block w-full py-3 text-center font-semibold sm:hidden"
            >
              + Create New Store
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}