// Fixed World-Class Premium Footer - Next.js + Tailwind CSS

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Categories', href: '/categories' },
    { name: 'Contact', href: '/contact' }
  ];

  const supportLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Sitemap', href: '/sitemap.xml' }
  ];

  const socials = [
    { name: 'Facebook', icon: <FaFacebookF aria-hidden="true" />, href: 'https://facebook.com' },
    { name: 'Instagram', icon: <FaInstagram aria-hidden="true" />, href: 'https://instagram.com' },
    { name: 'YouTube', icon: <FaYoutube aria-hidden="true" />, href: 'https://youtube.com' },
    { name: 'LinkedIn', icon: <FaLinkedinIn aria-hidden="true" />, href: 'https://linkedin.com' }
  ];

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = () => {
    if (!email) return alert('Please enter a valid email');
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <footer className="w-full bg-black/90 text-white border-t border-white/10 backdrop-blur-xl mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand & mission */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide mb-3">Protik's World🙂</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            A creative platform to write, read and share stories with the world.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/40 focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              aria-label="Subscribe to newsletter"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-sm font-medium"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-blue-400 transition text-white/80 text-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            {supportLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-blue-400 transition text-white/80 text-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${s.name}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-xl"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-white/60 text-sm relative">
        © 2025 Protik's World — All Rights Reserved.
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="absolute right-4 bottom-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
