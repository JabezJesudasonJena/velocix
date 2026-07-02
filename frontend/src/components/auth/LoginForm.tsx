"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const responseData = await res.json();
        
        // Assuming your backend sends the exact object you provided
        const { token, userData } = responseData; 

        if (token) {
          // 1. Store in LocalStorage
          localStorage.setItem("velocix_token", token);
          localStorage.setItem("user", JSON.stringify(userData));

          // 2. Store in Cookie (Expires in 7 days)
          const maxAge = 60 * 60 * 24 * 7; 
          document.cookie = `velocix_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;

          // 3. Redirect to Home
          router.push("/");
        } else {
          alert("Login successful, but no token received.");
        }
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || 'Login failed'}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 p-8 border border-neutral-800 shadow-xl">
      <div className="space-y-4">
        {['email', 'password'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize text-neutral-400">
              {field}
            </label>
            <input 
              name={field}
              type={field === 'password' ? 'password' : 'email'}
              required
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 p-3 focus:ring-2 focus:ring-blue-600 outline-none transition"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition mt-4 hover:cursor-pointer disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}