// services/blogService.ts (updated for API integration)
import { ApiResponse, BlogPost, Tag } from '@/components/blog/types/blog';

// Base API URL - adjust according to your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Generic API request handler with error handling
 */
const apiRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
};

/**
 * Generate a slug from a title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .trim();                   // Trim leading/trailing hyphens
};

/**
 * Fetch a blog post by slug
 */
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // First try to get it from API
    try {
      const response = await apiRequest<ApiResponse>(`/api/blog/posts/${slug}`);
      // Check if data is an array or single object
      if (Array.isArray(response.data)) {
        return response.data.length > 0 ? response.data[0] : null;
      }
      return response.data as BlogPost;
    } catch (apiError) {
      console.warn(`API fetch failed for slug ${slug}, trying fallback:`, apiError);
      
      // Fallback: Fetch all posts and find by slug (useful for local development)
      const allPostsResponse = await apiRequest<ApiResponse>('/api/blog/posts');
      if (!Array.isArray(allPostsResponse.data)) {
        throw new Error('Expected array of posts');
      }
      
      const posts = allPostsResponse.data as BlogPost[];
      const post = posts.find(p => p.slug === slug);
      
      if (!post) {
        throw new Error(`Post with slug ${slug} not found`);
      }
      
      return post;
    }
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
};

/**
 * Fetch a blog post by ID (keeping for backward compatibility)
 */
export const fetchBlogPostById = async (id: string | number): Promise<BlogPost | null> => {
  try {
    // Convert id to number if it's a string
    const postId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    const response = await apiRequest<ApiResponse>(`/api/blog/posts/${postId}`);
    
    // Check if data is an array or single object
    if (Array.isArray(response.data)) {
      return response.data.length > 0 ? response.data[0] : null;
    }
    return response.data as BlogPost;
  } catch (error) {
    console.error(`Failed to fetch post with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetch related posts by tags
 */
export const fetchRelatedPosts = async (tags: string[], excludeSlug: string): Promise<BlogPost[]> => {
  try {
    const tagsQuery = tags.join(',');
    const response = await apiRequest<ApiResponse>(
      `/api/blog/posts?related=true&tags=${encodeURIComponent(tagsQuery)}&exclude=${encodeURIComponent(excludeSlug)}&limit=3`
    );
    
    if (!Array.isArray(response.data)) {
      throw new Error('Expected array of posts');
    }
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch related posts:', error);
    return [];
  }
};

/**
 * Fetch posts by tag
 */
export const fetchPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  try {
    const response = await apiRequest<ApiResponse>(
      `/api/blog/posts?tag=${encodeURIComponent(tag)}`
    );
    
    if (!Array.isArray(response.data)) {
      throw new Error('Expected array of posts');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch posts by tag ${tag}:`, error);
    return [];
  }
};

/**
 * Fetch posts by category
 */
export const fetchPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const response = await apiRequest<ApiResponse>(
      `/api/blog/posts?category=${encodeURIComponent(category)}`
    );
    
    if (!Array.isArray(response.data)) {
      throw new Error('Expected array of posts');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch posts by category ${category}:`, error);
    return [];
  }
};

/**
 * Fetch all blog posts with pagination and filtering
 */
export const fetchBlogPosts = async (options: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
} = {}): Promise<{
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search
    } = options;

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional filters
    if (category) queryParams.append('category', category);
    if (tag) queryParams.append('tag', tag);
    if (search) queryParams.append('search', search);

    const response = await apiRequest<{
      success: boolean;
      data: BlogPost[];
      pagination: {
        totalPosts: number;
        totalPages: number;
        currentPage: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    }>(`/api/blog/posts?${queryParams.toString()}`);

    return {
      posts: response.data,
      totalPosts: response.pagination.totalPosts,
      totalPages: response.pagination.totalPages,
      currentPage: response.pagination.currentPage,
    };
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
};

/**
 * Search blog posts
 */
export const searchBlogPosts = async (query: string, page: number = 1, limit: number = 10): Promise<{
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}> => {
  return fetchBlogPosts({
    page,
    limit,
    search: query,
  });
};

/**
 * Fetch popular posts
 */
export const fetchPopularPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  try {
    const response = await apiRequest<ApiResponse>(
      `/api/blog/posts?popular=true&limit=${limit}`
    );
    
    if (!Array.isArray(response.data)) {
      throw new Error('Expected array of posts');
    }
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch popular posts:', error);
    return [];
  }
};

/**
 * Fetch recent posts
 */
export const fetchRecentPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  try {
    const response = await apiRequest<ApiResponse>(
      `/api/blog/posts?recent=true&limit=${limit}`
    );
    
    if (!Array.isArray(response.data)) {
      throw new Error('Expected array of posts');
    }
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recent posts:', error);
    return [];
  }
};

/**
 * Fetch all categories
 */
export const fetchCategories = async (): Promise<Array<{ name: string; count: number }>> => {
  try {
    const response = await apiRequest<{ categories: Array<{ name: string; count: number }> }>(
      '/api/blog/categories'
    );
    return response.categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

/**
 * Fetch all tags
 */
export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await apiRequest<{ tags: Tag[] }>(
      '/api/blog/tags'
    );
    return response.tags;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
};

/**
 * Increment post view count
 */
export const incrementPostViews = async (slug: string): Promise<void> => {
  try {
    await apiRequest(`/api/blog/posts/${slug}/views`, {
      method: 'POST',
    });
  } catch (error) {
    console.error(`Failed to increment views for post ${slug}:`, error);
  }
};

/**
 * Submit a comment (if comments system is implemented)
 */
export const submitComment = async (postSlug: string, comment: {
  name: string;
  email: string;
  content: string;
}): Promise<boolean> => {
  try {
    await apiRequest(`/api/blog/posts/${postSlug}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
    return true;
  } catch (error) {
    console.error(`Failed to submit comment for post ${postSlug}:`, error);
    return false;
  }
};