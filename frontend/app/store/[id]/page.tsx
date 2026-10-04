"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  Loader2, AlertCircle, Store, MapPin, 
  ArrowLeft, Plus, Package, Hash, ImageIcon 
} from "lucide-react";

// Dynamically import the map to avoid "window is not defined" SSR errors
const StoreMapPreview = dynamic(
  () => import("@/src/components/store/StoreMapPreview"),
  { 
    ssr: false, 
    loading: () => <div className="h-full w-full bg-neutral-800 animate-pulse flex items-center justify-center text-neutral-600"><MapPin className="h-6 w-6"/></div> 
  }
);

export default function StoreDashboard() {
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const storeId = params.id;

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!storeId) return; 

      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/store/storeproducts/${storeId}`, {
          method: "GET"
        });
        
        const json = await res.json();
        
        if (json.success) {
          setStoreData(json.data);
        } else {
          setError(json.message || "Failed to load store data.");
        }
      } catch (err: any) {
        console.error("Failed to fetch store:", err);
        setError("An unexpected error occurred while connecting to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId]);

  // --- Premium Loading State ---
  if (loading) {
    return (
      <main className="min-h-screen bg-[#040405] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Loading Storefront
        </p>
      </main>
    );
  }

  // --- Premium Error State ---
  if (error || !storeData) {
    return (
      <main className="min-h-screen bg-[#040405] flex items-center justify-center p-6">
        <div className="flex max-w-md w-full flex-col items-center gap-4 rounded-3xl bg-neutral-900 border border-white/5 p-8 text-center shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Store Unavailable</h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{error || "We couldn't locate this store."}</p>
          </div>
          <button 
            onClick={() => router.back()}
            className="mt-4 flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 space-y-12">
        
        {/* --- Back Navigation --- */}
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-white/5 transition-colors hover:bg-white hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
        </div>

        {/* --- Store Hero Header (Upgraded Map Layout) --- */}
        {/* Added min-h-[380px] so the map always looks massive, even if text is short */}
        <section className="relative flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 shadow-2xl min-h-[380px]">
          
          {/* Background Glow */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none z-0"></div>
          
          {/* Left Side: Store Info */}
          <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-950 border border-white/10 shrink-0 shadow-inner">
                <Store className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                {storeData.name}
              </h1>
              
              <div className={`mt-2 sm:mt-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest w-max ${storeData.status === 'active' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${storeData.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                {storeData.status}
              </div>
            </div>

            <p className="text-neutral-400 text-base max-w-xl leading-relaxed mb-8">
              {storeData.desc || "No description provided for this location."}
            </p>

            <div className="flex items-center gap-2 text-sm font-mono text-neutral-500 bg-black/20 w-max px-4 py-2.5 rounded-lg border border-white/5">
              <MapPin className="h-4 w-4 text-neutral-400" />
              <span>{storeData.lat.toFixed(6)}, {storeData.lng.toFixed(6)}</span>
            </div>
          </div>

          {/* Right Side: Map Preview */}
          <div className="relative h-[300px] w-full lg:h-auto lg:w-1/2 shrink-0 bg-neutral-950">
            <StoreMapPreview lat={storeData.lat} lng={storeData.lng} />
            
            {/* Flawless Blending Gradients */}
            {/* Left seam blend (desktop): Melts the dark UI into the map */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none z-10"></div>
            {/* Top seam blend (mobile) */}
            <div className="block lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none z-10"></div>
            
            {/* Heavy inner vignette to darken the corners of the map */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none z-10"></div>
          </div>
        </section>

        {/* --- Inventory Section --- */}
        <section>
          {/* Toolbar */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
                <Package className="h-6 w-6 text-neutral-500" />
                Inventory
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Managing {storeData.products?.length || 0} items
              </p>
            </div>
            
            <Link 
              href={`/product/new`} 
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-lg shadow-white/10"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </div>

          {/* Product Grid */}
          {!storeData.products || storeData.products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-neutral-900/40 py-24 text-center shadow-inner">
              <Package className="mb-5 h-12 w-12 text-neutral-600" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-white">No products yet</h3>
              <p className="mt-3 max-w-md text-neutral-400 leading-relaxed">
                This store doesn't have any inventory. Click the "Add Product" button above to create your first listing.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
              {storeData.products.map((product: any) => {
                
                const mainImage = product.productImages && product.productImages.length > 0 
                  ? product.productImages[0].url 
                  : null;

                return (
                  <Link 
                    href={`/product/${product.id}`} 
                    key={product.id} 
                    className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 transition-all duration-300 hover:bg-neutral-800/80 hover:shadow-xl ring-1 ring-white/5 hover:ring-white/20 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#040405]"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0a]">
                      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/50 to-transparent z-0 pointer-events-none"></div>
                      <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                         {mainImage ? (
                           /* eslint-disable-next-line @next/next/no-img-element */
                           <img 
                             src={mainImage} 
                             alt={product.name}
                             className="h-full w-full object-cover object-center"
                           />
                         ) : (
                           <ImageIcon className="h-8 w-8 text-neutral-700" strokeWidth={1.5} />
                         )}
                      </div>

                      {/* Badges */}
                      <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
                        {product.status === 'AVL' && (
                          <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black shadow-sm">
                            <span className="h-1 w-1 rounded-full bg-green-500"></span>
                            Stock
                          </span>
                        )}
                        {product.discount_price && (
                          <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                            Sale
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow p-4">
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <h3 className="line-clamp-1 text-sm font-medium tracking-tight text-white transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      
                      <p className="mb-4 flex-grow line-clamp-1 text-xs text-neutral-400">
                        {product.desc || "No description provided."}
                      </p>

                      <div className="mt-auto flex items-end justify-between pt-3 border-t border-white/5">
                        <div className="flex flex-col">
                          {product.discount_price ? (
                            <>
                              <span className="font-mono text-[10px] text-neutral-500 line-through">
                                ${product.price.toFixed(2)}
                              </span>
                              <span className="font-mono text-sm font-semibold text-white">
                                ${product.discount_price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-mono text-sm font-semibold text-white">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-neutral-500">
                          <Hash className="h-3 w-3" />
                          <span className="font-mono text-[10px] uppercase tracking-wider">{product.sku}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}