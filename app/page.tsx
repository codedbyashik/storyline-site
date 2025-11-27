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

  useEffect(() => {
    const allBlogs = getBlogs().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setBlogs(allBlogs);
    setDisplayedBlogs(allBlogs.slice(0, BATCH_SIZE));
    setHasMore(allBlogs.length > BATCH_SIZE);
  }, []);

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
    <div className="relative flex flex-col gap-10 pt-8 bg-gradient-to-b from-purple-950 via-indigo-900 to-blue-950 min-h-screen px-4 sm:px-6 md:px-8">

      {/* Hero Section - Premium Style */}
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/protik.jpg"
          alt="Writer"
          className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl mx-auto hover:scale-110 transition-transform duration-500"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
          Hi, I'm Tanvir Ahmed Protik
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto animate-fadeIn">
          Sharing stories, ideas, and insights. Explore my latest blogs below.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-4 rounded-xl flex-1 border border-white/20 bg-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm transition shadow-lg"
        />
        <SortMenu sortOption={sortOption} setSortOption={setSortOption} />
        <button
          onClick={resetFilters}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold hover:from-purple-600 hover:to-pink-600 shadow-xl transition-transform hover:scale-105"
        >
          Reset
        </button>
      </motion.div>

      {/* Blog Cards Grid - World Premium */}
      <motion.div layout className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        <AnimatePresence>
          {displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog, index) => (
              <motion.div
                layout
                key={blog.id}
                ref={index === displayedBlogs.length - 1 ? lastBlogRef : null}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <BlogCard
                  blog={blog}
                  className="backdrop-blur-md bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 border border-white/10"
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-white/70 col-span-full py-12 text-xl"
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
          className="text-center text-white/70 mt-8 text-lg animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading more blogs...
        </motion.p>
      )}

    </div>
  );
}
