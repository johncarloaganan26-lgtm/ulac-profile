import { INITIAL_BLOGS } from '../data/mockBlogs';

const STORAGE_KEY = 'ulac_blogs_data';

class BlogService {
  constructor() {
    this.blogs = this._loadFromStorage();
  }

  _loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored blogs, using mock initial data:', e);
    }
    this._saveToStorage(INITIAL_BLOGS);
    return [...INITIAL_BLOGS];
  }

  _saveToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('ulac-blogs-changed'));
    } catch (e) {
      console.error('Failed to save blogs to storage:', e);
    }
  }

  getAll() {
    return [...this.blogs];
  }

  getById(id) {
    return this.blogs.find(b => b.id === id) || null;
  }

  create(data) {
    const now = new Date().toISOString();
    const newBlog = {
      id: `blog-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: data.title.trim(),
      slug: data.slug.trim() || this.slugify(data.title),
      excerpt: data.excerpt.trim(),
      content: data.content.trim(),
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
      category: data.category || 'Web Development',
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || 'John Carlo Aganan',
      status: data.status === 'Published' ? 'Published' : 'Draft',
      createdAt: now,
      updatedAt: now,
      views: data.views || 0
    };

    this.blogs = [newBlog, ...this.blogs];
    this._saveToStorage(this.blogs);
    return newBlog;
  }

  update(id, data) {
    const index = this.blogs.findIndex(b => b.id === id);
    if (index === -1) return null;

    const existing = this.blogs[index];
    const updated = {
      ...existing,
      ...data,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };

    this.blogs[index] = updated;
    this._saveToStorage(this.blogs);
    return updated;
  }

  delete(id) {
    const initialCount = this.blogs.length;
    this.blogs = this.blogs.filter(b => b.id !== id);
    const deleted = this.blogs.length < initialCount;
    if (deleted) {
      this._saveToStorage(this.blogs);
    }
    return deleted;
  }

  togglePublish(id) {
    const blog = this.getById(id);
    if (!blog) return null;
    const newStatus = blog.status === 'Published' ? 'Draft' : 'Published';
    return this.update(id, { status: newStatus });
  }

  getStats() {
    const total = this.blogs.length;
    const published = this.blogs.filter(b => b.status === 'Published').length;
    const drafts = this.blogs.filter(b => b.status === 'Draft').length;
    const totalViews = this.blogs.reduce((acc, curr) => acc + (Number(curr.views) || 0), 0);
    return {
      total,
      published,
      drafts,
      totalViews
    };
  }

  slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  reset() {
    this.blogs = [...INITIAL_BLOGS];
    this._saveToStorage(this.blogs);
    return this.blogs;
  }
}

export const blogService = new BlogService();
