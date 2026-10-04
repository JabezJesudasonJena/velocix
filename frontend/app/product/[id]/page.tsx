import { notFound } from "next/navigation";
import Link from "next/link";
import { Product } from "@/src/types/product"; 
import { ChevronRight, Package, Utensils, Hash } from 'lucide-react';
import AddToCartModule from "@/src/components/product/AddToCartModule";
import ProductImageGallery from "@/src/components/product/ProductImageGallery"; // Import the new gallery

async function getSingleProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/product/${id}`, {
      cache: 'no-store' 
    });
    
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.data; 
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const product = await getSingleProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        
        {/* --- Premium Breadcrumbs --- */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-500 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* --- Split Layout Architecture --- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* LEFT: Interactive Image Gallery */}
          <div className="flex flex-col">
            <ProductImageGallery 
              images={product.productImages} // Updated to match your backend JSON
              status={product.status} 
              discount_price={product.discount_price} 
            />
          </div>

          {/* RIGHT: Product Data & Actions */}
          <div className="flex flex-col justify-center">
            
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Hash className="h-4 w-4" />
                <span className="font-mono text-sm tracking-widest">{product.sku || 'SKU-0000'}</span>
              </div>
              
              {product.isEdible && (
                <>
                  <span className="h-4 w-px bg-neutral-800"></span>
                  <div className="flex items-center gap-1.5 text-amber-500/80">
                    <Utensils className="h-4 w-4" />
                    <span className="text-sm font-medium tracking-wide">Consumable</span>
                  </div>
                </>
              )}
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
              {product.name}
            </h1>
            
            {/* Elegant Discount Pricing Logic */}
            <div className="mb-8 flex items-baseline gap-3">
              {product.discount_price ? (
                <>
                  <span className="font-mono text-2xl font-medium text-neutral-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="font-mono text-4xl font-semibold text-white">
                    ${product.discount_price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-mono text-4xl font-semibold text-white">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <span className="text-neutral-500 text-sm font-medium">USD</span>
            </div>

            <div className="mb-10">
              <h3 className="mb-3 text-sm font-medium text-white uppercase tracking-wider">Product Details</h3>
              <p className="text-lg leading-relaxed text-neutral-400">
                {product.desc || "Experience premium quality with our latest addition. Expertly crafted for daily use, integrating seamless design with unparalleled durability."}
              </p>
            </div>

            <div className="my-8 h-px w-full bg-gradient-to-r from-neutral-800 to-transparent"></div>

            {/* Client Component for Interactive Redux Cart */}
            <div className="flex flex-col gap-4">
              <AddToCartModule product={product} />
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-neutral-500">
              <Package className="h-4 w-4" />
              Free shipping available on orders over $50
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}