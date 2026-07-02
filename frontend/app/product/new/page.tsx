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
    console.log(images)
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
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Adjusted the back button since we don't have a specific store yet */}
        <button 
          onClick={() => router.back()}
          className="text-neutral-400 hover:text-white mb-6 inline-block transition-colors"
        >
          &larr; Go Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow-2xl">
          {error && (
            <div className="bg-red-900/40 border border-red-800 text-red-200 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
              placeholder="e.g. Wireless Headphones"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Price ($) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="0.00"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Initial Stock Quantity *</label>
              <input
                type="number"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">SKU *</label>
              <input
                type="text"
                name="sku"
                required
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="PROD-123"
              />
            </div>

            {/* Category ID */}
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Category ID *</label>
              <input
                type="number"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="1"
              />
            </div>

            {/* 4. NEW: Store ID Input */}
            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">Store ID *</label>
              <input
                type="number"
                name="storeId"
                required
                value={formData.storeId}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-amber-900/50 rounded-lg p-3 text-white focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="Store ID"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
            <textarea
              name="desc"
              rows={4}
              value={formData.desc}
              onChange={handleInputChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-neutral-600 transition-colors resize-none"
              placeholder="Provide a detailed description of the product..."
            />
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Product Images (URLs)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="bg-neutral-800 hover:bg-neutral-700 px-4 rounded-lg font-medium transition-colors"
              >
                Add
              </button>
            </div>

            {/* Added Images List */}
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

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold p-4 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </main>
  );
}