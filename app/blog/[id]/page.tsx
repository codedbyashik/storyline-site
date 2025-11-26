'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBlogById, deleteBlog, Blog as BlogType } from '../../../utils/localStorage';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function SingleBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogType | null>(null);

  useEffect(() => {
    if (!id) return;

    const blogId = Array.isArray(id) ? id[0] : id;
    const data = getBlogById(blogId);

    if (data) setBlog(data);
    else router.push('/');
  }, [id, router]);

  const handleDelete = async () => {
    if (!blog) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed && blog.id) {
      deleteBlog(blog.id);
      Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
      router.push('/');
    }
  };

  if (!blog) return <p className="text-center text-gray-400 mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 space-y-6 text-white">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold">{blog.title}</h1>

      {/* Blog Date */}
      <p className="text-gray-400">{new Date(blog.date).toLocaleString()}</p>

      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded mt-4"
        />
      )}

      {/* Blog Content */}
      <p className="text-gray-200 whitespace-pre-wrap mt-4">{blog.content}</p>

      {/* Blog Category */}
      <p className="text-sm text-gray-400">Category: {blog.category || 'Uncategorized'}</p>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <Link
          href={`/edit/${blog.id}`}
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 hover:text-white transition font-medium"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
