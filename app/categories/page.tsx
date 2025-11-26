'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Blog, getBlogsByCategory } from '../../utils/blogs';

function CategoryList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (categoryParam) {
      const filtered = getBlogsByCategory(categoryParam).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setBlogs(filtered);
    }
  }, [categoryParam]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {categoryParam ? categoryParam : 'Uncategorized'} Blogs
      </h1>
      {blogs.length === 0 ? (
        <p>No blogs found in this category.</p>
      ) : (
        <ul className="space-y-2">
          {blogs.map((blog) => (
            <li key={blog.id} className="border p-2 rounded shadow">
              <h2 className="font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-600">{blog.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CategoryPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CategoryList />
    </Suspense>
  );
}
