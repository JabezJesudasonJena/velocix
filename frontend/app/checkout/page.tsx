"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { RootState } from "@/src/redux/store/store";
import { fetchClient } from "@/src/lib/api/apiClient";
import { clearCart, updateQuantity } from "@/src/redux/store/cartSlice"; 
import { 
  ShoppingBag, ArrowLeft, Plus, Minus, 
  Trash2, Loader2, CheckCircle2, AlertCircle, 
  CreditCard, Package, Lock
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItems = useSelector((state: RootState) => state.cart.items || []);
  const cartTotal = useSelector((state: RootState) => state.cart.totalPrice || 0);

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
      setStatus('error');
      setMessage("Your cart is empty!");
      return;
    }

    setStatus('processing');
    setMessage(null);

    const orderPayload = {
      items: cartItems.map((item: any) => ({
        productId: item.id, 
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetchClient("/order/place", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to place order.");
      }

      setStatus('success');
      
      // Clear cart and redirect after animation completes
      setTimeout(() => {
        dispatch(clearCart());
        router.push(`/`);
      }, 1500);
      
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || "An unexpected error occurred during checkout.");
    }
  };

  // --- SSR Loading State ---
  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#040405] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
      </main>
    );
  }

  // --- Premium Empty State ---
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#040405] flex flex-col items-center justify-center text-center px-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-900 border border-white/5 mb-6 shadow-2xl">
          <ShoppingBag className="h-10 w-10 text-neutral-500" strokeWidth={1.5} />
        </div>
        <h1 className="mb-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">Your cart is empty</h1>
        <p className="mb-10 text-neutral-400 max-w-md text-lg">
          Looks like you haven't added anything to your cart yet. Explore our collections to find something you'll love.
        </p>
        <Link 
          href="/" 
          className="flex h-14 items-center justify-center rounded-full bg-white px-10 text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-lg shadow-white/10"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  // --- Full Checkout Layout ---
  return (
    <main className="min-h-screen bg-[#040405] selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 border border-white/5 transition-colors hover:bg-white hover:text-black"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Checkout
          </h1>
        </div>

        {/* Error Banner */}
        <div className={`mb-8 flex items-center gap-3 rounded-xl bg-red-500/10 p-5 border border-red-500/20 text-sm text-red-400 transition-all duration-300 ${status === 'error' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'}`}>
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{message}</p>
        </div>

        {/* --- Two Column Layout --- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-4">
              Order Details
            </h2>
            
            <div className="flex flex-col gap-6">
              {cartItems.map((item: any) => (
                <div key={item.id} className="group flex gap-4 sm:gap-6 items-center">
                  
                  {/* Image Placeholder */}
                  <div className="flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-2xl bg-[#0a0a0a] ring-1 ring-white/5 overflow-hidden">
                     <Package className="h-8 w-8 text-neutral-800" strokeWidth={1} />
                  </div>

                  <div className="flex flex-1 flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    {/* Item Info */}
                    <div className="flex flex-col">
                      <h3 className="font-medium text-white text-base sm:text-lg line-clamp-2">{item.name}</h3>
                      <p className="text-sm font-mono text-neutral-500 mt-1">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity & Total */}
                    <div className="flex items-center gap-6">
                      {/* Premium Quantity Toggle */}
                      <div className="flex h-10 w-[100px] items-center justify-between overflow-hidden rounded-xl bg-neutral-950 ring-1 ring-white/10">
                        <button 
                          onClick={() => handleQuantityChange(item, -1)}
                          disabled={status === 'processing' || status === 'success'}
                          className="flex h-full w-8 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white disabled:opacity-50"
                        >
                          {item.quantity === 1 ? <Trash2 className="h-3.5 w-3.5 text-red-400" /> : <Minus className="h-3.5 w-3.5" />}
                        </button>
                        <span className="font-mono text-sm font-medium text-white">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item, 1)}
                          disabled={status === 'processing' || status === 'success'}
                          className="flex h-full w-8 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white disabled:opacity-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="font-mono font-semibold text-white text-right text-lg min-w-[70px]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="rounded-3xl bg-neutral-900 border border-white/5 p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-6">Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-white">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-white">Free</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                <span className="text-lg font-medium text-white">Total</span>
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  ${(cartTotal * 1.08).toFixed(2)}
                </span>
              </div>

              {/* Action Button - 3 State Animated */}
              <button 
                onClick={handlePlaceOrder}
                disabled={status === 'processing' || status === 'success'}
                className="group relative flex w-full h-14 items-center justify-center overflow-hidden rounded-2xl bg-white text-sm font-bold text-neutral-950 transition-all hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 active:scale-[0.98] shadow-lg shadow-white/10"
              >
                {/* Default State */}
                <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'idle' || status === 'error' ? 'translate-y-0' : '-translate-y-full'}`}>
                  <CreditCard className="h-5 w-5" />
                  Place Order
                </span>
                
                {/* Loading State */}
                <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ${status === 'processing' ? 'translate-y-0' : 'translate-y-full'}`}>
                  <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
                  Processing...
                </span>

                {/* Success State */}
                <span className={`absolute inset-0 flex items-center justify-center gap-2 bg-green-500 text-white transition-transform duration-500 ${status === 'success' ? 'translate-y-0' : 'translate-y-full'}`}>
                  <CheckCircle2 className="h-5 w-5" />
                  Order Confirmed
                </span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
                <Lock className="h-3.5 w-3.5" />
                Secure, encrypted checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}