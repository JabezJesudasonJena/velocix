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
      console.log(formData)
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-neutral-900 border border-neutral-800 rounded-2xl">
      <input 
        className="w-full bg-neutral-950 p-3 rounded-lg mb-4"
        placeholder="Store Name"
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <textarea 
        className="w-full bg-neutral-950 p-3 rounded-lg mb-4"
        placeholder="Description"
        onChange={(e) => setFormData({...formData, desc: e.target.value})}
      />
      
      <div className="flex gap-2 mb-6">
        <input 
          readOnly
          className="flex-1 bg-neutral-950 p-3 rounded-lg"
          value={`${formData.lat}, ${formData.lng}`}
          placeholder="Location coordinates"
        />
        <button 
          type="button" 
          onClick={handleGetLocation}
          className="px-4 bg-neutral-800 rounded-lg"
        >
          {loading ? "Fetching..." : "Get Location"}
        </button>
      </div>
      
      <button className="w-full bg-blue-600 py-3 rounded-lg hover:cursor-pointer">Create Store</button>
    </form>
  );
}