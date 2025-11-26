'use client';

import { useState, useEffect } from 'react';

export interface BlogFormData {
  title: string;
  content: string;
  category?: string;
  image?: string; // Base64
}

interface BlogFormProps {
  onSubmit: (data: BlogFormData) => void;
  initialData?: BlogFormData;
}

export default function BlogForm({ onSubmit, initialData }: BlogFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setCategory(initialData.category || '');
      setImage(initialData.image || null);
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit({ title, content, category, image: image || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-48 whitespace-pre-wrap"
        required
      ></textarea>

      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-white"
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-md border mt-2"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md font-bold"
      >
        Update Blog
      </button>
    </form>
  );
}
