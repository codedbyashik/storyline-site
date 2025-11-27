'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SocialLinks from '../../components/SocialLinks';
import Image from 'next/image';

const images = [
  '/protik11.jpg',
  '/protik12.jpg',
  '/protik13.jpg',
  '/protik14.jpg',
  '/protik15.jpg',
];

const story = [
  "Tanvir Ahmed Protik জন্মগ্রহণ করেন এক ছোট্ট গ্রামে যেখানে প্রকৃতি তার প্রতিটি দিনকে সাজাত",
  "ছোটবেলা থেকেই তিনি গল্পের জগতে ভ্রমণ করতে শুরু করেছিলেন",
  "প্রতিটি নতুন সকাল তার কল্পনাকে নতুন দিশা দেখাত",
  "প্রকৃতির ছোঁয়া তার মনে গল্পের বীজ রোপণ করত",
  "স্কুলে প্রথম দিনেই তিনি গল্প লিখতে শুরু করেছিলেন",
  "শিশুপ্রেমিক তার বন্ধুরা তাকে উৎসাহ দিত",
  "প্রথম কবিতা লিখেছিলেন সাত বছর বয়সে",
  "পাহাড়ের পাখির গান শুনে নতুন গল্পের ভাবনা জন্ম নিত",
  "নদীর ধারে বসে গল্পের চরিত্ররা তার কল্পনায় জীবন্ত হতো",
  "বৃক্ষের ছায়ায় বসে তিনি প্রকৃতির সঙ্গে কথোপকথন করতেন",
  "মাটির খেলার মাঝে গল্পের প্রথম রূপান্তর ঘটেছিল",
  "ছোটবেলায় তিনি প্রায় প্রতিটি ঘটনা কল্পনার সাথে মিশিয়ে লিখতেন",
  "শিশুকালের বন্ধুদের সঙ্গে গল্প শেয়ার করত তিনি",
  "গ্রামের শীতের সকালে গল্পের গল্পপাঠ করতেন",
  "ছোটবেলায় তার প্রথম গল্পের চরিত্র ছিল একটি বাঘ",
  "প্রকৃতির নানা রঙ তার লেখার অনুপ্রেরণা দিত",
  "প্রথম পুরস্কার পেয়েছিলেন স্থানীয় স্কুল প্রতিযোগিতায়",
  "সেই থেকে গল্প লেখা তার জীবনের অবিচ্ছেদ্য অংশ হয়ে ওঠে",
];

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/' },
  { name: 'Twitter', url: 'https://twitter.com/' },
  { name: 'LinkedIn', url: 'https://linkedin.com/' },
];

export default function AboutPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
      {/* Background Slideshow */}
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1500`}
          style={{ opacity: currentImage === idx ? 1 : 0 }}
        >
          <Image
            src={img}
            alt={`Slide ${idx}`}
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center">
        {/* Header */}
        <motion.div
          className="max-w-3xl text-center space-y-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-2xl">
            Tanvir Ahmed Protik
          </h1>
          <p className="text-gray-100 text-base sm:text-lg md:text-xl font-light drop-shadow-md">
            A passionate writer from childhood loving nature and sharing stories with the world
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <SocialLinks links={socialLinks} size="lg" />
          </div>
        </motion.div>

        {/* Story Section */}
        <div className="max-w-3xl mt-12 space-y-4 text-center">
          {story.map((line, idx) => (
            <motion.p
              key={idx}
              className="text-gray-100 text-sm sm:text-base md:text-lg font-light drop-shadow-lg break-words"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
