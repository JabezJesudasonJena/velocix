"use client";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/src/types/product";
import { updateQuantity } from "@/src/redux/store/cartSlice";
import type { RootState } from "@/src/redux/store/store";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state: RootState) => state.cart.items[product.id] || 0);

  const handleQuantityChange = (delta: number) => {
    dispatch(updateQuantity({ id: product.id, delta }));
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl hover:border-neutral-700 transition">
      <h3 className="text-lg font-semibold text-white">{product.name}</h3>
      <p className="text-neutral-400 text-sm mt-1 mb-4 line-clamp-2">{product.desc}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          {product.discount_price ? (
            <span className="text-lg font-bold text-emerald-400">₹{proxduct.discount_price}</span>
          ) : (
            <span className="text-lg font-bold text-white">₹{product.price}</span>
          )}
        </div>

        <div className="flex bg-neutral-950 border border-neutral-800 rounded-lg">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity === 0}
            className="px-3 py-1 hover:text-white transition disabled:cursor-not-allowed disabled:text-neutral-600"
          >
            -
          </button>
          <span className="px-3 py-1 border-x border-neutral-800 text-sm font-mono min-w-10 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="px-3 py-1 hover:text-white transition"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Badge for status */}
      <div className="mt-4 flex gap-2">
        <span className="text-[10px] uppercase tracking-wider bg-neutral-800 px-2 py-0.5 rounded text-neutral-400">
          {product.status || "AVL"}
        </span>
        {product.isEdible && (
          <span className="text-[10px] uppercase tracking-wider bg-emerald-900/30 text-emerald-500 px-2 py-0.5 rounded">
            Edible
          </span>
        )}
      </div>
    </div>
  );
}