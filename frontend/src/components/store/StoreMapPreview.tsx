"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface StoreMapProps {
  lat: number;
  lng: number;
}

export default function StoreMapPreview({ lat, lng }: StoreMapProps) {
  useEffect(() => {
    // Clean up default Leaflet icon errors in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
  }, []);

  // Create a sleek, custom store icon using Tailwind classes and an inline SVG
  const storeIcon = L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] ring-4 ring-neutral-900">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
          <path d="M2 7h20"/>
          <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20], // Center the icon over the coordinate
  });

  return (
    <div className="h-full w-full bg-neutral-900">
      <MapContainer 
        center={[lat, lng]} 
        zoom={14} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0"
        zoomControl={false} // Hide the default +/- zoom buttons for a cleaner look
      >
        {/* CartoDB Dark Matter Tiles for the Dark Mode Aesthetic */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={storeIcon} />
      </MapContainer>
    </div>
  );
}