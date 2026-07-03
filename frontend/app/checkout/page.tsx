"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { RootState } from "@/src/redux/store/store";
import { fetchClient } from "@/src/lib/api/apiClient";
// Import the actions from your cartSlice
import { clearCart, updateQuantity } from "@/src/redux/store/cartSlice"; 

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Track hydration state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Grab cart data from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items || []);
  const cartTotal = useSelector((state: RootState) => state.cart.totalPrice || 0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle + and - buttons in the checkout
  const handleQuantityChange = (item: any, delta: number) => {
    dispatch(
      updateQuantity({
        product: { id: item.id, name: item.name, price: item.price },
        delta: delta,
      })
    );
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    setLoading(true);
    setError(null);

    // Payload updated to match your new backend requirements
    const orderPayload = {
      // If your backend schema strictly requires an addressId, you might need to hardcode a fallback here like `addressId: 1` 
      // or ensure it's handled in the backend/database schema.
      items: cartItems.map((item: any) => ({
        productId: item.id, 
        quantity: item.quantity,
      })),
    };

    try {
      // Updated to the new endpoint
      console.log(orderPayload)
      const res = await fetchClient("/order/place", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to place order.");
      }

      // Success! Clear the cart and redirect to home
      dispatch(clearCart());
      router.push(`/`);
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  // Return a neutral loading state while SSR is happening
  if (!mounted) {
    return (
      <main className="page-shell flex items-center justify-center">
      </main>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="page-shell flex flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-3xl font-extrabold">Your Cart is Empty</h1>
        <p className="mb-8 text-neutral-400">Add some products to your cart before checking out.</p>
        <Link href="/" className="btn-primary px-6 py-3">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="page-wrap max-w-2xl">
        <Link href="/" className="mb-6 inline-block text-sm text-neutral-500 transition-colors hover:text-white">
          &larr; Back to Shop
        </Link>
        
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight">Review Your Order</h1>

        {error && (
          <div className="mb-6 bg-red-900/40 border border-red-800 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="panel p-8">
          <h2 className="text-xl font-semibold mb-6 border-b border-neutral-800 pb-4">Cart Items</h2>
          
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 sm:flex-row sm:items-center sm:justify-between">
                
                {/* Item Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-neutral-500">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-1">
                  <button 
                    onClick={() => handleQuantityChange(item, -1)}
                    className="h-8 w-8 rounded bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item, 1)}
                    className="h-8 w-8 rounded bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <div className="font-semibold text-right min-w-[80px]">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-800 pt-6 space-y-3 mb-8">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Estimated Tax (8%)</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-neutral-800 mt-2">
              <span>Total</span>
              <span>${(cartTotal * 1.08).toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm & Place Order"}
          </button>
        </div>

      </div>
    </main>
  );
}