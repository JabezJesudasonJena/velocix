import PublicHeader from '@/components/layout/PublicHeader';
import Footer from '@/components/layout/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] font-['Inter']">
      <PublicHeader />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}