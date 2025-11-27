import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-1 w-full px-0 pt-20">
          {children}
        </main>

        {/* Directly render Footer without extra wrapper div */}
        <Footer />

      </body>
    </html>
  );
}
