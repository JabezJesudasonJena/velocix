import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/types/product";
import Link from 'next/link';

// Fetching directly from your backend
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:5000/api/product", { 
      cache: 'no-store' 
    });
    const json = await res.json();
    
    // Return the array nested inside 'data'
    return json.data; 
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="page-shell">
      <div className="page-wrap">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Featured Products</h1>
          <p className="mt-1 text-sm text-neutral-400">Curated picks from stores around you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      </div>

      <Link 
        href="/product/new"
        className="fixed bottom-7 right-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white shadow-lg shadow-blue-900/30 transition hover:scale-105 hover:bg-blue-700"
      >
        +
      </Link>
    </main>
  );
}