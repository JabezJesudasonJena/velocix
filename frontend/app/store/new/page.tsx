"use client";
import { useState } from 'react';
import { fetchClient } from '@/src/lib/api/apiClient';
import { useRouter } from 'next/navigation';

export default function CreateStorePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    name: '', 
    desc: '', 
    lat: 0, 
    lng: 0, 
    status: 'active' 
  });
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchClient("/store/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/store")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-xl">
      <form onSubmit={handleSubmit} className="panel mx-auto p-8">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Create Store</h1>

        <label className="mb-1.5 block text-sm font-medium text-neutral-400">Store Name</label>
        <input 
          className="field mb-4"
          placeholder="Store Name"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        <label className="mb-1.5 block text-sm font-medium text-neutral-400">Description</label>
        <textarea 
          className="field mb-4 min-h-28 resize-none"
          placeholder="Description"
          onChange={(e) => setFormData({...formData, desc: e.target.value})}
        />

        <div className="mb-6 flex gap-2">
          <input 
            readOnly
            className="field flex-1"
            value={`${formData.lat}, ${formData.lng}`}
            placeholder="Location coordinates"
          />
          <button 
            type="button" 
            onClick={handleGetLocation}
            className="btn-secondary px-4"
          >
            {loading ? "Fetching..." : "Get Location"}
          </button>
        </div>

        <button className="btn-primary w-full py-3 hover:cursor-pointer">Create Store</button>
      </form>
      </div>
    </main>
  );
}