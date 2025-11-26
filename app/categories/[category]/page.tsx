'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBlogsByCategory, Blog } from '@/utils/localStorage';
import BlogCard from '@/components/BlogCard';

export default function CategoryPage() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // category কখনো string array আকারে আসতে পারে, তাই check করা হচ্ছে
    if (category && typeof category === 'string') {
      const filtered = getBlogsByCategory(category).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setBlogs(filtered);
    }
  }, [category]);

  if (!blogs.length) return <p className="text-center mt-10 text-gray-400">No blogs found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
