import Navbar from "@/src/components/main/Navbar";
import StoreProvider from "@/src/redux/store/StoreProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ( 
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}