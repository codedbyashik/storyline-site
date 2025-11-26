'use client';
import Link from 'next/link';

export interface Blog {
  id: string;
  title: string;
  content: string;
  category?: string;
  image?: string; // Base64 or URL
  date: string;
}

interface BlogCardProps {
  blog: Blog;
  className?: string; // ✅ Optional className prop
}

export default function BlogCard({ blog, className = '' }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.id}`} className={`block ${className}`}>
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">

        {/* Blog Image */}
        {blog.image && (
          <div className="w-full h-48 md:h-56 lg:h-60 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="p-5">
          {/* Date */}
          <p className="text-gray-400 text-sm mb-2">
            {new Date(blog.date).toLocaleString('en-BD', {
              timeZone: 'Asia/Dhaka',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2 hover:text-blue-400 transition">
            {blog.title}
          </h2>

          {/* Category / Tag */}
          {blog.category && (
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {blog.category}
            </span>
          )}

          {/* Content Preview */}
          <p className="text-gray-300 text-sm line-clamp-4">
            {blog.content}
          </p>
        </div>
      </div>
    </Link>
  );
}
