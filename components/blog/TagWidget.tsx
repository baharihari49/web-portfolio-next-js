// components/blog/TagWidget.tsx (updated for API integration)
import React, { JSX, useEffect, useState } from 'react';
import Link from 'next/link';

interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  postCount?: number;
}

interface TagsResponse {
  success: boolean;
  data: Tag[];
}

export default function TagWidget(): JSX.Element {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tags from API
  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      try {
        setIsLoading(true);
        // Fetch tags with post count for popularity sorting
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/tags`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: TagsResponse = await response.json();
        
        if (data.success && data.data) {
          // Sort tags by post count (popularity) and take top 8
          const sortedTags = data.data
            .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
            .slice(0, 8);
          setTags(sortedTags);
        } else {
          throw new Error('Failed to fetch tags');
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tags');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Generate tag slug for URL
  const getTagSlug = (tag: Tag): string => {
    return tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="px-4 py-2 bg-gray-300 rounded-md h-8 w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Popular Tags</h4>
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (tags.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Popular Tags</h4>
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">No tags available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
      <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Popular Tags</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link href={`/blog/tag/${getTagSlug(tag)}`} key={tag.id}>
            <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
              {tag.name}
              {tag.postCount !== undefined && tag.postCount > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                  {tag.postCount}
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}