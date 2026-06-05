"use client"

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Store as StoreIcon } from 'lucide-react';

// --- Premium Map Icons ---
const userPin = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const storePin = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// --- Interfaces ---
interface Store {
  id: number;
  name: string;
  ownerId: number;
  desc: string | null;
  lat: number;
  lng: number;
  distance_meters: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

// Map Updater Component (Pans map to user when location changes)
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function NearestStores() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_RADIUS = 5000;

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      try {
        const parsed = JSON.parse(storedLocation) as UserLocation;
        setLocation(parsed);
        fetchStores(parsed.lat, parsed.lng);
      } catch (err) {
        localStorage.removeItem('userLocation');
      }
    }
  }, []);

  const fetchStores = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/store/neareststores?lat=${lat}&lng=${lng}&radius=${DEFAULT_RADIUS}`);
      if (!response.ok) throw new Error("Failed to fetch stores.");
      const data = await response.json();
      setStores(data.stores); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
        setLocation(newLoc);
        localStorage.setItem('userLocation', JSON.stringify(newLoc));
        fetchStores(newLoc.lat, newLoc.lng);
      },
      () => {
        setError("Location access denied. Please allow access to find stores.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Discover Nearby Stores</h1>
        <p className="text-gray-500 mt-2">Find the best products right in your neighborhood.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-sm">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* NO LOCATION STATE: Centered "Alive" Button */}
      {!location && !loading && (
        <div className="flex flex-col items-center justify-center h-[50vh] bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="relative group">
            {/* The animated glow behind the button */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-300 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
            {/* The Button */}
            <button 
              onClick={handleDetectLocation}
              className="relative flex items-center gap-3 bg-white border border-gray-200 px-8 py-4 rounded-xl text-gray-800 font-semibold hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm hover:cursor-pointer"
            >
              <MapPin className="text-green-500 w-6 h-6 animate-bounce" />
              <span>Detect My Location</span>
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-400">We need your location to show stores near you.</p>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && !location && (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
        </div>
      )}

      {/* LOCATION DETECTED STATE: Split View */}
      {location && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT SIDE: Store List Frame */}
          <div className="flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <StoreIcon className="w-5 h-5 text-gray-700" />
                Stores within {DEFAULT_RADIUS / 1000}km
              </h2>
              <button 
                onClick={() => { localStorage.removeItem('userLocation'); setLocation(null); setStores([]); }}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
              >
                <Navigation className="w-4 h-4" /> Reset
              </button>
            </div>

            {loading ? (
               <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-gray-200 rounded w-3/4"></div><div className="h-4 bg-gray-200 rounded"></div></div></div>
            ) : stores.length === 0 ? (
              <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">No stores found nearby.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                {stores.map((store) => (
                  <div key={store.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{store.name}</h3>
                        {store.desc && <p className="text-gray-500 text-sm mt-1">{store.desc}</p>}
                      </div>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                        {(store.distance_meters / 1000).toFixed(1)} km
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Map Frame */}
          <div className="h-[600px] w-full bg-white p-2 rounded-3xl shadow-lg border border-gray-100 relative">
            <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-gray-200 pointer-events-none">
               <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 Live Tracking
               </span>
            </div>
            
            {/* The Premium Map Container */}
            <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-50">
              <MapContainer 
                center={[location.lat, location.lng]} 
                zoom={13} 
                className="w-full h-full"
                zoomControl={false} // Hides default messy zoom controls
              >
                {/* Premium CartoDB Voyager Map Tiles (Not basic OSM) */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/">Carto</a>'
                />
                
                <MapUpdater center={[location.lat, location.lng]} />

                {/* Red Pin for User */}
                <Marker position={[location.lat, location.lng]} icon={userPin}>
                  <Popup className="font-sans font-semibold">📍 You are here</Popup>
                </Marker>

                {/* Blue Pins for Stores */}
                {stores.map((store) => (
                  <Marker key={store.id} position={[store.lat, store.lng]} icon={storePin}>
                    <Popup className="font-sans">
                      <strong className="block text-base">{store.name}</strong>
                      <span className="text-gray-500 text-sm">{(store.distance_meters / 1000).toFixed(1)} km away</span>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}