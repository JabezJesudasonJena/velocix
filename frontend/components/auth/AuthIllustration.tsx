import React from 'react';

export default function AuthIllustration() {
  return (
    <div className="hidden lg:flex w-1/2 bg-[#FFFAF0] relative flex-col items-center justify-center p-12 overflow-hidden border-r border-[#e6e8ea]">
      {/* Branding Container */}
      <div className="absolute top-8 left-12 flex items-center gap-2">
        <span
          className="material-symbols-outlined text-[#00873a] text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          deployed_code
        </span>
        <span className="font-['Inter'] text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#191c1e]">
          Velocix
        </span>
      </div>
      
      {/* Illustration Container */}
      <div className="relative w-full max-w-2xl aspect-square rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.02]">
        <img
          alt="High-fidelity 3D claymation illustration of an abstract logistics network."
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFKwL3nysfcAcdcm-LIucnvftSJFVyvINIZw4b_QCANPPoP7G3xCKi_5N9TQ6WO90hgpHQweikkV_KYU6Zh8vkbjF5Fw36pYXZofIHGuMTBzUPfmJvTDosIyevMM208XZ3hl7r5KSotDVyNIdke-Z8b9r-TiS9T16S9_-4f0w2F-MdToGWv42skY3HYOLrPpBAusnyy1Crnz9fKIVbgKWGLgAvs-Ak9rQnyAOZdbWshgkZ7v1ujxIg-kwyKhvEeTZpJRy1TlJzUFvE"
        />
        {/* Glassmorphic Overlay Fragment */}
        <div className="absolute bottom-8 right-8 bg-[#f7f9fb]/80 backdrop-blur-xl border border-[rgba(255,255,255,0.4)] rounded-xl p-6 shadow-xl w-64">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#FACC15] animate-pulse"></div>
            <span className="font-['Inter'] text-[12px] leading-[16px] tracking-[0.1em] font-semibold uppercase text-[#191c1e]">
              System Status
            </span>
          </div>
          <div className="font-['Inter'] text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#191c1e]">
            V3.4 Active
          </div>
          <div className="text-sm text-[#565e74] mt-1 font-mono">Routing optimized.</div>
        </div>
      </div>
      
      {/* Ambient Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FFB084]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#B8A4ED]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    </div>
  );
}