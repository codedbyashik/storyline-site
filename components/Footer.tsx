'use client';

import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';

interface FooterProps {
  fullWidth?: boolean;
}

export default function Footer({ fullWidth }: FooterProps) {
  const importantLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Categories', href: '/categories' },
    { name: 'Contact', href: '/contact' },
    { name: 'Facebook', href: 'https://www.facebook.com/tanvirahamed.protik.3', icon: <FaFacebookF /> },
  ];

  return (
    <footer
      className={`${
        fullWidth ? 'w-full' : 'max-w-6xl mx-auto'
      } mt-12 p-8 bg-black/90 text-white flex flex-col md:flex-row justify-between items-center`}
    >
      {/* Important Links */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
        {importantLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target={link.name === 'Facebook' ? '_blank' : '_self'}
            rel={link.name === 'Facebook' ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-2 px-3 py-2 hover:text-blue-400 transition font-medium"
          >
            {link.icon && <span>{link.icon}</span>}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-center md:text-right text-white/70 text-sm">
        &copy; 2025 Tanvir Ahmed Protik. All rights reserved.
      </p>
    </footer>
  );
}
