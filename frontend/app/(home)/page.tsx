import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/types/product";
import Link from 'next/link'

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
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <ProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>

      {/* Floating Action Button from image_fb92ff.png */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-105 transition-transform">
        +
      </button>
    </main>
  );
}