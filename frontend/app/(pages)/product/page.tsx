'use client';

import React, { useState, useEffect } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart, removeFromCart } from '@/store/cartSlice';
import { Plus, Minus, PackageX, ShoppingBag } from 'lucide-react';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

interface Product {
  id: string | number;
  storeId: string | number;
  name: string;
  category?: string;
  stock?: number;
  price?: number;
}

export default function ProductsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
        let fetchedProducts = [];
        
        if (Array.isArray(response.data)) fetchedProducts = response.data;
        else if (response.data?.data) fetchedProducts = response.data.data;
        else if (response.data?.products) fetchedProducts = response.data.products;

        setProducts(fetchedProducts);
      } catch (err) {
        setError("Network error. Failed to synchronize inventory.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCartQuantity = (productId: string | number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 pb-24 ${jakarta.className}`}>
<br /><br />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm font-medium">
            {error}
          </div>
        ) : isLoading ? (
          // Professional Skeleton Loading
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col h-[340px]">
                <div className="w-full h-40 bg-gray-100 rounded-lg animate-pulse mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="mt-auto h-10 bg-gray-100 rounded-lg w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm">
                <PackageX className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg font-semibold text-gray-900">No products found</p>
                <p className="text-sm text-gray-500 mt-1">Check back later for restocks.</p>
              </div>
            ) : (
              products.map((product) => {
                const quantityInCart = getCartQuantity(product.id);
                const isOutOfStock = !product.stock || product.stock === 0;

                return (
                  <div 
                    key={product.id} 
                    className="group flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center border-b border-gray-100">
                         <ShoppingBag className="w-8 h-8 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-grow">
                      
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {product.category || 'Standard'}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          ${Number(product.price || 0).toFixed(2)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="mt-auto mb-4">
                        <span className={`text-xs font-medium ${isOutOfStock ? 'text-red-600' : 'text-emerald-600'}`}>
                          {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
                        </span>
                      </div>

                      {/* Controls Area */}
                      <div className="h-10 w-full mt-auto">
                        {quantityInCart > 0 ? (
                          <div className="flex items-center justify-between h-full bg-gray-50 rounded-lg p-1 border border-gray-200">
                            <button 
                              onClick={() => dispatch(removeFromCart(product.id))}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                            >
                              <Minus size={16} />
                            </button>
                            
                            <span className="font-medium text-sm text-gray-900 w-10 text-center">
                              {quantityInCart}
                            </span>
                            
                            <button 
                              onClick={() => dispatch(addToCart({ id: product.id, name: product.name, price: product.price || 0 }))}
                              disabled={product.stock !== undefined && quantityInCart >= product.stock}
                              className="w-8 h-8 flex items-center justify-center bg-emerald-600 rounded text-white shadow-sm hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-400"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => dispatch(addToCart({ id: product.id, name: product.name, price: product.price || 0 }))}
                            disabled={isOutOfStock}
                            className="w-full h-full flex justify-center items-center rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                          >
                            Add to cart
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
}