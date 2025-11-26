'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Categories', href: '/categories' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Framer Motion Variants
  const overlayVariants = {
    hidden: { opacity: 0, pointerEvents: 'none' },
    visible: { opacity: 1, pointerEvents: 'auto' },
  };

  const panelVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.1, when: 'beforeChildren' },
    },
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center py-4 px-4 md:px-8 lg:px-12 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold text-white hover:text-blue-400 transition-colors duration-300"
        >
          Protik's World
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative font-medium text-white/90 hover:text-blue-400 transition-colors duration-300 ${
                pathname === link.href
                  ? 'text-blue-400 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:rounded-full'
                  : ''
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/add"
            className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:from-indigo-500 hover:to-blue-500 transition-all duration-300"
          >
            Add Blog
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-[20001]">
          <button
            className="text-white text-3xl focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <HiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[20000] bg-black/70 backdrop-blur-3xl"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Close Button */}
            <div className="fixed top-4 right-4 z-[20002]">
              <button
                className="text-white text-3xl focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HiX />
              </button>
            </div>

            {/* Mobile Menu Panel */}
            <motion.div
              className="relative z-[20001] flex flex-col items-center justify-center h-full space-y-6 px-6 text-center text-white"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              onClick={(e) => e.stopPropagation()} // prevent click-through
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className={`text-2xl md:text-3xl font-bold drop-shadow-2xl ${
                      pathname === link.href
                        ? 'text-blue-400 underline underline-offset-4'
                        : 'text-white hover:text-blue-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={linkVariants}>
                <Link
                  href="/add"
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-500 hover:to-blue-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Blog
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
