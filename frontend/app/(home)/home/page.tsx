"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";

interface Store {
  id: number;
  name: string;
  desc: string | null;
  status: string;
  lat: number;
  lng: number;
  distance_km: string;
}

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New state to manage the manual location prompt
  const [needsLocation, setNeedsLocation] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("Checking preferences...");

  // 1. Extracted API fetch into a reusable function
  const fetchNearbyStores = async (lat: number, lng: number) => {
    setLoading(true);
    setStatusMessage("Finding stores near you...");
    
    try {
      const res = await fetchClient(`/location?lat=${lat}&lng=${lng}`, {
        method: "GET",
      });
      const json = await res.json();

      if (json.success) {
        setStores(json.data);
        setError(null);
      } else {
        setError(json.message || "Failed to load stores.");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching stores.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Check localStorage on initial mount
  useEffect(() => {
    const cachedLocation = localStorage.getItem("userLocation");

    if (cachedLocation) {
      try {
        const { lat, lng } = JSON.parse(cachedLocation);
        fetchNearbyStores(lat, lng);
      } catch (e) {
        // If JSON is malformed, clear it and ask again
        localStorage.removeItem("userLocation");
        setNeedsLocation(true);
        setLoading(false);
      }
    } else {
      // No location saved, prompt the user
      setNeedsLocation(true);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Handle manual location request via button click
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatusMessage("Waiting for location permission...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Save to localStorage for next time
        localStorage.setItem("userLocation", JSON.stringify({ lat: latitude, lng: longitude }));
        
        setNeedsLocation(false);
        fetchNearbyStores(latitude, longitude);
      },
      (geoError) => {
        setError("Location access denied. Please allow location permissions in your browser to see nearby stores.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // 4. Allow users to refresh their location if they moved
  const handleRefreshLocation = () => {
    localStorage.removeItem("userLocation");
    setStores([]);
    setNeedsLocation(true);
  };

  // --- RENDER STATES ---

  if (loading) {
    return (
      <main className="page-shell flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
        <p className="text-neutral-400">{statusMessage}</p>
      </main>
    );
  }

  // Show the explicit opt-in UI if we need their location
  if (needsLocation) {
    return (
      <main className="page-shell flex items-center justify-center">
        <div className="panel w-full max-w-md p-10 text-center">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">📍</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Find Local Stores</h1>
          <p className="text-neutral-400 mb-8">
            To show you the freshest products available nearby, we need to know your current location.
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 text-red-400 border border-red-800/50 rounded-lg text-sm text-left">
              {error}
            </div>
          )}

          <button 
            onClick={handleRequestLocation}
            className="btn-primary w-full py-3"
          >
            Share Location
          </button>
        </div>
      </main>
    );
  }

  // Main UI when stores are loaded
  return (
    <main className="page-shell">
      <div className="page-wrap max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-neutral-800 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Stores Near You</h1>
            <p className="text-neutral-400">Discover fresh products in your local area.</p>
          </div>
          <button 
            onClick={handleRefreshLocation}
            className="text-sm text-neutral-500 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-800 hover:decoration-neutral-400"
          >
            Update my location
          </button>
        </div>

        {error && (
          <div className="mb-8 bg-red-900/40 border border-red-800 text-red-200 p-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {!error && stores.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-xl">
            <p className="text-neutral-400 text-lg">We couldn't find any stores near your location right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Link 
                href={`/store/${store.id}`} 
                key={store.id}
                className="panel block p-6 transition-colors group hover:border-neutral-600"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {store.name}
                  </h3>
                  <span className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                    {store.distance_km} km
                  </span>
                </div>
                
                <p className="text-neutral-400 mb-6 line-clamp-2">
                  {store.desc || "No description available for this store."}
                </p>

                <div className="flex items-center text-sm">
                  <div className={`w-2 h-2 rounded-full mr-2 ${store.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="capitalize text-neutral-300">{store.status}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}