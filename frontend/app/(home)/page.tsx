import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/types/product";
import Link from 'next/link';
import { Plus, ShoppingBag } from 'lucide-react';

// Fetching directly from your backend
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:5000/api/product", { 
      cache: 'no-store' 
    });
    const json = await res.json();
    
    // Return the array nested inside 'data'
    return json.data || []; 
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* --- Premium Header --- */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
              Featured Products
            </h1>
            <p className="mt-2 text-base text-neutral-400">
              Curated picks from premium stores around you.
            </p>
          </div>
        </div>

        {/* --- Elegant Empty State --- */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-neutral-900/50 py-32 text-center shadow-inner">
            <ShoppingBag className="mb-4 h-12 w-12 text-neutral-600" strokeWidth={1} />
            <h3 className="text-xl font-medium text-white">No products found</h3>
            <p className="mt-2 max-w-md text-neutral-400">
              We couldn't find any featured products at the moment. Please check back later or add a new product to your catalog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <Link 
                href={`/product/${product.id}`} 
                key={product.id} 
                className="block group outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#040405] rounded-xl"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* --- High-End Retail FAB --- */}
      <Link 
        href="/product/new"
        title="Add new product"
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-200 active:scale-95"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </Link>
    </main>
  );
}