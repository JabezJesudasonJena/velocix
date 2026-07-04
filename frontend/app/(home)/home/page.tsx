"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { fetchClient } from "@/src/lib/api/apiClient";
import StoreCard from "@/src/components/store/StoreCard";
import { Loader2, Navigation, AlertCircle, RefreshCw, Compass } from "lucide-react";

interface Store {
  id: number;
  name: string;
  desc: string | null;
  status: string;
  lat: number;
  lng: number;
  distance_km: string;
}

// Dynamically load the map
const NearbyStoresMap = dynamic(
  () => import("@/src/components/store/NearbyStoresMap"),
  { 
    ssr: false, 
    loading: () => <div className="h-full w-full bg-neutral-900 animate-pulse rounded-3xl border border-white/5"></div> 
  }
);

export default function NearbyStoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [needsLocation, setNeedsLocation] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("Checking coordinates...");

  const fetchNearbyStores = async (lat: number, lng: number) => {
    setLoading(true);
    setStatusMessage("Scanning local area...");
    
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

  useEffect(() => {
    const cachedLocation = localStorage.getItem("userLocation");

    if (cachedLocation) {
      try {
        const { lat, lng } = JSON.parse(cachedLocation);
        setUserLocation({ lat, lng });
        fetchNearbyStores(lat, lng);
      } catch (e) {
        localStorage.removeItem("userLocation");
        setNeedsLocation(true);
        setLoading(false);
      }
    } else {
      setNeedsLocation(true);
      setLoading(false);
    }
  }, []);

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatusMessage("Acquiring GPS lock...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem("userLocation", JSON.stringify({ lat: latitude, lng: longitude }));
        
        setUserLocation({ lat: latitude, lng: longitude });
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

  const handleRefreshLocation = () => {
    localStorage.removeItem("userLocation");
    setUserLocation(null);
    setStores([]);
    setNeedsLocation(true);
  };

  // --- Premium Loading State ---
  if (loading) {
    return (
      <main className="min-h-screen bg-[#040405] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          {statusMessage}
        </p>
      </main>
    );
  }

  // --- Location Opt-in State ---
  if (needsLocation) {
    return (
      <main className="min-h-screen bg-[#040405] flex items-center justify-center p-6">
        <div className="w-full max-w-md p-10 text-center rounded-3xl bg-neutral-900 border border-white/5 shadow-2xl">
          <div className="w-16 h-16 bg-neutral-950 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Navigation className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold mb-3 text-white tracking-tight">Find Local Stores</h1>
          <p className="text-neutral-400 mb-8 leading-relaxed">
            To show you the freshest products available nearby, we need to securely access your current location.
          </p>
          
          {error && (
            <div className="mb-8 flex items-center gap-3 rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-sm text-red-400 text-left">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button 
            onClick={handleRequestLocation}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-lg shadow-white/10"
          >
            <Compass className="h-4 w-4" />
            Share Location
          </button>
        </div>
      </main>
    );
  }

  // --- Main Render: Map + Grid ---
  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 space-y-12">
        
        {/* Header & Map Section */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Stores Near You</h1>
              <p className="text-neutral-400">Discover inventory and fresh products in your local area.</p>
            </div>
            <button 
              onClick={handleRefreshLocation}
              className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors bg-neutral-900 border border-white/5 px-4 py-2 rounded-full"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Update location
            </button>
          </div>

          {/* Immersive Map Container */}
          {userLocation && stores.length > 0 && (
            <div className="h-[400px] w-full border border-white/5 rounded-3xl shadow-2xl">
              <NearbyStoresMap 
                userLat={userLocation.lat} 
                userLng={userLocation.lng} 
                stores={stores} 
              />
            </div>
          )}
        </section>

        {/* Error Banner */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl bg-red-500/10 p-5 border border-red-500/20 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Store Grid Section */}
        {!error && stores.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-neutral-900/40 py-24 text-center shadow-inner">
            <Store className="mb-5 h-12 w-12 text-neutral-600" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-white">No stores nearby</h3>
            <p className="mt-3 max-w-md text-neutral-400 leading-relaxed">
              We couldn't find any stores near your current location. Try updating your coordinates or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}