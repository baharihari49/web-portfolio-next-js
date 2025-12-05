// services/collectionService.ts
import { CollectionApiResponse, CollectionItem } from '@/app/types/collection';

/**
 * Get the API URL - use relative path for client-side to avoid CORS
 */
const getApiUrl = () => {
  // On client-side, use relative URL (goes through Next.js proxy)
  if (typeof window !== 'undefined') {
    return '';
  }
  // On server-side, use the full API URL
  return process.env.NEXT_PUBLIC_API_BASE_URL || '';
};

/**
 * Fetch all collections from API
 */
export const fetchCollections = async (): Promise<CollectionItem[]> => {
  try {
    const response = await fetch(`${getApiUrl()}/api/collections`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: CollectionApiResponse = await response.json();

    if (!data.success || !Array.isArray(data.data)) {
      throw new Error('Invalid API response format');
    }

    return data.data.filter(item => item.published);
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return [];
  }
};

/**
 * Fetch a single collection by slug
 */
export const fetchCollectionBySlug = async (slug: string): Promise<CollectionItem | null> => {
  try {
    const collections = await fetchCollections();
    return collections.find(item => item.slug === slug) || null;
  } catch (error) {
    console.error(`Failed to fetch collection with slug ${slug}:`, error);
    return null;
  }
};

/**
 * Fetch collections by category
 */
export const fetchCollectionsByCategory = async (categorySlug: string): Promise<CollectionItem[]> => {
  try {
    const collections = await fetchCollections();
    return collections.filter(item => item.category.slug === categorySlug);
  } catch (error) {
    console.error(`Failed to fetch collections for category ${categorySlug}:`, error);
    return [];
  }
};

/**
 * Get unique categories from collections
 */
export const getCollectionCategories = async (): Promise<string[]> => {
  try {
    const collections = await fetchCollections();
    const categories = [...new Set(collections.map(item => item.category.name))];
    return categories;
  } catch (error) {
    console.error('Failed to get collection categories:', error);
    return [];
  }
};

