import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velocix | Logistics Infrastructure",
  description: "A scalable AI-powered hyperlocal delivery backend system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google's font servers for maximum speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fetch Geist and Inter */}
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}