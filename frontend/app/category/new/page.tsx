"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetchClient("/category/create", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to create category");
      }

      // Redirect back to the categories list on success
      router.push("/category");
      router.refresh(); // Forces Next.js to re-fetch the list

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <main className="page-shell flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link href="/category" className="mb-6 inline-block text-sm text-neutral-500 transition-colors hover:text-white">
          &larr; Back to Categories
        </Link>
        
        <div className="panel p-8 shadow-2xl shadow-black/30">
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight">Create New Category</h1>

          {error && (
            <div className="mb-6 bg-red-900/40 border border-red-800 text-red-200 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2">
                Category Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Electronics, Clothing..."
                className="field"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 font-bold disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Category"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}