"use client";

import React, { useState } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface ProductImage {
  id: number;
  productId: number;
  url: string;
}

interface ProductImageGalleryProps {
  images?: ProductImage[];
  status: string;
  discount_price: number | null;
}

export default function ProductImageGallery({ images = [], status, discount_price }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images && images.length > 0;
  const mainImage = hasImages ? images[currentIndex].url : null;

  return (
    <div className="flex flex-col gap-4">
      
      {/* --- Main Featured Image --- */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#0a0a0a] ring-1 ring-white/5 transition-all">
        {mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            key={mainImage} // Forces re-render for smooth natural browser transitions if needed
            src={mainImage} 
            alt="Product view" 
            className="h-full w-full object-cover object-center transition-opacity duration-300"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-800 opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="h-24 w-24 text-neutral-800" strokeWidth={1} />
            </div>
          </>
        )}

        {/* Badging Overlay */}
        <div className="absolute left-6 top-6 flex flex-col items-start gap-2">
          {status === 'AVL' ? (
            <span className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-black shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Available
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 backdrop-blur-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-400 ring-1 ring-red-500/20">
              <AlertCircle className="h-3.5 w-3.5" />
              Out of Stock
            </span>
          )}
          
          {discount_price && (
            <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* --- Thumbnail Slider Strip (Only shows if > 1 image) --- */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, idx) => {
            const isActive = idx === currentIndex;
            
            return (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  relative aspect-square overflow-hidden rounded-xl bg-[#0a0a0a] transition-all duration-200 ease-out
                  ${isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-[#040405] opacity-100' : 'ring-1 ring-white/10 opacity-50 hover:opacity-100 hover:ring-white/30'}
                `}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={image.url} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="h-full w-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}