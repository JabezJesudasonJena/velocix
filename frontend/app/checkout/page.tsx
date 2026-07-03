"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { RootState } from "@/src/redux/store/store";
import { fetchClient } from "@/src/lib/api/apiClient";
// import { clearCart } from "@/src/redux/slices/cartSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // 1. ADD THIS: Track hydration state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Grab cart data from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items || []);
  const cartTotal = useSelector((state: RootState) => state.cart.totalPrice || 0);

  // Form State for Shipping Details
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    setLoading(true);
    setError(null);

    const orderPayload = {
      shippingAddress: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.zipCode}`,
      contactEmail: shippingDetails.email,
      contactPhone: shippingDetails.phone,
      items: cartItems.map((item: any) => ({
        productId: item.id, 
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetchClient("/order/create", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to place order.");
      }

      // dispatch(clearCart());
      router.push(`/checkout/success?orderId=${json.data.id}`);
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  // 2. ADD THIS: Return a neutral loading state while SSR is happening
  if (!mounted) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex items-center justify-center">
        {/* Optional: Add a subtle loading spinner here */}
      </main>
    );
  }

  // 3. The rest of your component remains exactly the same!
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-neutral-400 mb-8">Add some products to your cart before checking out.</p>
        <Link href="/" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-neutral-500 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Shop
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 bg-red-900/40 border border-red-800 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Shipping Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
              <h2 className="text-xl font-semibold mb-6 border-b border-neutral-800 pb-4">Shipping Information</h2>
              
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">Full Name</label>
                    <input required type="text" name="fullName" value={shippingDetails.fullName} onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:border-neutral-500 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">Email Address</label>
                    <input required type="email" name="email" value={shippingDetails.email} onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:border-neutral-500 outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Street Address</label>
                  <input required type="text" name="address" value={shippingDetails.address} onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:border-neutral-500 outline-none transition-colors" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-neutral-400 mb-1">City</label>
                    <input required type="text" name="city" value={shippingDetails.city} onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:border-neutral-500 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">Zip Code</label>
                    <input required type="text" name="zipCode" value={shippingDetails.zipCode} onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:border-neutral-500 outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={shippingDetails.phone} onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:border-neutral-500 outline-none transition-colors" />
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 border-b border-neutral-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-6">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax (8%)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-neutral-800 mt-2">
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}