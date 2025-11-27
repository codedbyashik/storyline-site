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
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.jpg" />
        <title>Protik's World</title>
      </head>
      <body className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full px-0 pt-20">{children}</main>
        <footer className="w-full mt-auto">
          <div className="w-full backdrop-blur-md bg-white/10 border-t border-white/20 px-4 py-4">
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  );
}
