"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "@/src/lib/api/apiClient";
import { 
  ArrowLeft, Loader2, CheckCircle2, AlertCircle, 
  User, Mail, MapPin, Save 
} from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "" // Assuming this field exists for your address requirements
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchClient("/auth/profile", { method: "GET" });
        const json = await res.json();
        if (json.success) {
          setFormData({
            name: json.data.name || "",
            email: json.data.email || "",
            address: json.data.address || ""
          });
        }
      } catch {
        setError("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
        console.log(formData)
      const res = await fetchClient("/user/edit", {
        method: "PATCH",    
        body: JSON.stringify(formData),
      });
      console.log(res)

      if (!res.ok) throw new Error("Failed to update profile.");
      
      router.push("/profile");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Update failed.");
      setSubmitting(false);
    }
  };

  if (loading) return <main className="min-h-screen bg-[#040405] flex items-center justify-center"><Loader2 className="animate-spin text-white" /></main>;

  return (
    <main className="min-h-screen bg-[#040405] pb-24">
      <div className="mx-auto max-w-[600px] px-4 py-12">
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </button>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-neutral-900 border border-white/5 p-8 shadow-2xl space-y-6">
          <h1 className="text-2xl font-semibold text-white mb-6">Edit Profile</h1>

          {error && <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20"><AlertCircle className="h-4 w-4"/> {error}</div>}

          <div className="space-y-4">
            <label className="text-sm font-medium text-neutral-300">Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
              <input name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3 text-sm text-white" />
            </div>

            <label className="text-sm font-medium text-neutral-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
              <input name="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3 text-sm text-white" />
            </div>

            <label className="text-sm font-medium text-neutral-300">Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
              <input name="address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3 text-sm text-white" placeholder="Enter your address..." />
            </div>
          </div>

          <button disabled={submitting} className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all">
            {submitting ? <Loader2 className="animate-spin h-4 w-4" /> : <><Save className="h-4 w-4" /> Save Details</>}
          </button>
        </form>
      </div>
    </main>
  );
}