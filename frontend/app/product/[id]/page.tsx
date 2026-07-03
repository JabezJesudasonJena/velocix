import { notFound } from "next/navigation";
import Link from "next/link";
import { Product } from "@/src/types/product"; 

async function getSingleProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/product/${id}`, {
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      return null;
    }
    
    const json = await res.json();
    return json.data; 
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// 1. Update the type of params to be a Promise
export default async function ProductDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 2. Await the params to unwrap the ID
  const resolvedParams = await params;
  
  // 3. Pass the unwrapped ID to your fetch function
  const product = await getSingleProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-4xl">
        <Link 
          href="/" 
          className="mb-8 inline-block text-sm text-neutral-400 transition-colors hover:text-white"
        >
          &larr; Back to Products
        </Link>
        
        <div className="panel p-8 shadow-xl shadow-black/30">
          
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-extrabold tracking-tight">{product.name}</h1>
            
            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
              product.status === 'AVL' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
            }`}>
              {product.status === 'AVL' ? 'AVAILABLE' : product.status}
            </span>
          </div>

          <p className="mb-6 text-lg leading-8 text-neutral-300">{product.desc}</p>
          
          <div className="flex items-end justify-between border-t border-neutral-800 pt-6">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Price</p>
              <div className="text-4xl font-bold text-white">
                ${product.price.toFixed(2)}
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-neutral-500">SKU: <span className="text-neutral-300">{product.sku}</span></p>
              {product.isEdible && (
                 <p className="text-sm text-amber-500 mt-1">Edible Product</p>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}