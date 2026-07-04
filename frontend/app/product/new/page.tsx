"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "@/src/lib/api/apiClient";
import { 
  ArrowLeft, AlertCircle, Loader2, CheckCircle2, 
  ImagePlus, X, DollarSign, Package, FolderTree, Store, ChevronDown, Hash
} from "lucide-react";

export default function CreateProductPage() {
  const router = useRouter();

  // --- Meta Data States (Categories & Stores) ---
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [stores, setStores] = useState<{id: number, name: string}[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  // --- Form States ---
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
  
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  // Fetch Categories & Stores on Mount
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const [catRes, storeRes] = await Promise.all([
          fetchClient("/category", { method: "GET" }),
          fetchClient("/store", { method: "GET" })
        ]);

        const catJson = await catRes.json();
        const storeJson = await storeRes.json();

        if (catJson.success) setCategories(catJson.data);
        if (storeJson.success) setStores(storeJson.data);
        
      } catch (err) {
        console.error("Failed to fetch meta data:", err);
      } finally {
        setLoadingMeta(false);
      }
    };
    fetchMetaData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (status === 'error') {
      setStatus('idle');
      setMessage(null);
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim() !== "") {
      setImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const handleImageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      addImageUrl();
    }
  };

  const removeImageUrl = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId || !formData.storeId) {
      setStatus('error');
      setMessage("Please select both a Store and a Category.");
      return;
    }

    setStatus('processing');
    setMessage(null);

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
          storeId: parsedStoreId 
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to create product");
      }

      setStatus('success');
      
      setTimeout(() => {
        router.push(`/store/${parsedStoreId}`);
        router.refresh();
      }, 1000);

    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || "An unexpected error occurred");
    }
  };

  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        
        {/* --- Header & Navigation --- */}
        <div className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-white/5 transition-colors hover:bg-white hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Add New Product
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Create a new listing for your storefront catalog.
            </p>
          </div>
        </div>

        {/* --- Global Error Banner --- */}
        <div className={`mb-8 flex items-center gap-3 rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-sm text-red-400 transition-all duration-300 ${status === 'error' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'}`}>
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{message}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          
          {/* ================= LEFT COLUMN (Main Details) ================= */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            
            <div className="rounded-2xl bg-neutral-900 border border-white/5 p-6 sm:p-8 shadow-xl">
              <h2 className="mb-6 text-lg font-semibold text-white">General Information</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-300">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30"
                    placeholder="e.g. Minimalist Steel Watch"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-300">Description</label>
                  <textarea
                    name="desc"
                    rows={5}
                    value={formData.desc}
                    onChange={handleInputChange}
                    className="w-full resize-y rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30"
                    placeholder="Describe the product details, features, and dimensions..."
                  />
                </div>
              </div>
            </div>

            {/* Media/Images Card */}
            <div className="rounded-2xl bg-neutral-900 border border-white/5 p-6 sm:p-8 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Media</h2>
                <span className="text-xs font-medium text-neutral-500 bg-neutral-950 px-2 py-1 rounded-md border border-neutral-800">URLs Only</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-500">
                      <ImagePlus className="h-4 w-4" />
                    </div>
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      onKeyDown={handleImageInputKeyDown}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
                  >
                    Add Media
                  </button>
                </div>

                {/* Visual Image Gallery */}
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mt-6">
                    {images.map((url, idx) => (
                      <div key={idx} className="group relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-950 border border-neutral-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`Preview ${idx}`} className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
                        <button
                          type="button"
                          onClick={() => removeImageUrl(idx)}
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:scale-110 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-950/50 py-12 text-center mt-6">
                    <ImagePlus className="mb-3 h-8 w-8 text-neutral-600" />
                    <p className="text-sm font-medium text-neutral-400">No media added yet</p>
                    <p className="text-xs text-neutral-600 mt-1">Paste an image URL above</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Meta & Action) ================= */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            
            <div className="rounded-2xl bg-neutral-900 border border-white/5 p-6 shadow-xl space-y-6">
              
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <DollarSign className="h-4 w-4 text-neutral-500" />
                  Pricing
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-500">
                    <span className="font-mono">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-8 pr-4 py-3 font-mono text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="h-px w-full bg-neutral-800"></div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <Package className="h-4 w-4 text-neutral-500" />
                  Initial Stock
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 font-mono text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30"
                  placeholder="0"
                />
              </div>
            </div>

            {/* --- Organization / Identifiers (With Custom Dropdowns) --- */}
            <div className="rounded-2xl bg-neutral-900 border border-white/5 p-6 shadow-xl space-y-5">
              
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <Hash className="h-4 w-4 text-neutral-500" />
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  type="text"
                  name="sku"
                  required
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 font-mono text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 uppercase"
                  placeholder="PROD-123"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <FolderTree className="h-4 w-4 text-neutral-500" />
                  Category Placement
                </label>
                <div className="relative">
                  {loadingMeta ? (
                    <div className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-neutral-500 animate-pulse">Loading categories...</div>
                  ) : (
                    <>
                      <select
                        name="categoryId"
                        required
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="w-full appearance-none rounded-xl bg-neutral-950 border border-neutral-800 pl-4 pr-10 py-3 text-sm text-white outline-none transition-all focus:border-white/30 focus:ring-1 focus:ring-white/30 disabled:opacity-50"
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-neutral-900">{cat.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" />
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-blue-400">
                  <Store className="h-4 w-4 text-blue-500" />
                  Store Allocation
                </label>
                <div className="relative">
                  {loadingMeta ? (
                    <div className="w-full rounded-xl bg-neutral-950 border border-blue-900/30 px-4 py-3 text-sm text-neutral-500 animate-pulse">Loading stores...</div>
                  ) : (
                    <>
                      <select
                        name="storeId"
                        required
                        value={formData.storeId}
                        onChange={handleInputChange}
                        className="w-full appearance-none rounded-xl bg-neutral-950 border border-blue-900/50 pl-4 pr-10 py-3 text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="" disabled>Select a destination store</option>
                        {stores.map((store) => (
                          <option key={store.id} value={store.id} className="bg-neutral-900">{store.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-blue-500/50 pointer-events-none" />
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Action Button - 3 State Animated */}
            <button 
              type="submit" 
              disabled={status === 'processing' || status === 'success'}
              className="group relative mt-2 flex w-full h-14 items-center justify-center overflow-hidden rounded-2xl bg-white text-sm font-bold text-neutral-950 transition-all hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 active:scale-[0.98] shadow-lg shadow-white/10"
            >
              <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'idle' || status === 'error' ? 'translate-y-0' : '-translate-y-full'}`}>
                Publish Product
              </span>
              <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'processing' ? 'translate-y-0' : 'translate-y-full'}`}>
                <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
                Processing...
              </span>
              <span className={`absolute inset-0 flex items-center justify-center gap-2 bg-green-500 text-white transition-transform duration-500 ${status === 'success' ? 'translate-y-0' : 'translate-y-full'}`}>
                <CheckCircle2 className="h-5 w-5" />
                Product Live
              </span>
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}