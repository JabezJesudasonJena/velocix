import React from 'react';

export default function DocsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 font-['Inter']">
      
      {/* STICKY SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h3 className="text-[12px] font-semibold text-[#191c1e] uppercase tracking-wider mb-4 font-['Geist']">
            API Reference
          </h3>
          <nav className="flex flex-col gap-3 text-[14px] text-[#565e74]">
            <a href="#authentication" className="hover:text-[#006b2c] transition-colors">Authentication</a>
            <a href="#create-store" className="hover:text-[#006b2c] transition-colors">Create Store</a>
            <a href="#create-product" className="hover:text-[#006b2c] transition-colors">Add Product</a>
            <a href="#dispatch" className="hover:text-[#006b2c] transition-colors">Driver Dispatch</a>
          </nav>

          <h3 className="text-[12px] font-semibold text-[#191c1e] uppercase tracking-wider mb-4 mt-10 font-['Geist']">
            Resources
          </h3>
          <nav className="flex flex-col gap-3 text-[14px] text-[#565e74]">
            <a href="#" className="hover:text-[#006b2c] transition-colors">Postman Collection</a>
            <a href="#" className="hover:text-[#006b2c] transition-colors">Webhooks Guide</a>
            <a href="#" className="hover:text-[#006b2c] transition-colors">Rate Limits</a>
          </nav>
        </div>
      </aside>

      {/* MAIN DOCUMENTATION CONTENT */}
      <main className="flex-1 max-w-3xl">
        
        <div className="mb-16">
          <h1 className="text-[36px] font-semibold font-['Geist'] text-[#191c1e] mb-4">
            Velocix API Documentation
          </h1>
          <p className="text-[16px] leading-[1.6] text-[#565e74]">
            Welcome to the Velocix developer documentation. Our REST API allows you to programmatically manage your hyperlocal stores, update inventory in real-time, and trigger algorithmic driver dispatches. 
          </p>
        </div>

        {/* AUTHENTICATION SECTION */}
        <section id="authentication" className="mb-20 scroll-mt-24">
          <h2 className="text-[24px] font-semibold font-['Geist'] text-[#191c1e] mb-4 border-b border-[#e6e8ea] pb-2">
            Authentication
          </h2>
          <p className="text-[15px] leading-[1.6] text-[#565e74] mb-6">
            The Velocix API uses JSON Web Tokens (JWT) to authenticate requests. You must include your token in the <code className="bg-[#f2f4f6] px-1.5 py-0.5 rounded text-[13px] text-[#191c1e]">Authorization</code> header of every request.
          </p>
          
          <div className="bg-[#191c1e] rounded-xl p-4 overflow-x-auto text-[13px] font-mono text-[#e6e8ea]">
            Authorization: Bearer &lt;your_jwt_token&gt;
          </div>
        </section>

        {/* ENDPOINT: CREATE STORE */}
        <section id="create-store" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 border-b border-[#e6e8ea] pb-2">
            <span className="bg-[#e6f4ea] text-[#006b2c] text-[12px] font-bold px-2 py-1 rounded">POST</span>
            <h2 className="text-[24px] font-semibold font-['Geist'] text-[#191c1e]">
              /stores
            </h2>
          </div>
          <p className="text-[15px] leading-[1.6] text-[#565e74] mb-6">
            Creates a new hyperlocal dark store associated with your Store Admin account. Your JWT token automatically determines the <code className="bg-[#f2f4f6] px-1.5 py-0.5 rounded text-[13px] text-[#191c1e]">ownerId</code>.
          </p>
          
          <h4 className="text-[14px] font-semibold text-[#191c1e] mb-3">Request Body</h4>
          <div className="bg-[#191c1e] rounded-xl p-4 mb-6 overflow-x-auto text-[13px] font-mono text-[#e6e8ea]">
            <pre>
{`{
  "name": "Velocix Fresh - Downtown"
}`}
            </pre>
          </div>

          <h4 className="text-[14px] font-semibold text-[#191c1e] mb-3">Response <span className="text-[#565e74] font-normal text-[12px] ml-2">201 Created</span></h4>
          <div className="bg-[#191c1e] rounded-xl p-4 overflow-x-auto text-[13px] font-mono text-[#e6e8ea]">
            <pre>
{`{
  "id": 1042,
  "name": "Velocix Fresh - Downtown",
  "ownerId": 77
}`}
            </pre>
          </div>
        </section>

        {/* ENDPOINT: ADD PRODUCT */}
        <section id="create-product" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 border-b border-[#e6e8ea] pb-2">
            <span className="bg-[#e6f4ea] text-[#006b2c] text-[12px] font-bold px-2 py-1 rounded">POST</span>
            <h2 className="text-[24px] font-semibold font-['Geist'] text-[#191c1e]">
              /products
            </h2>
          </div>
          <p className="text-[15px] leading-[1.6] text-[#565e74] mb-6">
            Adds a new SKU to a specific store's inventory. Ensures strict database-level constraints on stock values.
          </p>
          
          <h4 className="text-[14px] font-semibold text-[#191c1e] mb-3">Request Body</h4>
          <div className="bg-[#191c1e] rounded-xl p-4 mb-6 overflow-x-auto text-[13px] font-mono text-[#e6e8ea]">
            <pre>
{`{
  "name": "Organic Avocados (2-pack)",
  "price": 4.99,
  "storeId": 1042,
  "category": "Produce",
  "isEdible": true,
  "stock": 150
}`}
            </pre>
          </div>
        </section>

        {/* ENDPOINT: DISPATCH */}
        <section id="dispatch" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 border-b border-[#e6e8ea] pb-2">
            <span className="bg-[#e6f4ea] text-[#006b2c] text-[12px] font-bold px-2 py-1 rounded">POST</span>
            <h2 className="text-[24px] font-semibold font-['Geist'] text-[#191c1e]">
              /api/v1/dispatch/route
            </h2>
          </div>
          <p className="text-[15px] leading-[1.6] text-[#565e74] mb-6">
            Triggers the algorithmic dispatch system. Velocix will automatically assign the nearest available driver based on the store's geolocation and the order's priority.
          </p>
          
          <h4 className="text-[14px] font-semibold text-[#191c1e] mb-3">Request Body</h4>
          <div className="bg-[#191c1e] rounded-xl p-4 mb-6 overflow-x-auto text-[13px] font-mono text-[#e6e8ea]">
            <pre>
{`{
  "storeId": "1042",
  "orderId": "ord_9921b",
  "priority": "hyperlocal"
}`}
            </pre>
          </div>

          <h4 className="text-[14px] font-semibold text-[#191c1e] mb-3">Response <span className="text-[#565e74] font-normal text-[12px] ml-2">200 OK</span></h4>
          <div className="bg-[#191c1e] rounded-xl p-4 overflow-x-auto text-[13px] font-mono text-[#e6e8ea]">
            <pre>
{`{
  "status": "DRIVER_ASSIGNED",
  "driverId": "drv_44x9",
  "etaSeconds": 420,
  "routeOptimized": true
}`}
            </pre>
          </div>
        </section>

      </main>
    </div>
  );
}