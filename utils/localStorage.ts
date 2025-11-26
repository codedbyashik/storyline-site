export interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
  category?: string;
}

export const getBlogs = (): Blog[] => {
  if (typeof window === 'undefined') return [];
  const blogs = localStorage.getItem('blogs');
  return blogs ? JSON.parse(blogs) : [];
};

export const saveBlog = (blog: Blog): void => {
  const blogs = getBlogs();
  blogs.push(blog);
  localStorage.setItem('blogs', JSON.stringify(blogs));
};

export const getBlogById = (id: string): Blog | undefined => {
  const blogs = getBlogs();
  return blogs.find((b) => b.id === id);
};

export const updateBlog = (id: string, data: Partial<Blog>): void => {
  const blogs = getBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...data };
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }
};

export const deleteBlog = (id: string): void => {
  const blogs = getBlogs().filter((b) => b.id !== id);
  localStorage.setItem('blogs', JSON.stringify(blogs));
};

export const getBlogsByCategory = (category: string): Blog[] => {
  return getBlogs().filter((b) => b.category === category);
};
