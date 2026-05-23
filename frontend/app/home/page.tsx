import React from 'react';

export default function VelocixCustomerHome() {
  return (
    <div className="bg-[#FFFAF0] text-[#191c1e] antialiased min-h-screen flex flex-col font-['Inter'] text-[18px] leading-[28px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* TopNavBar */}
      <nav className="sticky top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-xl border-b border-white/40 shadow-sm dark:bg-[#2d3133]/80">
        <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-[1280px] mx-auto h-20">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b2c] dark:text-[#7ffc97] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>electric_bolt</span>
            <span className="font-['Inter'] text-[56px] font-medium leading-[60px] tracking-[-0.03em] text-[#191c1e] dark:text-[#ffffff]">Velocix</span>
          </div>
          {/* Navigation Links (Web) */}
          <div className="hidden md:flex items-center gap-8 font-['Inter'] text-[16px] leading-[24px]">
            <a className="text-[#006b2c] dark:text-[#7ffc97] border-b-2 border-[#006b2c] dark:border-[#7ffc97] pb-1 hover:text-[#006b2c] dark:hover:text-[#7ffc97] transition-colors duration-200" href="#">Network</a>
            <a className="text-[#3f465c] dark:text-[#e0e3e5] hover:text-[#006b2c] dark:hover:text-[#7ffc97] transition-colors duration-200" href="#">Intelligence</a>
            <a className="text-[#3f465c] dark:text-[#e0e3e5] hover:text-[#006b2c] dark:hover:text-[#7ffc97] transition-colors duration-200" href="#">Fleet</a>
            <a className="text-[#3f465c] dark:text-[#e0e3e5] hover:text-[#006b2c] dark:hover:text-[#7ffc97] transition-colors duration-200" href="#">Analytics</a>
          </div>
          {/* Trailing Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <button className="text-[#3f465c] dark:text-[#e0e3e5] hover:text-[#006b2c] transition-colors hover:scale-95 duration-150 ease-in-out flex items-center justify-center p-2 rounded-full hover:bg-[#e0e3e5]">
                <span className="material-symbols-outlined">notifications_active</span>
              </button>
              <button className="text-[#3f465c] dark:text-[#e0e3e5] hover:text-[#006b2c] transition-colors hover:scale-95 duration-150 ease-in-out flex items-center justify-center p-2 rounded-full hover:bg-[#e0e3e5]">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
            <button className="bg-[#2d3133] text-[#ffffff] px-6 py-2.5 rounded-xl font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.1em] leading-[16px] hover:scale-95 duration-150 ease-in-out transition-transform shadow-md">
              Deploy AI
            </button>
          </div>
        </div>
      </nav>

      {/* Real-time Status Banner */}
      <div className="bg-[#00873a] text-[#f7fff2] py-2 px-4 w-full flex justify-center items-center gap-2 font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.1em] leading-[16px] shadow-inner">
        <span className="material-symbols-outlined text-[16px]">bolt</span>
        <span>Hyperlocal grid optimized. Delivery times in your area are down by 14% today.</span>
      </div>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center w-full pb-[96px]">
        {/* Hero Section with AI Search */}
        <section className="w-full relative bg-[#f2f4f6] overflow-hidden h-[450px] flex items-center justify-center border-b border-white/40">
          <div className="absolute inset-0 w-full h-full">
            <img alt="Background illustration" className="w-full h-full object-cover opacity-60 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKmR8Hu3a2F-GP8UqaPY5_48BWFNmCfUgs2hsrObX4mpr-PB2r7yRsp8FVWzwiZN4uwnV2d5LWWWj2q-PHghpAYA7JvUq1LRo45VnRhoiqu2Yrw1os9OIa1zKfuiT1WE1Hvh23HDOiCjjLWAgBr6_F60IH1ZxuQdKCmhxJVS4gM-Z2d7pDHTWYEH2vfhneW-UWfjdpRVfdlq5RTvssWYcd8Jj9JoTriWhErf_cj_G_TmYR-___cc-yCDQWbLyrsAvW4k97iArxX7zq" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f2f4f6] via-[#f2f4f6]/80 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-3xl px-4 flex flex-col items-center text-center mt-12">
            <h1 className="font-['Inter'] text-[40px] md:text-[72px] font-semibold leading-[44px] md:leading-[72px] tracking-[-0.02em] md:tracking-[-0.04em] text-[#191c1e] mb-6 drop-shadow-sm">
              Intelligence in <span className="text-[#006b2c]">Motion</span>
            </h1>
            <div className="w-full bg-[#f7f9fb]/90 backdrop-blur-2xl border border-white/40 p-2 rounded-full shadow-lg flex items-center group focus-within:ring-2 focus-within:ring-[#006b2c]/50 transition-all hover:scale-[1.01] duration-300">
              <span className="material-symbols-outlined text-[#006b2c] ml-4 mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>search_spark</span>
              <input className="flex-grow bg-transparent border-none focus:ring-0 text-[#191c1e] font-['Inter'] text-[18px] leading-[28px] placeholder:text-[#5c647a]/70 py-3 outline-none" placeholder="Ask Velcoix AI... e.g. 'Fresh produce near me in 10 mins'" type="text" />
              <button className="bg-[#006b2c] text-[#ffffff] px-6 py-3 rounded-full font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.1em] leading-[16px] shadow-inner hover:bg-[#006e2d] transition-colors flex items-center gap-2">
                Find Now
              </button>
            </div>
          </div>
        </section>

        {/* Container for Grid Layouts */}
        <div className="w-full max-w-[1280px] px-4 md:px-6 mt-[96px] flex flex-col gap-[96px]">
          {/* Bento Grid: Flash Sales & AI Recommendations */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Flash Sales (Glassmorphic) */}
            <div className="col-span-1 md:col-span-2 bg-[#f7f9fb]/60 backdrop-blur-2xl border border-white/40 p-[32px] rounded-xl relative overflow-hidden group hover:translate-y-[-2px] transition-transform duration-300">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFB084]/20 rounded-full blur-3xl group-hover:bg-[#FFB084]/30 transition-colors"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[#a72d51]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    <h2 className="font-['Inter'] text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-[#191c1e]">Flash Sales</h2>
                  </div>
                  <p className="font-['Inter'] text-[16px] leading-[24px] text-[#3e4a3d] max-w-md">Hyperlocal discounts optimized for your current grid zone. Ending soon.</p>
                </div>
                <div className="mt-8 flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                  {/* Product Mini Card */}
                  <div className="min-w-[160px] bg-[#f7f9fb] rounded-lg p-3 shadow-sm border border-[#e0e3e5]">
                    <div className="h-24 bg-[#eceef0] rounded mb-3 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#565e74] text-4xl">grocery</span>
                    </div>
                    <h3 className="font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.1em] leading-[16px] text-[#191c1e] truncate">Organic Avocados</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-['Inter'] text-[16px] leading-[24px] font-bold text-[#006b2c]">$2.99</span>
                      <span className="text-[12px] text-[#a72d51] line-through">$4.50</span>
                    </div>
                  </div>
                  {/* Product Mini Card */}
                  <div className="min-w-[160px] bg-[#f7f9fb] rounded-lg p-3 shadow-sm border border-[#e0e3e5]">
                    <div className="h-24 bg-[#eceef0] rounded mb-3 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#565e74] text-4xl">water_bottle</span>
                    </div>
                    <h3 className="font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.1em] leading-[16px] text-[#191c1e] truncate">Spring Water 6pk</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-['Inter'] text-[16px] leading-[24px] font-bold text-[#006b2c]">$4.50</span>
                      <span className="text-[12px] text-[#a72d51] line-through">$6.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations (High Voltage) */}
            <div className="col-span-1 bg-[#FACC15] p-[32px] rounded-xl relative overflow-hidden group hover:translate-y-[-2px] transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <span className="material-symbols-outlined text-6xl">psychology</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#191c1e]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <h2 className="font-['Inter'] text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-[#191c1e]">For You</h2>
                </div>
                <p className="font-['Inter'] text-[16px] leading-[24px] text-[#191c1e]/80 mb-6">Velocix AI predicts you'll need these essentials in the next 24 hours.</p>
                <div className="mt-auto space-y-3">
                  <div className="bg-[#f7f9fb]/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00873a] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#f7fff2] text-[20px]">coffee</span>
                      </div>
                      <span className="font-['Inter'] text-[16px] leading-[24px] font-medium text-[#191c1e]">Artisan Coffee Beans</span>
                    </div>
                    <button className="text-[#006b2c] hover:bg-[#00873a]/50 p-1 rounded-full transition-colors">
                      <span className="material-symbols-outlined">add_circle</span>
                    </button>
                  </div>
                  <div className="bg-[#f7f9fb]/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#dae2fd] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#5c647a] text-[20px]">bakery_dining</span>
                      </div>
                      <span className="font-['Inter'] text-[16px] leading-[24px] font-medium text-[#191c1e]">Sourdough Loaf</span>
                    </div>
                    <button className="text-[#006b2c] hover:bg-[#00873a]/50 p-1 rounded-full transition-colors">
                      <span className="material-symbols-outlined">add_circle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nearby Stores */}
          <section className="w-full">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-['Inter'] text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-[#191c1e]">Hyperlocal Hubs</h2>
                <p className="font-['Inter'] text-[16px] leading-[24px] text-[#3e4a3d] mt-1">Fulfillment centers within 2 miles.</p>
              </div>
              <button className="text-[#006b2c] font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.1em] leading-[16px] hover:underline flex items-center gap-1">
                View Map <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Store Card 1 */}
              <div className="bg-[#f7f9fb] rounded-xl overflow-hidden border border-[#e0e3e5] hover:shadow-[0px_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-32 bg-[#e6e8ea] relative">
                  <div className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNmU4ZWEiLz48L3N2Zz4=')] bg-cover"></div>
                  <div className="absolute top-3 left-3 bg-[#006b2c] text-[#ffffff] px-2 py-1 rounded-full font-['Inter'] text-[10px] uppercase font-semibold tracking-[0.1em] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span> 8 mins
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-['Inter'] text-[18px] font-semibold leading-[32px] tracking-[-0.01em] text-[#191c1e]">Velocix Fresh #042</h3>
                  <div className="flex items-center gap-2 text-[#3e4a3d] font-['Inter'] text-[14px] leading-[24px] mt-2">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    0.4 miles away
                  </div>
                </div>
              </div>
              {/* Store Card 2 */}
              <div className="bg-[#f7f9fb] rounded-xl overflow-hidden border border-[#e0e3e5] hover:shadow-[0px_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-32 bg-[#e6e8ea] relative">
                  <div className="absolute top-3 left-3 bg-[#006b2c] text-[#ffffff] px-2 py-1 rounded-full font-['Inter'] text-[10px] uppercase font-semibold tracking-[0.1em] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span> 12 mins
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-['Inter'] text-[18px] font-semibold leading-[32px] tracking-[-0.01em] text-[#191c1e]">Urban Pantry Hub</h3>
                  <div className="flex items-center gap-2 text-[#3e4a3d] font-['Inter'] text-[14px] leading-[24px] mt-2">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    0.8 miles away
                  </div>
                </div>
              </div>
              {/* Store Card 3 */}
              <div className="bg-[#f7f9fb] rounded-xl overflow-hidden border border-[#e0e3e5] hover:shadow-[0px_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-32 bg-[#e6e8ea] relative">
                  <div className="absolute top-3 left-3 bg-[#e0e3e5] text-[#191c1e] px-2 py-1 rounded-full font-['Inter'] text-[10px] uppercase font-semibold tracking-[0.1em] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">schedule</span> 25 mins
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-['Inter'] text-[18px] font-semibold leading-[32px] tracking-[-0.01em] text-[#191c1e]">Tech &amp; Gadget Express</h3>
                  <div className="flex items-center gap-2 text-[#3e4a3d] font-['Inter'] text-[14px] leading-[24px] mt-2">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    1.2 miles away
                  </div>
                </div>
              </div>
              {/* Store Card 4 */}
              <div className="bg-[#f7f9fb] rounded-xl overflow-hidden border border-[#e0e3e5] hover:shadow-[0px_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 opacity-60">
                <div className="h-32 bg-[#e6e8ea] relative">
                  <div className="absolute top-3 left-3 bg-[#ffdad6] text-[#93000a] px-2 py-1 rounded-full font-['Inter'] text-[10px] uppercase font-semibold tracking-[0.1em] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">block</span> Offline
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-['Inter'] text-[18px] font-semibold leading-[32px] tracking-[-0.01em] text-[#191c1e]">Pharmacy Point Alpha</h3>
                  <div className="flex items-center gap-2 text-[#3e4a3d] font-['Inter'] text-[14px] leading-[24px] mt-2">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    1.5 miles away
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Cart Button */}
      <button className="fixed bottom-8 right-8 bg-[#2d3133] text-[#ffffff] p-4 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-105 transition-transform duration-200 group">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
        <div className="absolute -top-2 -right-2 bg-[#006b2c] text-[#ffffff] w-6 h-6 rounded-full flex items-center justify-center font-['Inter'] text-[10px] uppercase font-semibold tracking-[0.1em] shadow-sm border-2 border-[#FFFAF0]">
          3
        </div>
      </button>

      {/* Footer */}
      <footer className="w-full py-[96px] bg-[#FFFAF0] dark:bg-[#ffffff] border-t border-[#e6e8ea] mt-auto">
        <div className="px-4 md:px-6 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-['Inter'] text-[24px] font-bold tracking-tight text-[#191c1e]">
            Velocix
          </div>
          <div className="flex items-center gap-6 font-['Inter'] text-[16px] leading-[24px]">
            <a className="text-[#565e74] hover:text-[#006b2c] transition-colors" href="#">Privacy</a>
            <a className="text-[#565e74] hover:text-[#006b2c] transition-colors" href="#">Terms</a>
            <a className="text-[#565e74] hover:text-[#006b2c] transition-colors" href="#">API Docs</a>
            <a className="text-[#565e74] hover:text-[#006b2c] transition-colors" href="#">Status</a>
          </div>
          <div className="font-['Inter'] text-[14px] leading-[24px] text-[#565e74] dark:text-[#5c647a]">
            © 2024 Velocix Logistics AI. Hyperlocal intelligence at scale.
          </div>
        </div>
      </footer>
    </div>
  );
}