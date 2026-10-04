"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

interface Store {
  id: number;
  name: string;
  lat: number;
  lng: number;
  distance_km: string;
}

interface NearbyStoresMapProps {
  userLat: number;
  userLng: number;
  stores: Store[];
}

export default function NearbyStoresMap({ userLat, userLng, stores }: NearbyStoresMapProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
  }, []);

  // Sleek White Store Icon
  const storeIcon = L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] ring-2 ring-neutral-900 transition-transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  // Pulsing Blue User Location Icon
  const userIcon = L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="relative flex h-5 w-5 items-center justify-center">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
        <span class="relative inline-flex h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white"></span>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <div className="h-full w-full bg-neutral-950 rounded-3xl overflow-hidden relative z-0">
      <MapContainer 
        center={[userLat, userLng]} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Marker */}
        <Marker position={[userLat, userLng]} icon={userIcon} />

        {/* Store Markers */}
        {stores.map((store) => (
          <Marker key={store.id} position={[store.lat, store.lng]} icon={storeIcon}>
            <Popup className="premium-popup">
              <div className="p-1">
                <h4 className="font-bold text-sm mb-1">{store.name}</h4>
                <p className="text-xs text-neutral-500 mb-2">{store.distance_km} km away</p>
                <Link href={`/store/${store.id}`} className="text-blue-500 hover:text-blue-600 text-xs font-semibold">
                  Visit Store &rarr;
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Inner shadow for smooth blending */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(4,4,5,1)] z-10"></div>
    </div>
  );
}