import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';// Ensure this matches your folder structure
import Footer from '@/components/layout/Footer';
import ReduxProvider from '@/components/ReduxProvider';

// Next.js Metadata API for SEO
export const metadata: Metadata = {
  title: 'VELOCIX | Premium Products',
  description: 'Search and discover premium products on Velocix.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* antialiased: Ensures fonts render smoothly (complements your globals.css)
        min-h-screen & flex-col: Pushes any future footers to the bottom naturally 
      */}
      <body className="antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        
        {/* The Header stays at the top of every page */}
        < ReduxProvider >
          <Header />
          
          {/* The main content area where your page.tsx files will render */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer/>
        </ReduxProvider>

      </body>
    </html>
  );
}