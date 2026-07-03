"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    
    if (searchQuery.trim() !== "") {
      // Redirect to the search page with the query in the URL
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex items-center w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-2 transition focus-within:border-blue-500"
    >
      <span className="px-2 text-neutral-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products, stores, or categories"
        className="w-full bg-transparent py-2.5 text-sm text-white placeholder-neutral-500"
      />
      <button 
        type="submit" 
        className="rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
      >
        Search
      </button>
    </form>
  );
}