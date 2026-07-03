"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";

interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export default function SingleCategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      try {
        const res = await fetchClient(`/category/${categoryId}`, { method: "GET" });
        const json = await res.json();

        if (json.success) {
          setCategory(json.data);
        } else {
          setError(json.message || "Failed to load category");
        }
      } catch (err: any) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) {
    return <div className="page-shell flex items-center justify-center text-white">Loading category...</div>;
  }

  if (error || !category) {
    return (
      <div className="page-shell flex flex-col items-center justify-center text-white">
        <p className="text-red-400 mb-4">{error || "Category not found."}</p>
        <Link href="/category" className="btn-secondary">Return to categories</Link>
      </div>
    );
  }

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-2xl">
        <Link href="/category" className="mb-6 inline-block text-sm text-neutral-500 transition-colors hover:text-white">
          &larr; Back to Categories
        </Link>
        
        <div className="panel p-8">
          <div className="mb-2 text-neutral-500 text-sm font-mono">ID: {category.id}</div>
          <h1 className="mb-6 text-4xl font-extrabold capitalize tracking-tight text-white">{category.name}</h1>
          
          <div className="pt-4 border-t border-neutral-800">
            <span className="text-neutral-400 text-sm">
              Added to database on: {new Date(category.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}