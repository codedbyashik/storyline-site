'use client';

import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import BlogForm, { BlogFormData } from '../../components/BlogForm';
import { saveBlog } from '../../utils/localStorage';

export default function AddPage() {
  const router = useRouter();

  const handleAddBlog = (data: BlogFormData) => {
    const newBlog = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
      category: data.category || 'Uncategorized',
      image: data.image || '', // new field for image
      date: new Date().toISOString(),
    };

    // Save blog in LocalStorage
    saveBlog(newBlog);

    // Redirect to Home
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Add New Blog</h1>
      <BlogForm onSubmit={handleAddBlog} />
    </div>
  );
}
