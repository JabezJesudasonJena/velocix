"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/category", { method: "GET" });
        const json = await res.json();

        if (json.success) {
          setCategories(json.data);
        } else {
          setError(json.message || "Failed to load categories");
        }
      } catch (err: any) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="page-shell flex items-center justify-center text-white">Loading categories...</div>;
  }

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-4xl">
        <div className="mb-8 flex items-center justify-between border-b border-neutral-800 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Categories</h1>
          <Link 
            href="/category/new" 
            className="btn-primary"
          >
            + Create New
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/40 border border-red-800 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {categories.length === 0 && !error ? (
          <p className="text-neutral-500 text-center py-12">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`}
                className="panel block p-5 transition-colors hover:border-neutral-600"
              >
                <h3 className="text-xl font-medium text-white mb-2">{category.name}</h3>
                <p className="text-neutral-500 text-sm">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}