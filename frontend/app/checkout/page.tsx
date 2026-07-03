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
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex items-center justify-center">
      </main>
    );
  }

  // Empty cart state
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
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-neutral-500 hover:text-white transition-colors mb-6 inline-block">
          &larr; Back to Shop
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Review Your Order</h1>

        {error && (
          <div className="mb-6 bg-red-900/40 border border-red-800 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Centered Order Summary (Since form is removed) */}
        <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
          <h2 className="text-xl font-semibold mb-6 border-b border-neutral-800 pb-4">Cart Items</h2>
          
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-neutral-950 p-4 rounded-lg border border-neutral-800 gap-4">
                
                {/* Item Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-neutral-500">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                  <button 
                    onClick={() => handleQuantityChange(item, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-neutral-800 text-white rounded hover:bg-neutral-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-neutral-800 text-white rounded hover:bg-neutral-700 transition-colors"
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
            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 text-lg"
          >
            {loading ? "Processing..." : "Confirm & Place Order"}
          </button>
        </div>

      </div>
    </main>
  );
}