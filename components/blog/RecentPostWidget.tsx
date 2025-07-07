// components/blog/RecentPostWidget.tsx (updated for API integration)
import React, { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface RecentPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  author: {
    id: string;
    name: string;
  };
  date: string;
  excerpt: string;
  category: Category | string; // Support both formats
}

interface BlogPostsResponse {
  success: boolean;
  data: RecentPost[];
  pagination: {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function RecentPostWidget(): JSX.Element {
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recent posts from API
  useEffect(() => {
    const fetchRecentPosts = async (): Promise<void> => {
      try {
        setIsLoading(true);
        // Fetch 3 most recent published posts
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts?limit=3&page=1&recent=true`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: BlogPostsResponse = await response.json();
        
        if (data.success && data.data) {
          setRecentPosts(data.data);
        } else {
          throw new Error('Failed to fetch recent posts');
        }
      } catch (err) {
        console.error('Error fetching recent posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load recent posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Recent News</h4>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex space-x-4 animate-pulse">
              <div className="shrink-0 w-20 h-20 rounded-md bg-gray-300"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
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
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Recent News</h4>
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
  if (recentPosts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Recent News</h4>
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">No recent posts available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
      <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Recent News</h4>
      <ul className="space-y-4">
        {recentPosts.map((post) => (
          <li key={post.id} className="flex space-x-4 group">
            <div className="shrink-0 w-20 h-20 rounded-md overflow-hidden relative">
              <Image 
                src={post.thumbnail || '/images/widget/default-post.jpg'} 
                alt={post.title} 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex-1">
              <h6 className="font-medium mb-1 line-clamp-2">
                <Link href={`/blog/${post.slug}`}>
                  <span className="cursor-pointer text-gray-800 hover:text-blue-600 transition-colors text-sm">
                    {post.title}
                  </span>
                </Link>
              </h6>
              <div className="text-xs text-gray-500 space-y-1">
                <div>
                  By <Link href="#"><span className="text-blue-600 hover:underline cursor-pointer">{post.author.name}</span></Link>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{post.date}</span>
                  {post.category && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600">{typeof post.category === 'string' ? post.category : post.category?.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}