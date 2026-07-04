import Link from "next/link";
import { cookies } from "next/headers";
import { Store as StoreIcon, Plus, ArrowRight, MapPin, LayoutGrid } from "lucide-react";

// 1. Define your Store type based on the backend response we saw earlier
export interface Store {
  id: number;
  name: string;
  desc?: string | null;
  status?: string;
  createdAt?: string;
}

// 2. Server-side fetcher with Authentication
async function getStores(): Promise<Store[]> {
  try {
    // Await the cookies for Next.js 15
    const cookieStore = await cookies();
    const token = cookieStore.get("velocix_token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Attach the token if the user is logged in
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch("http://localhost:5000/api/store", {
      headers,
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
      console.error("Failed to fetch stores, status:", res.status);
      return [];
    }

    const json = await res.json();
    
    // Assuming your backend uses the same { success: true, data: [...] } structure
    return json.data || []; 
  } catch (error) {
    console.error("Fetch stores error:", error);
    return [];
  }
}

// 3. The Page Component
export default async function StoresPage() {
  const stores = await getStores();

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* --- Header & Action --- */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white flex items-center gap-3">
              <StoreIcon className="h-8 w-8 text-neutral-500" strokeWidth={1.5} />
              All Stores
            </h1>
            <p className="mt-3 text-base text-neutral-400">
              Manage your physical locations and inventory centers.
            </p>
          </div>
          
          <Link 
            href="/store/new" 
            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-lg shadow-white/10"
          >
            <Plus className="h-4 w-4" />
            Create Store
          </Link>
        </div>

        {/* --- Empty State --- */}
        {stores.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-neutral-900/40 py-24 text-center shadow-inner">
            <StoreIcon className="mb-5 h-12 w-12 text-neutral-600" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-white">No stores found</h3>
            <p className="mt-3 max-w-md text-neutral-400 leading-relaxed">
              You haven't established any physical locations yet. Create your first store to start managing inventory.
            </p>
            <Link 
              href="/store/new" 
              className="mt-8 flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-800 border border-white/10 px-8 text-sm font-bold text-white transition-all hover:bg-neutral-700 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Add First Store
            </Link>
          </div>
        ) : (
          
          /* --- Store Grid --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {stores.map((store) => (
              <Link 
                key={store.id} 
                href={`/store/${store.id}`}
                className="group relative flex flex-col justify-between rounded-3xl bg-neutral-900 border border-white/5 p-6 sm:p-8 transition-all duration-300 hover:bg-neutral-800/80 hover:border-white/20 hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#040405]"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 border border-white/10 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                    <StoreIcon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${store.status === 'active' || !store.status ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'active' || !store.status ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    {store.status || 'Active'}
                  </div>
                </div>

                {/* Details Section */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 transition-colors line-clamp-1">
                    {store.name}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed h-10">
                    {store.desc || "No description provided for this location."}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <MapPin className="h-3.5 w-3.5" />
                    Location ID: {store.id.toString().padStart(4, '0')}
                  </div>
                </div>

                {/* Hover Action Strip */}
                <div className="mt-8 flex items-center justify-between pt-5 border-t border-white/5">
                  <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                    Manage Dashboard
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-neutral-400 transition-all group-hover:bg-white group-hover:text-black">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}