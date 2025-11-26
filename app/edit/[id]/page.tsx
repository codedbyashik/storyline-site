'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import BlogForm, { BlogFormData } from '@/components/BlogForm';
import { getBlogById, updateBlog, Blog as BlogType } from '@/utils/localStorage';

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogType | null>(null);

  useEffect(() => {
    if (id) {
      // ✅ Ensure id is string
      const blogId = Array.isArray(id) ? id[0] : id;
      const data = getBlogById(blogId);
      if (data) setBlog(data);
      else router.push('/'); // Redirect if blog not found
    }
  }, [id, router]);

  const handleUpdate = (data: BlogFormData) => {
    if (!id) return;
    const blogId = Array.isArray(id) ? id[0] : id;
    updateBlog(blogId, { ...data, date: new Date().toISOString() });

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Your blog has been updated successfully.',
      timer: 2000,
      showConfirmButton: false,
    });

    router.push(`/blog/${blogId}`);
  };

  if (!blog) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-12 px-4">
      <h1 className="text-3xl font-bold text-center">Edit Blog</h1>
      <BlogForm
        onSubmit={handleUpdate}
        initialData={{
          title: blog.title,
          content: blog.content,
          category: blog.category,
        }}
      />
    </div>
  );
}
