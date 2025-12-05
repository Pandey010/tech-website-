import { BlogPost } from '../types';

// Use relative path to leverage Vite proxy in development
// This avoids CORS issues and hardcoded localhost URLs
const API_URL = '/api';

export const api = {
  // Fetch all posts
  getPosts: async (): Promise<BlogPost[]> => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        console.warn(`Backend returned status ${response.status}. Falling back to client-side data.`);
        return [];
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend unreachable. Falling back to client-side data.');
      return [];
    }
  },

  // Create a new post
  createPost: async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  // Update an existing post
  updatePost: async (post: BlogPost): Promise<BlogPost> => {
    const response = await fetch(`${API_URL}/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  // Seed database with bulk data
  seedDatabase: async (posts: BlogPost[]): Promise<{ count: number }> => {
    const response = await fetch(`${API_URL}/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts),
    });
    if (!response.ok) throw new Error('Failed to seed database');
    return response.json();
  }
};