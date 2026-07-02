import Link from "next/link";
import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/types/product"; // Ensure path matches your types

// Server-side fetcher utilizing the query
async function fetchSearchResults(query: string): Promise<Product[]> {
  try {
    const res = await fetch(`http://localhost:5000/api/product/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store', // Always get fresh search results
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Search fetch error:", error);
    return [];
  }
}

// Next.js 15: searchParams is a Promise
export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the params to read the 'q' variable
  const resolvedParams = await searchParams;
  
  // Ensure query is a string (handles edge cases where URL has ?q=a&q=b)
  const query = typeof resolvedParams.q === "string" ? resolvedParams.q : "";

  // If the user navigated to /search without a query, return early
  if (!query) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Please enter a search term</h1>
        <Link href="/" className="text-neutral-400 hover:text-white underline">
          Go back home
        </Link>
      </main>
    );
  }

  // Fetch the data based on the query
  const products = await fetchSearchResults(query);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <Link href="/" className="text-neutral-500 hover:text-white transition-colors mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold">
            Search Results for <span className="text-amber-500">"{query}"</span>
          </h1>
          <p className="text-neutral-400 mt-2">Found {products.length} products</p>
        </div>

        {/* Display logic based on results length */}
        {products.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center mt-10">
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p className="text-neutral-500">Try adjusting your search or checking for typos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}