"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'consumer' // Default value matches your schema
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Redirect to login or home upon successful creation
        router.push("/"); 
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || 'Signup failed'}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="panel p-7 sm:p-8">
      <div className="space-y-4">
        
        {['name', 'email', 'password'].map((field) => (
          <div key={field}>
            <label className="mb-1.5 block text-sm font-medium capitalize text-neutral-400">
              {field}
            </label>
            <input 
              name={field}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              required
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="field"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        <div>
          <label className="mb-1.5 block text-sm font-medium capitalize text-neutral-400">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="field appearance-none"
          >
            <option value="consumer">Consumer</option>
            <option value="seller">Seller</option>
            <option value="storeadmin">Store Admin</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="btn-primary mt-3 w-full py-3 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        
      </div>
    </form>
  );
}