'use client';
import Link from 'next/link';

interface CategoryListProps {
  categories: string[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${cat}`}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
