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
      className="flex items-center w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden focus-within:border-neutral-500 transition-colors"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full bg-transparent text-white px-4 py-2 focus:outline-none placeholder-neutral-500"
      />
      <button 
        type="submit" 
        className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
      >
        {/* Simple Search Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}