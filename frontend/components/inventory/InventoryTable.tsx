"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
    
export default function     InventoryTable() {
  // 1. Component State
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // States for your search and filter functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // 2. Fetch Data from Backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const response = await axios.get(`${baseUrl}/product/`); // Adjust endpoint to match your backend
        
        // Assuming your backend returns an array of products
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch inventory:", err);
        setError("Could not load inventory from the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // 3. Filter the products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-[48px] leading-[1.1] tracking-[-0.04em] font-semibold font-['Geist'] mb-1 text-[#181d18]">
          Inventory Management
        </h1>
        <p className="text-[16px] font-['Inter'] text-[#3f493f]">
          Manage your hyperlocal store catalog.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
        <div className="flex flex-1 w-full md:w-auto gap-6">
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6e]">search</span>
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-[#ffffff] border border-[#bfcabb] rounded-xl text-[14px] font-['Inter'] text-[#181d18] placeholder:text-[#6f7a6e] focus:border-[#006b2c] focus:ring-2 focus:ring-[#006b2c]/10 transition-all outline-none" 
              placeholder="Search products..." 
              type="text" 
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none h-11 pl-4 pr-10 bg-[#ffffff] border border-[#bfcabb] rounded-xl text-[14px] font-['Inter'] text-[#181d18] focus:border-[#006b2c] focus:ring-2 focus:ring-[#006b2c]/10 transition-all outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="Produce">Produce</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#6f7a6e] pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Primary Action */}
        <button className="h-11 px-6 bg-[#006b2c] hover:bg-[#00501f] text-white font-['Geist'] text-[18px] font-medium rounded-2xl transition-colors flex items-center gap-2 whitespace-nowrap">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add New Product
        </button>
      </div>

      {/* Data Table Container */}
      <div className="bg-[#ffffff] border border-[#e5eae1] rounded-2xl overflow-hidden shadow-sm">
        
        {/* Loading / Error States */}
        {isLoading && <div className="p-8 text-center text-[#565e74]">Loading inventory...</div>}
        {error && <div className="p-8 text-center text-[#ba1a1a]">{error}</div>}

        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#f6fbf2] border-b border-[#e5eae1]">
                  <th className="py-4 px-6 text-[12px] uppercase tracking-[0.05em] font-semibold font-['Inter'] text-[#456648]">Product</th>
                  <th className="py-4 px-6 text-[12px] uppercase tracking-[0.05em] font-semibold font-['Inter'] text-[#456648]">Category</th>
                  <th className="py-4 px-6 text-[12px] uppercase tracking-[0.05em] font-semibold font-['Inter'] text-[#456648]">Price</th>
                  <th className="py-4 px-6 text-[12px] uppercase tracking-[0.05em] font-semibold font-['Inter'] text-[#456648]">Stock Level</th>
                  <th className="py-4 px-6 text-[12px] uppercase tracking-[0.05em] font-semibold font-['Inter'] text-[#456648] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] font-['Inter'] text-[#181d18] divide-y divide-[#e5eae1]">
                
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-[#565e74]">No products found.</td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#f0f5ec] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#dfe4db] overflow-hidden flex-shrink-0 border border-[#e5eae1]">
                            {/* Fallback image if product.imageUrl is missing */}
                            <img 
                              src={product.imageUrl || "https://placehold.co/100x100/e6e8ea/565e74?text=Item"} 
                              alt={product.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <span className="font-medium text-[14px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#456648]">{product.category}</td>
                      <td className="py-4 px-6 font-medium">${Number(product.price).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        {/* Dynamic Stock Badge */}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${
                          product.stock <= 5 
                            ? 'bg-[#ffe083] text-[#574500]' // Warning color for low stock
                            : 'bg-[#f6fbf2] text-[#456648] border border-[#e5eae1]' // Normal stock
                        }`}>
                          {product.stock} {product.stock <= 5 && 'Low Stock'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-[#456648] hover:text-[#006b2c] hover:bg-[#dfe4db] rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button className="p-2 text-[#456648] hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination (Static for now, but ready to be wired up) */}
        <div className="px-6 py-4 border-t border-[#e5eae1] bg-[#ffffff] flex items-center justify-between">
          <span className="text-[14px] font-['Inter'] text-[#456648]">
            Showing {filteredProducts.length} products
          </span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5eae1] text-[#456648] hover:bg-[#dfe4db] transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#006b2c] text-white font-medium text-[14px] transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5eae1] text-[#181d18] hover:bg-[#dfe4db] transition-colors font-medium text-[14px]">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5eae1] text-[#181d18] hover:bg-[#dfe4db] transition-colors font-medium text-[14px]">3</button>
            <span className="text-[#456648]">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5eae1] text-[#456648] hover:bg-[#dfe4db] transition-colors">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}