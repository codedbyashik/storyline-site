import { Blog, getBlogs } from './localStorage';

/** সব unique category বের করে */
export const getCategories = (): string[] => {
  const blogs = getBlogs();
  const categories = blogs.map((b) => b.category || 'Uncategorized');
  return Array.from(new Set(categories));
};

/** একটি category অনুযায়ী blog filter করে */
export const getBlogsByCategory = (category: string): Blog[] => {
  const blogs = getBlogs();
  return blogs.filter((b) => (b.category || 'Uncategorized') === category);
};

/** প্রতিটি category-তে কতটা blog আছে */
export const getCategoryCount = (category: string): number => {
  const blogs = getBlogs();
  return blogs.filter((b) => (b.category || 'Uncategorized') === category).length;
};
