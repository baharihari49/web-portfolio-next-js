// components/blog/CategoryWidget.tsx
import React, { JSX, useEffect, useState } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export default function CategoryWidget(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/categories`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: CategoriesResponse = await response.json();

        
        if (data.success && data.data) {
          console.log(data)
          setCategories(data.data);
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Category</h4>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 w-4 bg-gray-300 rounded"></div>
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
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Category</h4>
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
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Category</h4>
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">No categories available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
      <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Category</h4>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/blog/category/${category.slug}`}>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex-1">
                  <span className="text-gray-600 group-hover:text-blue-600 transition-colors font-medium">
                    {category.name}
                  </span>
                  {category.description && (
                    <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-500 transition-colors">
                      {category.description}
                    </p>
                  )}
                </div>
                <span className="text-gray-400 group-hover:text-blue-600 transition-all duration-200 transform group-hover:translate-x-1 ml-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}