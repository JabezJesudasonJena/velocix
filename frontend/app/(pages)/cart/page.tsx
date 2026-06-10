'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart, removeFromCart } from '@/store/cartSlice';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, Loader2, PackageX } from 'lucide-react';
import axios from 'axios';
import api from '@/utils/axios';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Derived state calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15.00 : 0; 
  const tax = subtotal * 0.08; 
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);
    setCheckoutError(null);

    try {
      const payload = {
        items: cartItems,
        summary: { subtotal, shipping, tax, total }
      };
      console.log(payload)

    //   const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, payload);
      
    //   if (response.status === 200 || response.status === 201) {
    //     alert("Order submitted successfully!");
    //   }
    } catch (error) {
      setCheckoutError("Failed to process order. Please verify your connection and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Dedicated function for total removal bypassing the decrement logic if needed
  // Note: If your slice only decrements on removeFromCart, you might need a separate purge action. 
  // Assuming removeFromCart handles it based on previous logic, we run it in a loop or ensure the slice handles a full purge.
  const handlePurgeItem = (id: string | number, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      dispatch(removeFromCart(id));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-[85vh] bg-[#F4F4F5] flex flex-col items-center justify-center px-4 ${jakarta.className}`}>
        <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
            <PackageX className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Manifest Empty</h2>
          <p className="text-gray-500 font-medium mb-10 max-w-sm">
            You currently have no items selected for your delivery route. Return to the inventory to assign products.
          </p>
          <Link 
            href="/product"
            className="w-full flex items-center justify-center px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-400 hover:-translate-y-0.5 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] transition-all duration-200 active:scale-[0.98]"
          >
            Access Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F4F4F5] pt-12 pb-32 ${jakarta.className}`}>
      <main className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Active Item Manifest</h1>
          <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-widest">Review your route allocations</p>
        </div>

        {checkoutError && (
          <div className="mb-8 p-6 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm font-bold shadow-sm">
            {checkoutError}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:bg-gray-50/50 transition-colors">
                    
                    {/* Item Image Placeholder */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent z-0"></div>
                      <ShoppingBag className="w-10 h-10 text-gray-300 relative z-10" strokeWidth={1.5} />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-6">
                      
                      {/* Name & Unit Price */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between sm:justify-start gap-4 mb-1">
                          <h3 className="text-xl font-bold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          {/* Mobile-only trash button */}
                          <button 
                            onClick={() => handlePurgeItem(item.id, item.quantity)}
                            className="sm:hidden p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-gray-400">
                          Unit Price: <span className="text-gray-600">${Number(item.price).toFixed(2)}</span>
                        </p>
                        <p className="text-sm font-semibold text-gray-400 mt-0.5">
                          SKU: <span className="font-mono text-gray-500">{item.id}</span>
                        </p>
                      </div>

                      {/* Controls & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-10">
                        
                        {/* Quantity Pill */}
                        <div className="flex items-center bg-gray-50 rounded-xl p-1.5 border border-gray-200">
                          <button 
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-600 shadow-sm border border-gray-100 hover:text-emerald-600 hover:border-emerald-200 transition-colors focus:outline-none"
                          >
                            <Minus size={16} strokeWidth={2.5} />
                          </button>
                          <span className="font-black text-lg text-gray-900 w-12 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => dispatch(addToCart({ id: item.id, name: item.name, price: item.price }))}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-600 shadow-sm border border-gray-100 hover:text-emerald-600 hover:border-emerald-200 transition-colors focus:outline-none"
                          >
                            <Plus size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                        
                        {/* Item Total */}
                        <div className="w-24 text-right">
                          <span className="text-xl font-black text-gray-900 block">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Desktop Trash Button */}
                        <button 
                          onClick={() => handlePurgeItem(item.id, item.quantity)}
                          className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors focus:outline-none"
                          title="Remove entirely"
                        >
                          <Trash2 size={20} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[420px]">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 sticky top-32">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">Summary</h2>
              
              <div className="space-y-5 text-sm font-bold text-gray-500 mb-8 border-b border-gray-100 pb-8">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-base text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Logistics Estimation</span>
                  <span className="text-base text-gray-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax (8%)</span>
                  <span className="text-base text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-4xl font-black text-emerald-600 tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-3 bg-emerald-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-emerald-400 hover:-translate-y-0.5 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none active:scale-[0.98]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing Route...
                  </>
                ) : (
                  <>
                    Authorize Order
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                End-to-End Encryption
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}