"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/src/lib/api/apiClient";

export default function CreateProductPage() {
  const router = useRouter();

  // 1. Added storeId to the form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    categoryId: "",
    sku: "",
    quantity: "",
    storeId: "", 
  });

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim() !== "") {
      setImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const removeImageUrl = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 2. Parse the storeId from the form data
    const parsedStoreId = parseInt(formData.storeId);
    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      desc: formData.desc,
      categoryId: parseInt(formData.categoryId),
      sku: formData.sku,
      quantity: parseInt(formData.quantity),
      images: images,
    };

    try {
      const response = await fetchClient("/product/add", {
        method: "POST",
        body: JSON.stringify({
          data: payload,
          storeId: parsedStoreId // Passing the manually entered storeId
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to create product");
      }

      // 3. Redirect back to that specific store's page
      router.push(`/store/${parsedStoreId}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-2xl">
        <button 
          onClick={() => router.back()}
          className="mb-6 inline-block text-sm text-neutral-400 transition-colors hover:text-white"
        >
          &larr; Go Back
        </button>

        <h1 className="mb-8 text-3xl font-extrabold tracking-tight">Add New Product</h1>

        <form onSubmit={handleSubmit} className="panel space-y-6 p-8 shadow-2xl shadow-black/30">
          {error && (
            <div className="bg-red-900/40 border border-red-800 text-red-200 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="field"
              placeholder="e.g. Wireless Headphones"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Price ($) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="field"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Initial Stock Quantity *</label>
              <input
                type="number"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleInputChange}
                className="field"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">SKU *</label>
              <input
                type="text"
                name="sku"
                required
                value={formData.sku}
                onChange={handleInputChange}
                className="field"
                placeholder="PROD-123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Category ID *</label>
              <input
                type="number"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleInputChange}
                className="field"
                placeholder="1"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-blue-400">Store ID *</label>
              <input
                type="number"
                name="storeId"
                required
                value={formData.storeId}
                onChange={handleInputChange}
                className="field border-blue-900/50 focus:border-blue-500"
                placeholder="Store ID"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
            <textarea
              name="desc"
              rows={4}
              value={formData.desc}
              onChange={handleInputChange}
              className="field min-h-28 resize-none"
              placeholder="Provide a detailed description of the product..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Product Images (URLs)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="field flex-1"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="btn-secondary px-4"
              >
                Add
              </button>
            </div>

            {images.length > 0 && (
              <ul className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                {images.map((url, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-neutral-900 p-2 rounded border border-neutral-800 text-xs">
                    <span className="truncate max-w-[85%] text-neutral-300">{url}</span>
                    <button
                      type="button"
                      onClick={() => removeImageUrl(idx)}
                      className="text-red-400 hover:text-red-300 font-medium"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-4 w-full p-4 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </main>
  );
}