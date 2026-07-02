import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";

// 1. Define your Store interface
export interface Store {
  id: number;
  name: string;
  // Add any other specific fields your backend returns for a single store
  createdAt?: string;
  updatedAt?: string;
}

// 2. Authenticated Server-Side Fetcher
async function getSingleStore(id: string): Promise<Store | null> {
  try {
    // Securely grab the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("velocix_token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`http://localhost:5000/api/store/${id}`, {
      headers,
      cache: "no-store", 
    });
    
    if (!res.ok) {
      // If the store doesn't exist or the user is unauthorized (401/403/404)
      return null;
    }
    
    const json = await res.json();
    return json.data; 
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// 3. The Page Component (Remembering Next.js 15 Promise params!)
export default async function StoreDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the dynamic params
  const resolvedParams = await params;
  
  // Fetch the store
  const store = await getSingleStore(resolvedParams.id);

  // Trigger 404 if not found
  if (!store) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        <Link 
          href="/store" 
          className="text-neutral-400 hover:text-white mb-8 inline-block transition-colors"
        >
          &larr; Back to Stores
        </Link>
        
        {/* Main Store Details Card */}
        <div className="bg-neutral-900 rounded-xl p-8 border border-neutral-800 shadow-xl mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{store.name}</h1>
              <p className="text-neutral-500">Store ID: {store.id}</p>
            </div>
            
            <div className="flex gap-3">
              {/* Placeholder for future actions */}
              <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm font-medium transition-colors">
                Edit Store
              </button>
              <button className="px-4 py-2 bg-red-900/50 text-red-400 hover:bg-red-900/80 rounded text-sm font-medium transition-colors border border-red-900">
                Delete
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 mb-1">Status</h3>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span>Active & Online</span>
              </div>
            </div>
            
            {store.createdAt && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-1">Created At</h3>
                <p className="text-neutral-200">
                  {new Date(store.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Placeholder section for related data (like Store Products) */}
        <div className="bg-neutral-900/50 rounded-xl p-8 border border-neutral-800/50">
          <h2 className="text-2xl font-semibold mb-4">Store Inventory</h2>
          <p className="text-neutral-500 mb-4">Products associated with this store will appear here.</p>
          <Link 
             href="/product/new" 
             className="text-sm bg-white text-black px-4 py-2 rounded font-medium hover:bg-neutral-200"
          >
            + Add Product to Store
          </Link>
        </div>

      </div>
    </main>
  );
}