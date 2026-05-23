import React from 'react';

export default function VelocixApp() {
  return (
    <div className="relative min-h-screen pb-32">
      {/* 
        Note: Ensure you import the Material Symbols Outlined font in your app/layout.jsx:
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      */}

      {/* TopNavBar */}
      <nav className="bg-surface/70 dark:bg-inverse-surface/70 backdrop-blur-xl flex justify-between items-center px-container-padding py-base w-full z-50 docked full-width top-0 sticky border-b border-outline-variant/30 dark:border-outline/20 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">Velocix</span>
          
          {/* Smart Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md relative group group-focus-within:ring-2 group-focus-within:ring-primary/20 group-focus-within:rounded-full transition-all">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">search</span>
            <input 
              className="w-full bg-surface-container-high border-outline-variant rounded-full py-2 pl-10 pr-4 text-body-md font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
              placeholder="Search products, brands, categories..." 
              type="text"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[10px] font-label-md text-primary uppercase tracking-wider hidden lg:inline">AI Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-gutter">
          <button className="p-2 rounded-full text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant/50 dark:hover:bg-surface-variant/10 transition-colors active:scale-95 duration-150 relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 rounded-full text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant/50 dark:hover:bg-surface-variant/10 transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <img 
            alt="User profile" 
            className="w-8 h-8 rounded-full border border-outline-variant/50 cursor-pointer" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtFAKT0zuMtl0jWSEnOZN10VVEMnSk_B_MEVXWWyS1Zv7ZRG9ieMGfxikSeoH-q6laHrI2hNSnBvO4i2qSYZjNalRIIeaGbRXbKuaGa6xBBvoT8P1T70A9l4z4_Ce4UoJuhfmN6aiG0sz9I1DA3oBW43L45xxotXUlLMDhRnBQdul_vaL7aUujWBmfe9OVNfBXmlLRL9RymLjL-eMbGFjMfgXM2yOttpSJhlN9rX5aTOA5p7ef9wkFUBXOHwP2MswEhiYOrBaW7A"
          />
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden px-container-padding py-4 sticky top-[60px] z-40 bg-background/90 backdrop-blur-md">
        <div className="relative group group-focus-within:ring-2 group-focus-within:ring-primary/20 group-focus-within:rounded-full transition-all">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">search</span>
          <input 
            className="w-full bg-surface-container border-outline-variant rounded-full py-3 pl-10 pr-4 text-body-md font-body-md shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
            placeholder="Search..." 
            type="text"
          />
        </div>
      </div>

      {/* Dynamic ETA Ticker */}
      <div className="bg-surface-container-low border-b border-surface-variant py-2 overflow-hidden sticky md:top-[72px] z-30">
        <div className="flex items-center justify-center gap-2 animate-pulse text-label-md font-label-md text-primary">
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>Live Grid Status: Optimal • Average delivery: 12 mins</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-container-padding py-section-gap flex flex-col gap-section-gap">
        {/* Hero Section */}
        <section className="relative rounded-xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center shadow-lg group">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Vibrant, high-energy aerial view of a futuristic city at night..." 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCstT8-5W4rIPPH0HwEQMuzD_jO7YB0L0V9ZY8NPMNqkSlZn-BRNCyQG_5v7fsNtEG4vnatSYpqfxy2cCbcka5GsRCpAzaj5R1nAIE-FIMtjCJ691_4-RCLNH7YM97ZUA_925C0oU0fqNyIN_SvH8zctO6pPlYGtJACO3s89WCdNPi5w1EnpyDLPmx-4zrAw_XtPw9xjQKL6jP0T59RC5LX6tpGPuRpJfmPQ2jXgHlp5R4gQnWkYtSSRIItOWc9Axsu824jsx3GPA"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-label-md font-label-md mb-6 pulse-border">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Velocix AI Active
            </span>
            <h1 className="text-headline-xl font-headline-xl mb-4 leading-tight text-white">
              Your neighborhood,<br/><span className="gradient-text">delivered in seconds.</span>
            </h1>
            <p className="text-body-lg font-body-lg mb-8 max-w-md text-white/90">
              Our predictive grid ensures your essentials are already moving your way before you even hit order.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-3 rounded-lg text-label-md font-label-md shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:brightness-110 active:scale-95">
                <span className="material-symbols-outlined text-[20px]">flash_on</span>
                Order Now
              </button>
              <button className="glass-panel border-white/40 bg-white/10 text-white px-6 py-3 rounded-lg text-label-md font-label-md hover:bg-white/20 transition-all flex items-center gap-2 shadow-sm">
                View Map <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Flash Sales Banner */}
        <section className="glass-panel rounded-xl p-6 border-l-4 border-l-error flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-error-container text-on-error-container p-3 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">local_fire_department</span>
            </div>
            <div>
              <h3 className="text-headline-md font-headline-md text-on-surface">Flash Hub Activation</h3>
              <p className="text-body-md font-body-md text-on-surface-variant">Selected items in your zone are dropping in price.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface rounded-lg p-3 shadow-inner">
            <div className="flex flex-col items-center">
              <span className="text-headline-md font-headline-md text-primary font-bold">00</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Hrs</span>
            </div>
            <span className="text-headline-md font-headline-md text-primary">:</span>
            <div className="flex flex-col items-center">
              <span className="text-headline-md font-headline-md text-primary font-bold">14</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Min</span>
            </div>
            <span className="text-headline-md font-headline-md text-primary">:</span>
            <div className="flex flex-col items-center">
              <span className="text-headline-md font-headline-md text-primary font-bold">59</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Sec</span>
            </div>
          </div>
        </section>

        {/* Personalized Recommendations (Bento Grid) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-headline-lg md:font-headline-lg font-headline-lg-mobile text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              Because you liked...
            </h2>
            <a className="text-label-md font-label-md text-primary hover:underline" href="#">View All</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap">
            {/* Main Featured Item */}
            <div className="md:col-span-2 glass-panel rounded-xl overflow-hidden group cursor-pointer relative h-[300px]">
              <img 
                alt="High-quality image of fresh artisanal groceries..." 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS1vK8jf81MruidULCUk_HIuj15n8lxXuRaeK9BB-AcYuBPeZAwhMpW1XdbcrYEY8G_qNjDb1LERTTML7hkXbeq0O-E5hnfmddvE436jJIFni5CTIkNDWvG1TLUPLFuxAiRr8DnsCAFD5tgRMp-ONACMPSR27RTRMXSeKgnp4faieq9VbE-rDKaXy9PZnOj8h_DBn7ajWZnbSbrCHVtjEBGDpqf94AUxlmUS_QFmz7c2yVMSHCVF4cx14Syf5s7Ywcq5-7NZARDQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="bg-surface/90 text-on-surface text-xs font-bold px-2 py-1 rounded mb-2 inline-block">Fresh Drop</span>
                    <h3 className="text-headline-md font-headline-md text-white mb-1">Artisanal Grocery Bundle</h3>
                    <p className="text-body-md font-body-md text-surface-container-low/80">Curated based on your morning orders.</p>
                  </div>
                  <button className="bg-primary text-on-primary p-3 rounded-full hover:scale-110 transition-transform shadow-lg">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Items */}
            <div className="flex flex-col gap-card-gap">
              <div className="glass-panel rounded-xl p-4 flex gap-4 items-center group cursor-pointer hover:bg-surface-container/50 transition-colors flex-1">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img 
                    alt="A beautifully presented, healthy salad bowl..." 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTZGahF0QWgQQhXVSGmnmhn--pWTPdkKI1GzAe7-BY3p8bCI9zRFh4U8nUk8KjhKeNcQQz8I2ZCA0F8twIh9wlU2WxPOD_bjbSpy2X5K2niBt7Uxgig5-FvOaGABRM1lXrUjui7fSkqGGHimKOX0ItcOHGjHvLJlukh_dI9rVchQE4haito9YG3BgWS0L_JJB4LDLaVDML0LvuEmzFEncL0tk6GrfW9ZbNYYCZ4GB2x7_IlY0Of4ebd662hDHlaKtWvZMejrKdLw"
                  />
                </div>
                <div>
                  <h4 className="text-label-md font-label-md text-on-surface">Quick Lunch Salad</h4>
                  <p className="text-body-md font-body-md text-primary font-bold mt-1">$12.99</p>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">timer</span> 8 mins away
                  </span>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-4 flex gap-4 items-center group cursor-pointer hover:bg-surface-container/50 transition-colors flex-1">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img 
                    alt="A sleek, modern cup of artisanal coffee..." 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdC-mtfZ23PWAqMx5dvzM-dGHGwRniUpMyoqHFpqN8-1Vc9zaPIVQ1_bwyri10J4ypEbgzbQFc6_egloyRbJj-DV8qqhhQAlupiHuN_sCEPwfiekdC1eCNuT8LPM_fj7TVmcmQ6qjc_701r-CQLDFx2QX_GU8ZFHUnF5Vt136JhT0OfIVPoZmLNV-o6hTChFDDQ3TWwdYTBclEXXSEoMGgyIh_6kbK4Ao0vWl2M6NLTYXEKFEnSSmbiVQ8nM9cuVFh3t6XK9pa2A"
                  />
                </div>
                <div>
                  <h4 className="text-label-md font-label-md text-on-surface">Cold Brew Reserve</h4>
                  <p className="text-body-md font-body-md text-primary font-bold mt-1">$5.50</p>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">timer</span> 5 mins away
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating AI Assistant Button */}
      <button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50 bg-inverse-surface text-on-tertiary p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center group pulse-border">
        <span className="material-symbols-outlined text-primary-fixed group-hover:rotate-12 transition-transform">smart_toy</span>
      </button>

      {/* BottomNavBar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 flex justify-around items-center px-4 py-2 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full">
        <a className="flex flex-col items-center justify-center bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container rounded-full p-3 shadow-md hover:scale-110 transition-transform active:scale-90 duration-75" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
          <span className="text-[10px] font-label-md mt-1 hidden">Explore</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-3 hover:scale-110 transition-transform active:scale-90 duration-75" href="#">
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="text-[10px] font-label-md mt-1 hidden">Tracking</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-3 hover:scale-110 transition-transform active:scale-90 duration-75" href="#">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[10px] font-label-md mt-1 hidden">Orders</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-3 hover:scale-110 transition-transform active:scale-90 duration-75" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-label-md mt-1 hidden">Account</span>
        </a>
      </nav>
    </div>
  );
}