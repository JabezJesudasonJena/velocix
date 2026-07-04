"use client";

import Link from "next/link";
import { Store as StoreIcon, MapPin, ArrowRight } from "lucide-react";

interface Store {
  id: number;
  name: string;
  desc: string | null;
  status: string;
  lat: number;
  lng: number;
  distance_km: string;
}

export default function StoreCard({ store }: { store: Store }) {
  return (
    <Link 
      href={`/store/${store.id}`} 
      className="group flex flex-col rounded-2xl bg-neutral-900 border border-white/5 p-6 sm:p-8 transition-all duration-300 hover:bg-neutral-800/80 hover:border-white/20 hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#040405]"
    >
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
            <StoreIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors line-clamp-1">
            {store.name}
          </h3>
        </div>
        
        {/* Distance Badge */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1">
          <MapPin className="h-3 w-3 text-blue-400" />
          <span className="text-xs font-bold text-blue-400">{store.distance_km} km</span>
        </div>
      </div>
      
      <p className="text-neutral-400 text-sm flex-grow mb-8 line-clamp-2 leading-relaxed">
        {store.desc || "No description available for this local store."}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-white/5">
        {/* Status Badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest w-max ${store.status === 'active' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          {store.status}
        </div>
        
        <div className="flex items-center gap-1.5 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
          View Store
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}