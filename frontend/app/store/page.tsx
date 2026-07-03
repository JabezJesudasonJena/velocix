import Link from "next/link";
import { cookies } from "next/headers";

// 1. Define your Store type based on your backend response
export interface Store {
  id: number;
  name: string;
  // Add other fields your backend returns, e.g.:
  // description: string;
  // createdAt: string;
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
    <main className="page-shell">
      <div className="page-wrap max-w-6xl">
        
        <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
          <h1 className="text-4xl font-extrabold tracking-tight">All Stores</h1>
          
          <Link 
            href="/store/new" 
            className="btn-primary"
          >
            + New Store
          </Link>
        </div>

        {stores.length === 0 ? (
          <div className="panel py-20 text-center">
            <h2 className="text-2xl text-neutral-400">No stores found.</h2>
            <p className="text-neutral-500 mt-2">Create your first store to get started.</p>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Link href={`/store/${store.id}`} key={store.id}>
                <div className="panel group p-6 transition-all hover:-translate-y-1 hover:border-neutral-600">
                  
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold group-hover:text-white text-neutral-200 transition-colors">
                      {store.name}
                    </h2>
                    <span className="text-neutral-500 text-sm">ID: {store.id}</span>
                  </div>
                  
                  <div className="text-neutral-500 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Active
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