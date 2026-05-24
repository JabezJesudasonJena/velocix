import React from 'react';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#00873a]/5 to-transparent rounded-full blur-[80px] pointer-events-none -z-10"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f5ec] border border-[#c4e9c3] text-[#00501f] text-[13px] font-semibold tracking-wide mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00873a] animate-pulse"></span>
          Velocix API is live
        </div>

        <h1 className="text-[48px] md:text-[72px] leading-[1.05] tracking-[-0.04em] font-semibold font-['Geist'] text-[#191c1e] max-w-4xl mb-6">
          The infrastructure for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006b2c] to-[#00873a]">
            hyperlocal quick-commerce.
          </span>
        </h1>

        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#565e74] max-w-2xl mb-10">
          A scalable, AI-powered delivery backend. Manage multi-tenant stores, track real-time inventory, and optimize driver dispatch routes with sub-second API latency.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-20">
          <a href="/signup" className="w-full sm:w-auto h-12 px-6 bg-[#00873a] hover:bg-[#006b2c] text-white font-['Geist'] text-[15px] font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
            Start Building Free
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 000-1.41l-6.58-6.6a.996.996 0 10-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>
          </a>
          <a href="/docs" className="w-full sm:w-auto h-12 px-6 bg-[#ffffff] border border-[#e6e8ea] hover:bg-[#f7f9fb] hover:border-[#bdcaba] text-[#191c1e] font-['Geist'] text-[15px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <svg className="w-4 h-4 fill-current text-[#565e74]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zM4 18V6h16v12H4zm8-2h6v-2h-6v2zm-2.5-2l-4.5-4.5L6.41 8 9.5 11.09 6.41 14.17 5 12.76 9.5 17.26 12 14.76 9.5 12.26z"/></svg>
            Read the Docs
          </a>
        </div>

        {/* API UI Enhancement - Mock Terminal */}
        <div className="w-full max-w-3xl mx-auto bg-[#191c1e] rounded-2xl shadow-2xl border border-[#3e4a3d] overflow-hidden text-left">
          <div className="h-10 bg-[#2d3133] border-b border-[#3e4a3d] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            <span className="ml-4 text-[#8b949e] text-[12px] font-mono">POST /api/v1/dispatch/route</span>
          </div>
          <div className="p-6 overflow-x-auto text-[13px] md:text-[14px] leading-relaxed font-mono">
            <pre className="text-[#e6e8ea]">
              <span className="text-[#ff7b72]">const</span> response = <span className="text-[#ff7b72]">await</span> velocix.<span className="text-[#d2a8ff]">dispatch</span>({`{`}
              <br/>  storeId: <span className="text-[#a5d6ff]">'st_8f92a'</span>,
              <br/>  orderId: <span className="text-[#a5d6ff]">'ord_9921b'</span>,
              <br/>  priority: <span className="text-[#a5d6ff]">'hyperlocal'</span>
              <br/>{`}`});
              <br/><br/>
              <span className="text-[#8b949e]">// Returns</span>
              <br/>{`{`}
              <br/>  <span className="text-[#7ee787]">"status"</span>: <span className="text-[#79c0ff]">"DRIVER_ASSIGNED"</span>,
              <br/>  <span className="text-[#7ee787]">"driverId"</span>: <span className="text-[#79c0ff]">"drv_44x9"</span>,
              <br/>  <span className="text-[#7ee787]">"etaSeconds"</span>: <span className="text-[#a5d6ff]">420</span>,
              <br/>  <span className="text-[#7ee787]">"routeOptimized"</span>: <span className="text-[#ff7b72]">true</span>
              <br/>{`}`}
            </pre>
          </div>
        </div>
      </section>

      {/* NEW: INFRASTRUCTURE / HOW IT WORKS SECTION */}
      <section className="w-full bg-[#f7f9fb] border-y border-[#e6e8ea] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-[32px] md:text-[40px] leading-[1.2] tracking-[-0.03em] font-semibold font-['Geist'] text-[#191c1e] mb-4">
              Architected for speed
            </h2>
            <p className="text-[16px] text-[#565e74] font-['Inter'] max-w-2xl">
              From the moment a customer clicks checkout to the driver arriving at their door, Velocix handles the heavy lifting through automated webhooks and ACID-compliant transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-[#bfcabb] to-transparent z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 p-8 bg-[#ffffff] border border-[#e6e8ea] rounded-[24px] shadow-sm">
              <div className="w-10 h-10 bg-[#f0f5ec] border border-[#c4e9c3] text-[#006b2c] font-bold font-['Geist'] rounded-full flex items-center justify-center mb-6">1</div>
              <h3 className="text-[20px] font-semibold font-['Geist'] text-[#191c1e] mb-3">Order Ingestion</h3>
              <p className="text-[14px] leading-[1.6] text-[#565e74]">
                Accept orders via REST API. Velocix instantly creates the transaction ledger and stages the data for processing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 p-8 bg-[#ffffff] border border-[#e6e8ea] rounded-[24px] shadow-sm">
              <div className="w-10 h-10 bg-[#f0f5ec] border border-[#c4e9c3] text-[#006b2c] font-bold font-['Geist'] rounded-full flex items-center justify-center mb-6">2</div>
              <h3 className="text-[20px] font-semibold font-['Geist'] text-[#191c1e] mb-3">Inventory Allocation</h3>
              <p className="text-[14px] leading-[1.6] text-[#565e74]">
                Strict PostgreSQL row-level locks ensure inventory is deducted precisely, preventing concurrent overselling during demand spikes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 p-8 bg-[#ffffff] border border-[#e6e8ea] rounded-[24px] shadow-sm">
              <div className="w-10 h-10 bg-[#f0f5ec] border border-[#c4e9c3] text-[#006b2c] font-bold font-['Geist'] rounded-full flex items-center justify-center mb-6">3</div>
              <h3 className="text-[20px] font-semibold font-['Geist'] text-[#191c1e] mb-3">Automated Dispatch</h3>
              <p className="text-[14px] leading-[1.6] text-[#565e74]">
                Fire webhooks to your active driver fleet. Velocix groups hyperlocal orders by geolocation to optimize delivery routes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: METRICS SECTION */}
      <section className="w-full bg-[#002109] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[rgba(255,255,255,0.1)]">
            <div>
              <div className="text-[40px] font-bold font-['Geist'] text-[#62df7d] mb-2">&lt;50ms</div>
              <div className="text-[14px] text-[#abd0ab]">Average Latency</div>
            </div>
            <div>
              <div className="text-[40px] font-bold font-['Geist'] text-[#62df7d] mb-2">99.99%</div>
              <div className="text-[14px] text-[#abd0ab]">Uptime SLA</div>
            </div>
            <div>
              <div className="text-[40px] font-bold font-['Geist'] text-[#62df7d] mb-2">10k+</div>
              <div className="text-[14px] text-[#abd0ab]">Req / Second</div>
            </div>
            <div>
              <div className="text-[40px] font-bold font-['Geist'] text-[#62df7d] mb-2">ACID</div>
              <div className="text-[14px] text-[#abd0ab]">Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="w-full max-w-5xl mx-auto px-6 py-32 text-center">
        <h2 className="text-[32px] md:text-[40px] leading-[1.2] tracking-[-0.03em] font-semibold font-['Geist'] text-[#191c1e] mb-6">
          Ready to optimize your delivery stack?
        </h2>
        <a href="/signup" className="inline-flex h-14 px-8 bg-[#191c1e] hover:bg-[#000000] text-white font-['Geist'] text-[16px] font-semibold rounded-2xl transition-all shadow-md items-center justify-center gap-2">
          Create Admin Account
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 000-1.41l-6.58-6.6a.996.996 0 10-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>
        </a>
      </section>

    </div>
  );
}