'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import BlogCard from '../components/BlogCard';
import SortMenu from '../components/SortMenu';
import { getBlogs, Blog as BlogType } from '../utils/localStorage';
import { motion, AnimatePresence } from 'framer-motion';

const BATCH_SIZE = 6;

export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'recent' | 'oldest'>('recent');
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastBlogRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) loadMoreBlogs();
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, displayedBlogs]
  );

  // Load all blogs from localStorage
  useEffect(() => {
    const allBlogs = getBlogs().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setBlogs(allBlogs);
    setDisplayedBlogs(allBlogs.slice(0, BATCH_SIZE));
    setHasMore(allBlogs.length > BATCH_SIZE);
  }, []);

  // Filter + Sort
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) =>
        sortOption === 'recent'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [blogs, searchTerm, sortOption]);

  const loadMoreBlogs = () => {
    const filtered = filteredBlogs;
    const nextBatch = filtered.slice(displayedBlogs.length, displayedBlogs.length + BATCH_SIZE);
    setDisplayedBlogs((prev) => [...prev, ...nextBatch]);
    if (displayedBlogs.length + nextBatch.length >= filtered.length) setHasMore(false);
  };

  // Reset displayed blogs when search or sort changes
  useEffect(() => {
    const filtered = filteredBlogs;
    setDisplayedBlogs(filtered.slice(0, BATCH_SIZE));
    setHasMore(filtered.length > BATCH_SIZE);
  }, [searchTerm, sortOption, blogs]);

  const resetFilters = () => {
    setSearchTerm('');
    setSortOption('recent');
  };

  return (
    <div className="relative flex flex-col gap-8 pt-6 bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 min-h-screen px-4 sm:px-6 md:px-8">
      {/* Hero */}
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/protik.jpg"
          alt="Writer"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto hover:scale-105 transition-transform"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Hi, I'm Tanvir Ahmed Protik
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto">
          Sharing stories, ideas, and insights. Explore my latest blogs below.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-3 justify-between items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-lg flex-1 border border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm transition"
        />
        <SortMenu sortOption={sortOption} setSortOption={setSortOption} />
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 shadow-md transition"
        >
          Reset
        </button>
      </motion.div>

      {/* Blog Cards Grid */}
      <motion.div layout className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog, index) => (
              <motion.div
                layout
                key={blog.id}
                ref={index === displayedBlogs.length - 1 ? lastBlogRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <BlogCard
                  blog={blog}
                  className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-white/70 col-span-full py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No blogs found.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <motion.p
          className="text-center text-white/70 mt-6 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading more blogs...
        </motion.p>
      )}
    </div>
  );
}
