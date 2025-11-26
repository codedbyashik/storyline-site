'use client';

import { motion } from 'framer-motion';
import SocialLinks from '../../components/SocialLinks';
import { useState } from 'react';

export default function ContactPage() {
  const socialLinks = [
    { name: 'Email', url: 'mailto:writer@example.com' },
    { name: 'Facebook', url: 'https://facebook.com/' },
    { name: 'Twitter', url: 'https://twitter.com/' },
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can integrate API or email service
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000); // reset success message after 3s
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-blue-900 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 text-white">
      {/* Header */}
      <motion.div
        className="text-center mb-12 space-y-4 max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide">Contact Me</h1>
        <p className="text-gray-300 text-lg sm:text-xl">
          I’d love to hear from you! Fill out the form or connect with me via social links.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        className="w-full max-w-xl bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-6"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {submitted && (
          <motion.div
            className="text-green-400 text-center font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ Message sent successfully!
          </motion.div>
        )}

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-black/30 border border-gray-500 text-white focus:border-blue-400 focus:outline-none"
          />
          <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-300 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-100 peer-focus:text-sm">
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-black/30 border border-gray-500 text-white focus:border-blue-400 focus:outline-none"
          />
          <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-300 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-100 peer-focus:text-sm">
            Email
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-black/30 border border-gray-500 text-white focus:border-blue-400 focus:outline-none resize-none"
          />
          <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-300 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-100 peer-focus:text-sm">
            Message
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message ✉️
        </motion.button>
      </motion.form>

      {/* Social Links */}
      <motion.div
        className="mt-10 flex flex-wrap justify-center gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {socialLinks.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg md:text-xl hover:text-blue-400 transition-all"
            whileHover={{ scale: 1.2 }}
          >
            {link.name}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
