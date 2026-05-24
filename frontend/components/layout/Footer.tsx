import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#f7f9fb] border-t border-[#e6e8ea] py-12 px-6 mt-auto font-['Inter']">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand & Project Definition */}
        <div className="max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#006b2c] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              deployed_code
            </span>
            <span className="font-['Geist'] text-[20px] font-semibold tracking-tight text-[#191c1e]">
              Velocix
            </span>
          </div>
          <p className="text-[14px] text-[#565e74] leading-[24px]">
            A scalable AI-powered hyperlocal delivery backend system with realtime order tracking, intelligent dispatching, and optimized logistics infrastructure.
          </p>
        </div>

        {/* Author & Repository Link */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <a 
            // Update this href if your specific repo name differs
            href="https://github.com/jabezjesudasonjena/velocix" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] font-medium text-[#191c1e] hover:text-[#006b2c] transition-colors group"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current text-[#565e74] group-hover:text-[#006b2c] transition-colors">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View Repository
          </a>
          <p className="text-[14px] text-[#565e74]">
            Built by <span className="font-semibold text-[#191c1e]">Jabez Jena</span>
          </p>
        </div>
        
      </div>
    </footer>
  );
}